var ConvertLib = artifacts.require("./ConvertLib.sol");
var INRt = artifacts.require("./INRt.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, INRt);
  deployer.deploy(INRt);
};
