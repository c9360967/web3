// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyEvent {
    uint256 public a;
    uint256 public b;
    event Log(uint256, uint256);
    event LogIndex(string indexed, uint256 indexed, address);

    function test() public {
        a = 99;
        b = 20;
        emit Log(a, b);
    }

    function testA() public {
        string memory str = "hello";
        a = 88;
        emit LogIndex(str, a, address(this));
    }
}