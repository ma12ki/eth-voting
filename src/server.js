const express = require('express');
const ejs = require('ejs');

const { rpcPort, candidates } = require('./config');
const deployContract = require('./deployContract');
const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Voting on the Ethereum blockchain!</title>
    <script>
        const params = JSON.parse('<%- params %>');
    </script>
</head>
<body>
    ohai :3
</body>
</html>
`;

const app = express();

deployContract().then(contract => {
    const params = JSON.stringify({
        contract,
        candidates,
        rpcPort,
    });
    const page = ejs.render(template, { params });

    app.use((req, res) => res.send(page));
    app.listen(3000);
});
