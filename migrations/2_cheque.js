var Cheque = artifacts.require("./Cheque.sol");

module.exports = function (deployer) {
    deployer.deploy(Cheque, { value: 1e18 });
};
