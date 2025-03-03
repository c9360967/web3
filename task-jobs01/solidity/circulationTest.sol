// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract circulationTest{
    uint256[]  arr;
    function test() public  {
        uint256 i = 0;
        
        for (i = 0; i <=100; i++){
            if (i == 7){
                continue;
            }else if(i == 15) {
                break;
            }
            arr.push(i);
        }
    }
}