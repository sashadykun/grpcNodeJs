const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const {BlogServiceClient} = require('../proto/blog_grpc_pb');
const {Blog, BlogId} = require('../proto/blog_pb');

function createBlog(client) {
    console.log('--- createBlog was invoked ---');

    return new Promise((resolve, reject) => {
        const req = new Blog()
            .setAuthorId('Sasha')
            .setTitle('My first Blog')
            .setContent('Content of the first blog');

        client.createBlog(req, (err, res) => {
            if (err) {
                reject(err);
            }

            console.log(`Blog was created: ${res}`);
            resolve(res.getId());
        })
    })
}



async function main() {
    const tls = true;
    let credentials;
    if (tls) {
        const rootCert = fs.readFileSync('./ssl/ca.crt');

        credentials = grpc.ChannelCredentials.createSsl(rootCert);
    } else {
        credentials = grpc.ChannelCredentials.createInsecure();
    };

    const client = new BlogServiceClient('localhost:50051', credentials);

    const id = await createBlog(client);
    
    client.close();
}

main();