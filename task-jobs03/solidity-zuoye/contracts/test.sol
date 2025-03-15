// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Test {
    address private owner;
    uint256 private MIN_VALUE = 1 * 10**18;
    mapping (address => uint256) public userAmount;
    event Log(address indexed, uint256 indexed);
    event TestEvent(uint256, uint256);
    event ReceiveEth(address indexed from, address indexed to, uint256 value);

    constructor(address _owner) {
        emit TestEvent(9, 67);
        owner = _owner;
    }

    function collection() external payable{
        require(msg.value >= MIN_VALUE, "not transffer enough ETH");
        emit ReceiveEth(msg.sender, address(this), msg.value);
        userAmount[msg.sender] = msg.value;
    }

    function getBalance() public view returns(uint256){
        return userAmount[msg.sender];
    }
    function getContractBalance() public view returns(uint256){
        return address(this).balance;
    }

    function getAmountToOwner() public {
        require(msg.sender == owner, "not owner");
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success, "getAmount failed");

    }

    function setOwner(address _owner) public {
        require(msg.sender == owner, "not owner");
        owner = _owner;
    }
    function getOwner() public returns(address){
        emit Log(owner, address(this).balance);
        return owner;
    }
}