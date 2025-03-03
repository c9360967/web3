// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract arrTest{
    uint256[] public arr1;
    uint256[3] public arr2;


    function pushArr1(uint256 a) public {
        arr1.push(a);
    }
    function popArr1() public {
        arr1.pop();
    }
    function removeArr1(uint256 index) public {
        delete  arr1[index];
    }
    function getArr1() view public returns(uint[] memory){
        return arr1;
    }
    
}