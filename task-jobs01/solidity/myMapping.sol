// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
contract MyMapping{
    mapping(string => uint256) public a;
    mapping(address => mapping(string => uint256)) public b;

    function setA(string memory _as, uint256 _aUint) public {
        a[_as] = _aUint;
    }
    function getA(string memory _a) public view returns(uint256){
        return a[_a];
    }

    function removeA(string memory _a) public {
        delete a[_a];
    }
    function setB(string memory _b, uint256 _bUint) public {
        b[msg.sender][_b] = _bUint; 
    }
    function getB(string memory _b) public view returns(uint256){
        return b[msg.sender][_b];
    }
    function removeB_mapping(string memory _b) public {
        delete b[msg.sender][_b];
    }
}