const grpc = require('@grpc/grpc-js');
const {GreetServiceClient} = require('../proto/greet_grpc_pb');
const {GreetRequest} = require('../proto/greet_pb');

function doGreet(client) {
    console.log('doGreet was invoked');

    const req = new GreetRequest()
        .setFirstName('Sasha');

    client.greet(req, (err, res) => {
        if (err) {
            return console.log(err);
        }

        console.log(`Greet: ${res.getResult()}`);
    })
}

function main() {
    const credentials = grpc.ChannelCredentials.createInsecure();
    const client = new GreetServiceClient('localhost:50051', credentials);

    doGreet(client);
    client.close();
}

main();