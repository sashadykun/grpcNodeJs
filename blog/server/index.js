const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const serviceImpl = require('./service_impl');
const {BlogServiceService} = require('../proto/blog_grpc_pb');

const address = 'localhost:50051';

function cleanup(server) {
    console.log('Cleanup');

    if(server) {
        server.forceShutdown();
    }
}

function main() {
    const server = new grpc.Server();
    const tls = true;
    let credentials;
    if ( tls ) {
        const roorSert = fs.readFileSync('./ssl/ca.crt');
        const certChain = fs.readFileSync('./ssl/server.crt');
        const privateKey = fs.readFileSync('./ssl/server.pem');

        credentials = grpc.ServerCredentials.createSsl(roorSert, [{
            cert_chain: certChain,
            private_key: privateKey
        }]);

    } else{
        credentials = grpc.ServerCredentials.createInsecure();
    }

    process.on('SIGINT', () => {
        console.log('Caught interrupt signal');
        cleanup(server);
    })

    server.addService(BlogServiceService, serviceImpl);
    server.bindAsync(address, credentials, (err, _) => {
        if(err) {
            return cleanup(server);
        }

        server.start();
    });

    console.log(`listening on: ${address}`);
}

main();
