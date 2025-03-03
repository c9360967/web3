// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract judgeTest{
    bool public a;
    uint256 public b;
    
    function getB() public returns(uint256){
        if (!a) {
            b = 10;
            a = !a;
            return b;
        }
        return b; 
    }
}