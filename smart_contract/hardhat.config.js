require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/nygCS0DEXY0juqZs8el1DIQ13r5ooVM-',
      accounts: ['90666ec7e57a1c157867dd43f591c50facf005983a68cf3185f302ab847f720e']
    }
  }
}