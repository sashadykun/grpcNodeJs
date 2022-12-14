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

function doGreetManyTimes(client) {
    console.log('doGreetManyTimes was invoked');

    const req = new GreetRequest()
        .setFirstName('Dasha');
    const call = client.greetManyTimes(req);

    call.on('data', (res) => {
        console.log(`GreetManyTImes: ${res.getResult()}`);
    })
}

function doLongGreet(client) {
    console.log('doLongGreet was invoked');

    const names = ['Sosa', 'Mosa', 'Testos'];
    const call = client.longGreet((err, res) => {
        if (err) {
            return console.log(err);
        }
        console.log(`LongGreet: ${res.getResult()}`);
    })

    names.map((name) => {
        return new GreetRequest().setFirstName(name);
    }).forEach((req) => call.write(req));
    call.end();
}

function main() {
    const credentials = grpc.ChannelCredentials.createInsecure();
    const client = new GreetServiceClient('localhost:50051', credentials);

    // doGreetManyTimes(client);
    // doGreet(client);
    doLongGreet(client);
    client.close();
}

main();