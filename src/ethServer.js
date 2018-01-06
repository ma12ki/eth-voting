const ganache = require('ganache-cli');

const port = 8545;
const server = ganache.server();

server.listen(port, (err, blockchain) => {
    if (err) {
        throw err;
    }

    console.log(`eth server running at port ${port}`);
});
