// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract crowFund {
    address owner;
    uint256 public constant TARGET = 10 * 10 **18;
    mapping(address => uint256) userAmount;
    bool public isClosed;

    constructor(address _owner){
        owner = _owner;
    }

    function fund() external payable {
        require(!isClosed, "Funding has already been closed");
        require(address(this).balance < TARGET, "goal achieved,thanks");
        userAmount[msg.sender] += msg.value;
    }

    function getFund() external {
        require(!isClosed, "crowFund closed");
        require(msg.sender == owner, "only owner use it");
        require(address(this).balance >= TARGET, "not getfund");
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success, "getfund failed");
        isClosed = true;
    }

    function setOwner(address _owner) public {
        require(msg.sender == owner, "only owner use it");
        owner = _owner;
    }

    function getBalance() public view returns (uint256){
        return address(this).balance;
    }
}