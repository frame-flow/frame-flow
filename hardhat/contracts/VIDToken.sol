// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

error VIDToken__NotAdmin();
error VIDToken__AdvertisersCannotSellToken();
error VIDToken__OnlySellToAdvertisers();

contract VIDToken is ERC20 {
    address private immutable i_admin;
    mapping(address => bool) private is_advertisers;
    mapping(address => bool) private whitelist;

    constructor(address admin) ERC20("Video", "VID") {
        i_admin = admin;
    }

    function playVideo(address account, uint256 value) external {
        if (msg.sender != i_admin) {
            revert VIDToken__NotAdmin();
        }
        _mint(account, value);
    }

    function clickAD(address advertiser, uint256 value) external {
        if (msg.sender != i_admin) {
            revert VIDToken__NotAdmin();
        }
        _burn(advertiser, value);
    }

    function setAdvertiser(address advertiser, bool is_advertiser) external {
        if (msg.sender != i_admin) {
            revert VIDToken__NotAdmin();
        }
        is_advertisers[advertiser] = is_advertiser;
    }

    function setWhiteList(address _whitelist, bool is_whitelist) external {
        if (msg.sender != i_admin) {
            revert VIDToken__NotAdmin();
        }
        whitelist[_whitelist] = is_whitelist;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        check(from, to);
        _transfer(from, to, amount);
        return true;
    }

    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool) {
        address owner = _msgSender();
        check(owner, to);
        _transfer(owner, to, amount);
        return true;
    }

    function check(address from, address to) internal view returns (bool) {
        if (is_advertisers[from]) {
            if (!whitelist[from]) {
                revert VIDToken__AdvertisersCannotSellToken();
            }
        }
        if (!is_advertisers[to]) {
            if (!whitelist[to]) {
                revert VIDToken__OnlySellToAdvertisers();
            }
        }
        return true;
    }

    function getAdvertiser(address advertiser) external view returns (bool) {
        return is_advertisers[advertiser];
    }

    function getAdmin() external view returns (address) {
        return i_admin;
    }

    function getWhiteList(address _whitelist) external view returns (bool) {
        return whitelist[_whitelist];
    }
}
