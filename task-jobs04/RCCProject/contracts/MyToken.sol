// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20FlashMint} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract MyToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit, ERC20FlashMint {
    using Math for uint256;
    constructor()
        ERC20("MT", "MT")
        Ownable(msg.sender)
        ERC20Permit("MyToken")
    {}

    uint256 public constant NT_PRICE = 0.01 * 10**18; 
    uint256 public constant MIN_ETH = 0.01 * 10**18;
    modifier checkMinValue(uint256 _amount){
        (bool success, uint256 ethNumber) = NT_PRICE.tryMul(_amount);
        require(success, "ethNumber overflow");
        require(ethNumber  >= MIN_ETH, "eth too small");
        _;
    }
    function getEthNumber(uint256 _amount) public pure checkMinValue(_amount) returns(uint256){
        return NT_PRICE * _amount;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // function mint(address to, uint256 amount) internal {
    //     _mint(to, amount);
    // }

    function mintToken(uint256 _amount) external payable{
        // require(msg.value == _amount * NT_PRICE, "eth quantity error");
        _mint(msg.sender, _amount);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}