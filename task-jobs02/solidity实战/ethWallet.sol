// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract EthWallet{
    address public owner;
    mapping(address => uint256) userAmount;

    constructor(address _owner){
        owner = _owner;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can used it");
        _;
    }
    modifier verifyMoney(uint256 money){
        require(money > 0, "eth must >= 0");
        require(address(this).balance >= money, "not sufficient fund");
        _;
    }
    function deposit() external payable{
        userAmount[msg.sender] += msg.value;
    }

    function withdrawal(uint256 _a) external onlyOwner verifyMoney(_a){
        payable(msg.sender).transfer(_a);
    }

    function withdrawal01(uint256 _a) external onlyOwner verifyMoney(_a){
        bool success = payable(msg.sender).send(_a);
        require(success, "send failed");
    }

    function withdrawal02(uint256 _a) external onlyOwner verifyMoney(_a){
        (bool success, ) = payable(msg.sender).call{value: _a}("");
        require(success, "call failed");
    }

    function getBalance() view public returns(uint256){
        return address(this).balance;
    }
    function setOwner(address _owner) public onlyOwner{
        owner = _owner;
    }
}