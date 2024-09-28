const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-2",
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

const dynamoDB = new AWS.DynamoDB();

module.exports = {
    dynamoDB
}