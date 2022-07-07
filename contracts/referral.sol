// SPDX-License-Identifier: unlicensed

pragma solidity >=0.8.0;

interface IReferral {
  event SetReferral(address indexed addr, address referredByAddr);

  function setReferral(address referredBy) external;

  function getReferral(address _addr) external view returns (address);

  function setNewOwner(address _newOwner) external;

  function setMarketingAddress(address _newAddress) external;

  function getMarketingAddress() external view returns (address _marketingAddr);
}

library SafeMath {
  function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
    require((z = x + y) >= x, 'ds-math-add-overflow');
  }

  function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
    require((z = x - y) <= x, 'ds-math-sub-underflow');
  }

  function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
    require(y == 0 || (z = x * y) / y == x, 'ds-math-mul-overflow');
  }
}

contract Referral is IReferral {
  using SafeMath for uint256;
  address public owner;
  mapping(address => uint256) public referredByCount;

  address public marketingWallet;
  mapping(address => address) public referrerOf;

  modifier onlyOwner() {
    require(owner == msg.sender, 'Ownable: caller is not the owner');
    _;
  }

  event SetMarketingAddress(address marketingAddress);
  event setOwner(address _newOwner);

  constructor(address _marketingWallet) {
    owner = msg.sender;
    marketingWallet = _marketingWallet;
  }

  function setReferral(address referredBy) external override {
    require(referrerOf[msg.sender] == address(0), 'err: this address already has a referrer');
    require(referredBy != address(0) && referredBy != msg.sender, 'err: referrer address is invalid');

    referrerOf[msg.sender] = referredBy;
    referredByCount[referredBy] = referredByCount[referredBy].add(1);

    emit SetReferral(msg.sender, referredBy);
  }

  function getReferral(address _addr) external view override returns (address referredBy) {
    referredBy = referrerOf[_addr];
  }

  function setNewOwner(address _newOwner) external override onlyOwner {
    require(owner != _newOwner, 'err: new owner is the current owner of contract');
    owner = _newOwner;
    emit setOwner(_newOwner);
  }

  function setMarketingAddress(address _newAddress) external override onlyOwner {
    require(marketingWallet != _newAddress, 'err: marketing addr is already set to this address');
    marketingWallet = _newAddress;
    emit SetMarketingAddress(_newAddress);
  }

  function getMarketingAddress() external view override returns (address _marketingAddr) {
    _marketingAddr = marketingWallet;
  }
}
