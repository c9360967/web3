// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract enumTest{
    enum Test{
        a,
        b,
        c
    }
    Test public test;
    function getTest() public view  returns (Test){
        return test;
    }
    function removeTest() public {
        delete test;
    }
        
    
}