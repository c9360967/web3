// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HelloWorld {
    string public hello;
    constructor() {
        hello = "Hello World";
    }
    function getHello() public view returns(string memory){
        return hello;
    }
}