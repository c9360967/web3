// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract error{
    error custError(string a);
    address public owner;

    constructor(address _owner){
        owner = _owner;

    }

    function setOwner(address _owner) public {
        if (owner == address(0)){
            revert custError({
                a: "this is custumer err"
            });
        }
        require(owner == msg.sender, "permission denied");
        owner = _owner;
        

    }

    function assertTest() pure public {
        assert(true);
    }

}