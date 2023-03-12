const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const {BlogServiceClient} = require('../proto/blog_grpc_pb');
const {Blog, BlogId} = require('../proto/blog_pb');
const {Empty} = require('google-protobuf/google/protobuf/empty_pb');


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

function readBlog(client, id) {
    console.log('--readBlog was invoked--');

    return new Promise((resolve, reject) => {
        const req = new BlogId().setId(id);

        client.readBlog(req, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve();
            console.log(`Blog was read: ${res}`);
            
        })
    })
}

function updateBlog(client, id) {
    console.log('--updateBlog was invoked');

    return new Promise((resolve, reject) => {
        const req = new Blog()
            .setId(id)
            .setAuthorId('Anthon')
            .setTitle('First updated title')
            .setContent('Content was updated and blog now can update it stuf');

        client.updateBlog(req, (err, _) => {
            if (err) {
                reject();
            }

            console.log('Blog was updated!');
            resolve();
        })
    
    })
}

function listBlogs(client) {
  console.log('--listBlog was invoked--');

  return new Promise((resolve, reject) => {
    const req = new Empty();
    const call = client.listBlogs(req);

    call.on('data', (res) => {
      console.log(res);
    });

    call.on('error', (err) => {
      reject(err);
    });

    call.on('end', () => {
      resolve();
    });
  });
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
    await readBlog(client, id);
    await updateBlog(client, id);
    await listBlogs(client);
    client.close();
}

main();