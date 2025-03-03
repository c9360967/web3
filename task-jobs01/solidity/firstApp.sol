//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract FistApp {
    uint256 public count;
    constructor() {
        count = 0;
    }
    function getCount() public view returns(uint256) {
        return count;
    }
    function addCount() public{
        count += 1;
    }
    function reduceCount() public {
        count -= 1;
    }
}