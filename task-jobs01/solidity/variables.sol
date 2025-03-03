// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract Variables{
    string public member;

    function myFunc() public returns(uint256, string memory, address) {
        uint256 i = 10;
        member = "aa";
        address sender = msg.sender;
        return (i, member, sender);
    }
}