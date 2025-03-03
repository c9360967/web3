// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Test {
    address public owner;
    uint256 a;
    constructor(address _owner, uint256 _a){
        a = _a;
        owner = _owner;
    }

    function setA(uint256 _a) public {
        a = _a;
    }
}