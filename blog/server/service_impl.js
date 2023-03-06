const grpc = require('@grpc/grpc-js');
const {Blog, BlogId} = require('../proto/blog_pb');


function blogToDocument(blog) {
    return {
        autor_id: blog.getAuthorId(),
        title: blog.getTitle(),
        content: blog.getContent(),
    }
    
}

const internal = (err, callback) => callback({
    code: grpc.status.INTERNAL,
    message: err.toSrting(),
});

function checkNotAcknowledged(res, callback) {
    if (!res.acknowledged) {
        callback({
            code: grpc.status.INTERNAL,
            message: `Operation wasn\'t acknowledged`,
        });
    }
}

exports.createBlog = async (call, callback) => {
    const data = blogToDocument(call.request);

    await collection.insertOne(data).then((res) => {
        checkNotAcknowledged(res, callback);
        const id = res.insertedId.toString();
        const blogId = new BlogId().setId(id);

        callback(null, blogId);
    }).catch((err) => {
        internal(err, callback);
    })
}