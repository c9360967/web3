// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;


// 授权者（Owners）：多签钱包由多个授权者管理，每个授权者拥有一个私钥。
// 签名阈值（Required Signatures）：执行交易需要达到一定的签名数量（签名阈值），而不是所有授权者的签名。
// 交易提议：任何授权者可以提议交易，但交易需要达到签名阈值才能执行。
// 签名收集：授权者对交易进行签名，当签名数量达到阈值时，交易被执行。
// 执行交易：一旦交易获得足够的签名，智能合约会执行该交易，例如转移以太币或调用其他合约。

contract MultisigWallet {
    uint256 public required;
    uint256[] public txList;
    mapping (uint256 => uint256) public confirmNum;
    address[10] public ownerList;
    struct txInfo{
        address[] _owner;
        address from;
        address to;
        bool isConfirm;
        bool isExcute;
        uint256 value;
    }
    mapping(uint256 => txInfo) public allTxInfo;
    error customerErr(string);

    constructor(address[10] memory _ownerList, uint256 _required){
        ownerList = _ownerList;
        required = _required;
    }

    modifier confirmOwnerNumVerify(uint256 _tx){
        require(confirmNum[_tx] >= required, "num must greater than or equal to required");
        _;
    }
    modifier onlyOwner(){
        require(isOwner(msg.sender), "only owner can used it");
        _;
    }
    modifier onlyTranscationVerify(uint256 _tx){
        require(onlyTranscation(_tx), "tx can not repeat");
        _;
    }
    function onlyTranscation(uint256 _tx) public view  returns(bool){
        if (txList.length == 0){
            return true;
        }
        for (uint256 i = 0; i<= txList.length - 1;i++){
            if (_tx == txList[i]){
                return false;
            }
        }
        return true;
    }
    function isOwner(address _fr) public view returns(bool) {
        for (uint256 i = 0; i<=ownerList.length - 1; i++){
            if (_fr == ownerList[i]){
                return true;
            }
        }
        return false;
    }
    function txInTxList(uint256 _tx) public view returns(bool){
        for (uint256 i =0; i <= txList.length- 1; i++){
            if (_tx == txList[i]){
                return true;
            }
        }
        return false;
    }
    function verifyTxInfoOwner(uint256 _tx) public view returns(bool){
        address[] memory _newOwner = allTxInfo[_tx]._owner;
        if (_newOwner.length == 0){
            return false;
        }
        for (uint256 i = 0; i <= _newOwner.length - 1; i++){
            if(msg.sender == _newOwner[i]){
                return false;
            }
        }
        return true;
    }

    function submitTransaction(uint256 _tx, uint256 _value, address _to)  public onlyOwner onlyTranscationVerify(_tx){
        txList.push(_tx);
        address[] memory _owner;
        allTxInfo[_tx] = txInfo(_owner, msg.sender, _to, false, false, _value);
        confirmNum[_tx] += 1;

    }

    function ownersConfirmTranscation(uint256 _tx) public onlyOwner{
        require(txList.length != 0, "please submit transcation");
        require(txInTxList(_tx), "tx not in transcation list");
        require(verifyTxInfoOwner(_tx), "you alredy confirmed this tx, can't confirm again");
        require(!allTxInfo[_tx].isConfirm, "this transaction is already been confirmed");
        allTxInfo[_tx]._owner.push(msg.sender);
        confirmNum[_tx] += 1;
        if (confirmNum[_tx] >= required){
            allTxInfo[_tx].isConfirm = true;
        }

    }

    function cancel(uint256 _tx) public onlyOwner{
        require(txList.length != 0, "please submit transcation");
        require(txInTxList(_tx), "tx not in transcation list");
        require(!allTxInfo[_tx].isExcute, "tx already excuted, not cancel");
        require(allTxInfo[_tx]._owner.length >0, "_owner is null");
        require(!verifyTxInfoOwner(_tx), "you not confirm");
        address[] storage _newOwner = allTxInfo[_tx]._owner;
        for (uint256 i =0; i<= _newOwner.length - 1; i++){
            if (msg.sender == _newOwner[i]){
                _newOwner[i] = _newOwner[_newOwner.length -1];
                _newOwner.pop();
            }
        }
        allTxInfo[_tx]._owner = _newOwner;
        confirmNum[_tx] -= 1;
        if (allTxInfo[_tx].isConfirm && confirmNum[_tx] < required){
            allTxInfo[_tx].isConfirm = false;
        }

    }
    function excute(uint256 _tx) public onlyOwner{
        require(txList.length != 0, "please submit transcation");
        require(txInTxList(_tx), "tx not in transcation list");
        require(allTxInfo[_tx]._owner.length >0, "_owner is null");
        require(!allTxInfo[_tx].isConfirm, "confirm owners not enough,isConfirm is false");
        require(confirmNum[_tx] >= required, "confirm owners not enough");
        require(!allTxInfo[_tx].isExcute, "tx already excuted, not cancel");
        uint256 _value = allTxInfo[_tx].value;
        address _to = allTxInfo[_tx].to;
        allTxInfo[_tx].isExcute = true;
        (bool success, ) = payable(_to).call{value: _value}("");
        require(success, "payable failed");

    }


}