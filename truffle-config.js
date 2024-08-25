const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "YOUR_INFURA_PROJECT_ID"; // Replace with your Infura project ID
const mnemonic = "YOUR_METAMASK_SEED_PHRASE"; 
module.exports = {
  networks: {
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infuraKey}`),
      network_id: 5,       // Goerli's network ID
      gas: 4465030,        // Gas limit
      confirmations: 2,    // Number of confirmations to wait between deployments
      timeoutBlocks: 200,  // Number of blocks before deployment times out
      skipDryRun: true     // Skip dry run before migrations
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",    // Solidity compiler version
    }
  }
};
