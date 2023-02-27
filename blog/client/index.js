const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const {BlogServiceClient} = require('../proto/blog_grpc_pb');



function main() {
    const tls = true;
    let credentials;
    if (tls) {
        const rootCert = fs.readFileSync('./ssl/ca.crt');

        credentials = grpc.ChannelCredentials.createSsl(rootCert);
    } else {
        credentials = grpc.ChannelCredentials.createInsecure();
    };

    const client = new BlogServiceClient('localhost:50051', credentials);

    
    client.close();
}

main();