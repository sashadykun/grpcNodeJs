const grpc = require('@grpc/grpc-js');
const serviceImpl = require('./service_impl');
const {GreetServiceService} = require('../proto/greet_grpc_pb');

const address = 'localhost:50051';

function cleanup(server) {
    console.log('Cleanup');

    if(server) {
        server.forceShutdown();
    }
}

function main() {
    const server = new grpc.Server();
    const credentials = grpc.ServerCredentials.createInsecure();

    process.on('SIGINT', () => {
        console.log('Caught interrupt signal');
        cleanup(server);
    })

    server.addService(GreetServiceService, serviceImpl);
    server.bindAsync(address, credentials, (err, _) => {
        if(err) {
            return cleanup(server);
        }

        server.start();
    });

    console.log(`listening on: ${address}`);
}

main();
