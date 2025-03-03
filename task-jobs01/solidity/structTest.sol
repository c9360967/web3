// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyStruct{
    struct Persion{
        uint256 id;
        string name;
        uint256 age;
    }
    mapping(string => Persion) info;
    Persion public p;

    function setPersion(uint256 _id, string memory _name, uint256 _age) public {
        // p = Persion(_id, _name, _age);
        p.id = _id;
        p.name = _name;
        p.age = _age;
    }

    function setInfo(uint256 _id, string memory _name, uint256 _age) public {
        // info[_name] = Persion(_id, _name, _age);
        info[_name].id = _id;
        info[_name].name = _name;
        info[_name].age = _age;
    }
}