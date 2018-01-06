const ganache = require('ganache-cli');

const { rpcPort } = require('./config');

const server = ganache.server();

return new Promise((resolve, reject) => {
    server.listen(rpcPort, (err, blockchain) => {
        if (err) {
            return reject(err);
        }
    
        console.log(`eth server running at port ${rpcPort}`);
        resolve();
    });
});
