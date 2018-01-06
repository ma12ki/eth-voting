const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const solc = require('solc');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const contractCode = fs.readFileSync(path.resolve('src', 'Voting.sol')).toString();
const compiledCode = solc.compile(contractCode);
const { interface, bytecode } = compiledCode.contracts[':Voting'];
const VotingContract = web3.eth.contract(JSON.parse(interface));

deploy()
    .then(contract => {
        console.log(contract.address);
        const contractInstance = VotingContract.at(contract.address);
        console.log(contractInstance.address);
    });

function deploy(){
    return new Promise((resolve, reject) => {
        VotingContract.new(['Rama','Nick','Jose'], {data: bytecode, from: web3.eth.accounts[0], gas: 4700000}, (err, contract) => {
            if (err) {
                return reject(err);
            }
        
            if (contract.address) {
                resolve(contract);
            }
        });
    });
} 

