// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;


contract toDoTask{
    uint256 public id;
    struct taskInfo{
        uint256 id;
        string name;
        bool isFinished;
    }
    mapping(string => taskInfo) task;

    function createTask(string memory _name) public {
        id += 1;
        task[_name] = taskInfo(id, _name, false);
    }

    function setTaskName(string memory _name, string memory _newName) public {
        task[_newName] = task[_name];
        task[_newName].name = _newName;
        delete task[_name];
    }

    function manChangeTaskStatus(string memory _name, bool _status) public {
        task[_name].isFinished = _status;
    }

    function autoChangeTaskStatus(string memory _name) public {
        task[_name].isFinished = !task[_name].isFinished;
    }

    function getTaskInfo(string memory _name) public view returns(uint256, string memory, bool){
        taskInfo storage ti = task[_name];
        return (ti.id, ti.name, ti.isFinished);
    }



}