const {SumResponse} = require('../proto/sum_pb');
const {PrimesResponse} = require('../proto/primes_pb');
const {AvgResponse} = require('../proto/avg_pb');

exports.sum = (call, callback) => {
    console.log('sum was invoked');
    const res = new SumResponse()
        .setResult(
            call.request.getFirstNumber() + call.request.getSecondNumber()
        );

    callback(null, res);
}

exports.primes = (call, _) => {
    console.log('premise was invoked');

    let number = call.request.getNumber();
    let divisor = 2;

    const res = new PrimesResponse();

        while (number > 1) {
            if (number % divisor === 0) {
                res.setResult(divisor);
                call.write(res);
                number = number / divisor;
            } else {
                ++divisor;
            }
        }

    call.end();
       
}

exports.avg = (call, callback) => {
    console.log('Avg was invoked');

    let count = 0.0;
    let total = 0.0;

    call.on('data', (req) => {
        total += req.getNumber();
        ++count;
    });

    call.on('end', () => {
        const res = new AvgResponse()
            .setResult(total / count);

        callback(null, res);
    })
}