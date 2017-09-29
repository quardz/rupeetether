pragma solidity ^0.4.16;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/INRt.sol";

contract TestINRt {

  function testInitialBalanceUsingDeployedContract() {
    INRt inr = INRt(DeployedAddresses.INRt());

    uint expected = 10000;

    Assert.equal(inr.getBalance(tx.origin), expected, "Owner should have 10000 INRt initially");
  }

  function testInitialBalanceWithNewINRt() {
    INRt inr = new INRt();

    uint expected = 10000;

    Assert.equal(inr.getBalance(tx.origin), expected, "Owner should have 10000 INRt initially");
  }

}
