// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IFeature{
    function initialize(address _RCCTokenAddresss, uint256 _startBlock, uint256 _endBlock,uint256 _RCCPerBlock) external;

    function setRCCPerBlock(uint256 _RCCPerBlock) external;

    function pausedContract() external;

    function unPausedContract() external;

    function setStartBlock(uint256 _startBlock) external;

    function setEndBlock(uint256 _endBlock) external;

    function addPool(
        address _pledgeTokenAddress, 
        uint256 _weight, 
        string memory _stName, 
        uint256 _minStToken, 
        uint256 _unLockedBlocks) external;
    function setWeight(uint256 _pid, uint256 _weight) external;

    function batchUpdatePoolexternal() external;

    function batchUpdatePool() external;

    function pledgeETH() external payable;

    function pledgeERC20(uint256 _amount, uint256 _pid) external;

    function unshake(uint256 _pid, uint256 _amount) external;

    function claim(uint256 _pid) external;

    function withdraw(uint256 _pid ) external;

    function getUserInfo(uint256 _pid) external returns(uint256, uint256, uint256);

    function upgradeTo(address newImplementation) external;




}