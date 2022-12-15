const grpc = require('@grpc/grpc-js');
const {CalculatorServiceClient} = require('../proto/calculator_grpc_pb');
const {SumRequest} = require('../proto/sum_pb');
const {PrimesRequest} = require('../proto/primes_pb');

function doSum(client) {
    console.log('doCalculation was invoked');

    const req = new SumRequest()
        .setFirstNumber(1)
        .setSecondNumber(7);

    client.sum(req, (err, res) => {
        if (err) {
            return console.log(err);
        }

        console.log(`Sum: ${res.getResult()}`);
    })
}

function doPrimes(client) {
    console.log('doPrimes was invoked');
    const req = new PrimesRequest()
        .setNumber(12390392840)

    const call = client.primes(req);

    call.on('data', (res) => {
        console.log(`Primes: ${res.getResult()}`);
    })
}

function main() {
    const credentials = grpc.ChannelCredentials.createInsecure();
    const client = new CalculatorServiceClient('localhost:50051', credentials);

    // doSum(client);
    doPrimes(client);
    client.close();
}

main();