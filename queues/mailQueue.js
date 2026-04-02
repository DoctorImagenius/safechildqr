const Queue = require("bull");

const mailQueue = new Queue("mailQueue", {
    redis: {
        host: "localhost",
        port: 6379,
    },
});

module.exports = mailQueue;