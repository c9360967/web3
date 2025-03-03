// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract readAndWrite {
    uint256 private a;

    function getA() public view returns(uint256){
        return a;
    }
    function setA(uint256 _a) public {
        a = _a;
    }
}