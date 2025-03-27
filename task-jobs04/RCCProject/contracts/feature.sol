// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";


contract Feature is Initializable, UUPSUpgradeable, PausableUpgradeable, AccessControlUpgradeable{
    using SafeERC20 for IERC20;
    using Address for address;
    using Math for uint256;
    struct PoolInfo{
        uint256 pid;
        address pledgeTokenAddress;
        string stName;
        uint256 lastRewordBlock;
        uint256 allTokenNum;
        uint256 tokenToRewardPerBlock;
        uint256 minStTokenNum;
        uint256 poolWeight;
        uint256 rewards;  //池中所有奖励
        uint256 unLockedBlocks; //解除质押锁定的区块数

    }
    struct unShakeRequest{
        // uint256 pid;
        // address userAddr;
        uint256 amount;
        uint256 unLockBlock;
    }
    struct UserInfo{
        uint256 stAmount;
        uint256 finishReward;
        uint256 pendingReward;
        uint256 pledgeBlock;
        unShakeRequest[] requests;

    }
    mapping (uint256 => PoolInfo) public poolInfo;
    mapping (uint256 => mapping(address => UserInfo)) public userInfo;
    IERC20 public RCCToken;
    uint256 startBlock;
    uint256 endBlock;
    uint256 RCCPerBlock;  //每个区块产生的rcc数量
    bytes32 public constant UPGRADE_ROLE = keccak256("upgrade_role");
    bool isPaused;
    uint256 poolId;
    uint256 totalWeight;
    PoolInfo[] public poolList;
    event PledgeRecord(address userAddr, uint256 pid, uint256 amount, uint256 blockNumber, uint256 remain);
    event UnPledgeRecord(address userAddr, uint256 pid, uint256 amount, uint256 blockNumber, uint256 remain);
    event ClaimEvEnt(address userAddr, uint256 pid, uint256 amount, uint256 blockNumber);
    event AddPool(address userAddr, uint256 pid, address tokenAddr, uint256 blockNumber);
    event UpdateReward(uint256 increment, uint256 RCCPerBlockAmount, uint256 pid, uint256 blockLength);
    // unShakeRequest[] requests;

    


    function initialize(address _RCCTokenAddresss, uint256 _startBlock, uint256 _endBlock,uint256 _RCCPerBlock) public initializer {  //升级合约中不允许有构造函数
        __AccessControl_init(); //必须调用,合约按版本初始化
        __Pausable_init();  //初始化合约为未暂停状态
        __UUPSUpgradeable_init(); //初始化，合约按版本初始化
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // 设置msg.sender为默认管理员

        RCCToken = IERC20(_RCCTokenAddresss);
        startBlock = _startBlock;
        endBlock = _endBlock;
        RCCPerBlock = _RCCPerBlock;

    }
    modifier checkPaused() {
        require(!isPaused, "contract already paused");
        _;
    }
    function upgradeTo(address newImplementation) external onlyRole(DEFAULT_ADMIN_ROLE){
        upgradeToAndCall(newImplementation, abi.encodeWithSignature(""));
    }

    function _authorizeUpgrade(address) internal onlyRole(DEFAULT_ADMIN_ROLE) override{}//控制合约升级

    function setRCCPerBlock(uint256 _RCCPerBlock) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_RCCPerBlock > 0, "_RCCPerBlock not less than or equal 0");
        RCCPerBlock = _RCCPerBlock;

    }
    function pausedContract() public onlyRole(DEFAULT_ADMIN_ROLE){  //合约的开始和暂停
        require(!isPaused, "contract has been paused");
        isPaused = true;
    }
    function unPausedContract() public onlyRole(DEFAULT_ADMIN_ROLE){
        require(isPaused, "contract has been running");
        isPaused = false;
    }
    function setStartBlock(uint256 _startBlock) public onlyRole(DEFAULT_ADMIN_ROLE){
        require(_startBlock >= block.number, "startBlock must be greater than or equal to the current block number");
        startBlock = _startBlock;
    }
    function setEndBlock(uint256 _endBlock) public onlyRole(DEFAULT_ADMIN_ROLE){
        require(_endBlock >= startBlock, "endBlock must be greater than or equal  startBlock");
        endBlock = _endBlock;
    }

    function addPool(
        address _pledgeTokenAddress, 
        uint256 _weight, 
        string memory _stName, 
        uint256 _minStToken, 
        uint256 _unLockedBlocks) public onlyRole(DEFAULT_ADMIN_ROLE){
            if (poolId == 0){
                // require(_pledgeTokenAddress == address(0x0), "pledgeToeknAddress must be zero");
                _pledgeTokenAddress = address(0x0); 
            }else{
                require(_pledgeTokenAddress != address(0x0), "pledgeToeknAddress not be zero");
            }
            require(_minStToken > 0, "minStToken must be greater than 0");
            require(_unLockedBlocks > 0, "unLockedBlocks must be greater than 0");
            require(block.number < endBlock, "pledge already is finished");
            if (_weight > 0){
                batchUpdatePoolInternal();
            }

            uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;

            totalWeight += _weight;
            poolList.push(PoolInfo({
                pid: poolId,
                pledgeTokenAddress: _pledgeTokenAddress,
                stName: _stName,
                lastRewordBlock: lastRewardBlock,
                allTokenNum: 0,
                tokenToRewardPerBlock: 0,
                minStTokenNum: _minStToken,
                poolWeight: _weight,
                rewards: 0,
                unLockedBlocks: _unLockedBlocks
            }));
            poolInfo[poolId] = poolList[poolList.length - 1];
            poolId++;

            emit AddPool(msg.sender, poolId, _pledgeTokenAddress, block.number);
        }
    function setWeight(uint256 _pid, uint256 _weight) public checkPaused onlyRole(DEFAULT_ADMIN_ROLE){
        require(_pid < poolList.length, "pid error");
        PoolInfo storage pool = poolInfo[_pid]; 
        require(_weight != pool.poolWeight, "weight is same");
        
        totalWeight = totalWeight - pool.poolWeight + _weight;
        pool.poolWeight = _weight;
    }

    function setLastRewardBlock(uint256 _pid, uint256 _lastRewardBlock) internal {
        require(_lastRewardBlock > poolInfo[_pid].lastRewordBlock, "_lastRewardBlock more than lastRewordBlock");
        poolInfo[_pid].lastRewordBlock = _lastRewardBlock;
    }

    function getRewardsForBlock(uint256 _start, uint256 _end) view internal returns(uint256){ //一段时间内区块产生的奖励
        require(_start < _end, "_start more than _end");
        uint256 _rewards = (_end - _start) * RCCPerBlock;
        return _rewards;
    }
    function getPoolPerTokenToRewardsForBlock(uint256 _pid, uint256 _rewards) internal view returns(uint256){
        PoolInfo storage _pool = poolInfo[_pid];
        uint256 rewardsIncrement = _pool.poolWeight / totalWeight * _rewards / _pool.allTokenNum;  
        return rewardsIncrement;
        
    }

    function updatePool(uint256 _pid) internal {
        require(_pid < poolList.length, "pool not exist");
        PoolInfo storage _pool = poolInfo[_pid];
        if (block.number <= _pool.lastRewordBlock || _pool.allTokenNum == 0) {  //质押未开始
            return;
        }
        uint256 _rewards = getRewardsForBlock(_pool.lastRewordBlock, block.number);
        uint256 _rewardsIncrement = getPoolPerTokenToRewardsForBlock(_pid, _rewards);
        _pool.tokenToRewardPerBlock += _rewardsIncrement;
        _pool.lastRewordBlock = block.number;
        emit UpdateReward(_rewardsIncrement, _pool.tokenToRewardPerBlock, _pid, block.number - _pool.lastRewordBlock);

    }
    function batchUpdatePoolInternal() internal {
        // require(poolList.length > 0, "poolList is empty");
        if (poolList.length > 0){
            for (uint256 i = 0; i < poolList.length; i++){
            updatePool(i);
        }
        }
        
    }

    function batchUpdatePool() external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(poolList.length > 0, "poolList is empty");
        batchUpdatePoolInternal();
    }



    function pledgeETH() external payable checkPaused{
        require(poolList.length > 0, "poolList is empty");
        require(msg.value >= poolList[0].minStTokenNum, "eth num too small");
        PoolInfo storage _pool = poolInfo[0];
        UserInfo storage _user = userInfo[0][msg.sender];
        uint256 _amount = msg.value;

        _pool.allTokenNum += _amount;
        // updatePool(0);
        _user.stAmount += _amount;
        setPendingReward(msg.sender, 0);
        emit PledgeRecord(msg.sender, 0, msg.value, block.number, _user.stAmount);

    }

    function pledgeERC20(uint256 _amount, uint256 _pid) external checkPaused{
        require(block.number < endBlock, "pledge already end");
        require(_pid <= poolId, "not exist pool");
        PoolInfo storage _pool = poolInfo[_pid];
        require(_amount >= _pool.minStTokenNum, "amount too small");
        UserInfo storage _user = userInfo[_pid][msg.sender];
        require(_amount <= IERC20(_pool.pledgeTokenAddress).balanceOf(msg.sender), "balance not enough");
        IERC20(_pool.pledgeTokenAddress).safeTransferFrom(msg.sender,address(this), _amount);
        _pool.allTokenNum += _amount;
        // updatePool(_pid);
        _user.stAmount += _amount;
        setPendingReward(msg.sender, _pid);
        emit PledgeRecord(msg.sender, _pid, _amount, block.number, _user.stAmount);

    }

    function setPendingReward(address _userAddress,uint256 _pid) internal {
        UserInfo storage _user = userInfo[_pid][_userAddress];
        PoolInfo storage _pool = poolInfo[_pid];
        if (_user.stAmount > 0){
           uint256 _pendingReward  = _user.stAmount*_pool.tokenToRewardPerBlock;
           _user.pendingReward += _pendingReward;
           _user.finishReward += _pendingReward;
        }
    }


    function unshake(uint256 _pid, uint256 _amount) public checkPaused {
        require(_amount > 0, "unshake: amount must be greater than 0");
        UserInfo storage _user = userInfo[_pid][msg.sender];
        PoolInfo storage _pool = poolInfo[_pid];
        require(_amount <= _user.stAmount && _amount <= _pool.allTokenNum, "unshake: amount exceeds staked amount");
        require(_pid < poolList.length, "unshake: invalid pid");
        _user.requests.push(unShakeRequest({
            // pid: _pid,
            // userAddr: msg.sender,
            amount: _amount,
            unLockBlock: block.number + _pool.unLockedBlocks

        }));
        _user.stAmount -= _amount;
        _pool.allTokenNum -= _amount;
        emit UnPledgeRecord(msg.sender, _pid, _amount, block.number,  _user.stAmount);
        
    }

    function claim(uint256 _pid) public checkPaused {
        require(_pid < poolList.length, "invalid pid");

        UserInfo storage _user = userInfo[_pid][msg.sender];
        // PoolInfo storage _pool = poolList[_pid];
        require(IERC20(RCCToken).balanceOf(address(this)) >= _user.pendingReward, "not enough reward");
        if(_user.pendingReward > 0){
            uint256 _pendingReward = _user.pendingReward;
            if (_user.requests.length > 0 && _user.requests[0].unLockBlock <= block.number){
                _pendingReward += getRequestsAmount(_pid, msg.sender);
            }
            _user.pendingReward = 0;
            IERC20(RCCToken).safeTransfer(msg.sender, _pendingReward);

        }
        emit ClaimEvEnt(msg.sender, _pid, _user.pendingReward, block.number);
    }


    function withdraw(uint256 _pid ) public checkPaused{
        require(poolList.length > _pid, "pool not exist");
        require(block.number >= endBlock, "pool not end");
        PoolInfo storage _pool = poolList[_pid];
        UserInfo storage _user = userInfo[_pid][msg.sender];
        if (_user.stAmount > 0){
            if (_pool.pledgeTokenAddress == address(0)){
                uint256 _amount = _user.stAmount;
                _user.stAmount = 0;
                (bool success, ) = payable(msg.sender).call{value: _amount}("");
                require(success, "withdraw eth failed");
            }else{
                uint256 _amount = _user.stAmount;
                _user.stAmount = 0;
                require(IERC20(_pool.pledgeTokenAddress).balanceOf(address(this))>= _amount, "withdraw token failed");
                IERC20(_pool.pledgeTokenAddress).safeTransfer(msg.sender, _amount);
            }
        }
    }

    function getRequestsAmount(uint256 _pid, address _userAddr) internal returns(uint256){
        UserInfo storage _user = userInfo[_pid][_userAddr];
        uint256 _amount;
        uint256 rl;
        for (uint256 i = 0; i < _user.requests.length; i++){
            if (block.number >=_user.requests[i].unLockBlock){
                rl = _user.requests.length;
                _amount += _user.requests[i].amount;
                _user.requests[i] = _user.requests[rl - 1];
                _user.requests.pop();
            }

        }
        return _amount;
    }
    function getValue() public pure returns(uint256) {
        return 10;
    }
    function getPools() public view returns(uint256){
        return poolId;
    } 
    function getPoolSymbol(uint256 _pid) public view returns(PoolInfo memory){
        return poolInfo[_pid];
    }



    // function withdrawRequest() external checkPaused onlyRole(DEFAULT_ADMIN_ROLE) {
    //     PoolInfo storage _pool;
    //     address _userAddr;
    //     uint256 _amount;
    //     uint256 rl;
    //     for(uint256 i =0; i < requests.length; i++){
            
    //         if (block.number >= requests[i].unLockBlock){
    //             rl = requests.length;
    //             _pool = poolInfo[requests[i].pid];
    //             _userAddr = requests[i].userAddr;
    //             _amount = requests[i].amount;
    //             requests[i] = requests[rl - 1];
    //             requests.pop();
    //             if (_pool.pledgeTokenAddress == address(0)){

    //                 (bool success, ) = payable(_userAddr).call{value: _amount}("");
    //                 require(success, "withdrawRequest failed");
    //             }else{
    //                 IERC20(_pool.pledgeTokenAddress).transfer(_userAddr, _amount);
    //             }

    //         }
    //     }


    // }

    function getUserInfo(uint256 _pid) public returns(uint256, uint256, uint256) {
        require(_pid < poolList.length, "getUserInfo: invalid pid");
        updatePool(_pid);
        UserInfo storage _user = userInfo[_pid][msg.sender];
        setPendingReward(msg.sender, _pid);
        return (_user.stAmount, _user.pendingReward, _user.finishReward);

    }














}