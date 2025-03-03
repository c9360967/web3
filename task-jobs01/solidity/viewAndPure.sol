// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ViewAndPure{
    uint256 public a;

    function setA() public {
        a = 10;
    } 
    function getA() public view returns(uint256){
        return a;
    }
    function getB() public pure returns(uint256){
        uint256 b = 8;
        return b;
    }
}