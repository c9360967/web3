
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20FlashMint} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import { USDTToken } from "./mintUSDT.sol";

contract IDOToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit, ERC20FlashMint {
    USDTToken public usdt;
    mapping(address => uint256) userIdoBalance;
    uint256 MAX_MINT = 100;
    uint256 price_eth = 0.1 * 10 **18;
    uint256 price_usdt = 280 * 10 **18;
    uint256 public allIDOTokenNum;

    constructor(address _usdtAddress)
        ERC20("IDOToken", "IDO")
        Ownable(msg.sender)
        ERC20Permit("IDO")
    {
        usdt = USDTToken(_usdtAddress);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint256 amount) public {
        require(usdt.balanceOf(msg.sender)/price_usdt >= amount, "no have enough usdt");
        require(userIdoBalance[msg.sender] > 0, 'you alerdy minted');
        require(allIDOTokenNum + amount <= MAX_MINT, "mint failed");
        usdt.approve(address(this), amount*price_usdt);
        usdt.transferFrom(msg.sender, address(this), amount*price_usdt);
        userIdoBalance[msg.sender] = amount;
        _mint(msg.sender, amount);
        allIDOTokenNum += amount;
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }


}


    

