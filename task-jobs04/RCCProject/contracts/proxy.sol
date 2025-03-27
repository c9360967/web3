// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./InterfaceFeature.sol";


contract FeatureProxy{
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
    mapping (uint256 => mapping(address => UserInfo)) userInfo;
    IERC20 public RCCToken;
    uint256 startBlock;
    uint256 endBlock;
    uint256 RCCPerBlock;  
    bytes32 public constant UPGRADE_ROLE = keccak256("upgrade_role");
    bool isPaused;
    uint256 poolId;
    uint256 totalWeight;
    PoolInfo[] public poolList;
    // bytes32 private constant _IMPLEMENTATION_SLOT = keccak256("eip1967.proxy.implementation");

// onlyRole(DEFAULT_ADMIN_ROLE)
    constructor(address featureAddr, bytes memory initDataSinger) {
            assembly{
                sstore(0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc, featureAddr)
            }
            (bool success, ) = featureAddr.delegatecall(initDataSinger);
            require(success, "Initialization failed");

        }

    // function initialize(
    //     address _RCCTokenAddresss,
    //     uint256 _startBlock,
    //     uint256 _endBlock,
    //     uint256 _RCCPerBlock,
    //     address featureAddr
    // ) public initializer {

    //     address initialImpl = featureAddr;
    //     implementation = initialImpl;
    //     __AccessControl_init();
    //     _grantRole(UPGRADE_ROLE, msg.sender);
    //     _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);


    //     IFeature(initialImpl).initialize(
    //         _RCCTokenAddresss,
    //         _startBlock,
    //         _endBlock,
    //         _RCCPerBlock
    //     );
    // }

    fallback() external payable {
        _fallback();
    }

    receive() external payable {
        _fallback();
    }

    function _fallback() internal {

        assembly {
            let logic := sload(0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc)
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), logic, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }



    
}
