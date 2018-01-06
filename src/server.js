const fs = require('fs');
const path = require('path');
const express = require('express');
const ejs = require('ejs');

const { rpcPort, candidates } = require('./config');
const deployContract = require('./deployContract');
const template = fs.readFileSync(path.join(__dirname, 'index.ejs')).toString();

const app = express();

deployContract().then(contract => {
    const params = JSON.stringify({
        contract,
        account: contract.account,
        candidates,
        rpcPort,
    });
    const page = ejs.render(template, { params });

    app.use(express.static(__dirname));
    app.use((req, res) => res.send(page));
    app.listen(3000);
});
