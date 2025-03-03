// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;


contract modifierTest {
    address public owner;
    uint256 public n;
    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "permission denied");
        _;
    }
    modifier a() {
        n = 1;
        _;
    }
    modifier b() {
        n = 2;
        _;
    }

    function setOwner(address _owner) public onlyOwner {
        owner = _owner;
    }

    function getN01() public a b returns (uint256){
        return n;
    }
    function getN02() public b a returns(uint256){
        return n;
    }
}