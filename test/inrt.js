var INRt = artifacts.require("./INRt.sol");

contract('INRt', function(accounts) {
  it("should put 10000 INRt in the first account", function() {
    return INRt.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
  it("should call a function that depends on a linked library", function() {
    var inr;
    var inrtBalance;
    var inrtEthBalance;

    return INRt.deployed().then(function(instance) {
      inr = instance;
      return inr.getBalance.call(accounts[0]);
    }).then(function(outCoinBalance) {
      inrtBalance = outCoinBalance.toNumber();
      return inr.getBalanceInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      inrtEthBalance = outCoinBalanceEth.toNumber();
    }).then(function() {
      assert.equal(inrtEthBalance, 2 * inrtBalance, "Library function returned unexpected function, linkage may be broken");
    });
  });
  it("should send coin correctly", function() {
    var inr;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return INRt.deployed().then(function(instance) {
      inr = instance;
      return inr.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return inr.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return inr.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return inr.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return inr.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
