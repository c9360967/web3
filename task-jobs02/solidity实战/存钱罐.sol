// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract Bank {
    address owner;
    mapping(address => uint256) balances;
    constructor(address _owner){
        owner = _owner;
    }
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function getUserBalance() public view returns(uint256){
        return balances[msg.sender];
    }
    function getEth() public {
        require(msg.sender == owner, "only owner can use it");
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "extract failed");
        selfdestruct(payable(owner));
    }
}


