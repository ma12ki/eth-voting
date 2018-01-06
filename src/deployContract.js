const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const solc = require('solc');

const { candidates } = require('./config');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const contractCode = fs.readFileSync(path.join(__dirname, 'Voting.sol')).toString();
const compiledCode = solc.compile(contractCode);
const { interface, bytecode } = compiledCode.contracts[':Voting'];
const VotingContract = web3.eth.contract(JSON.parse(interface));

module.exports = () => deploy()
    .then(contract => {
        console.log(`contract deployed at ${contract.address}`);
        return { abi: contract.abi, address: contract.address, account: web3.eth.accounts[0] };
    });

function deploy(){
    return new Promise((resolve, reject) => {
        const gasEstimate = web3.eth.estimateGas({ data: bytecode });
        VotingContract.new(candidates, { data: bytecode, from: web3.eth.accounts[0], gas: gasEstimate * 10 }, (err, contract) => {
            if (err) {
                return reject(err);
            }
        
            if (contract.address) {
                resolve(contract);
            }
        });
    });
} 
