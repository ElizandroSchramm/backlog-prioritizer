const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getItems = async () => {
    const params = {
        TableName: process.env.BACKLOG_TABLE,
    };

    try {
        const result = await dynamoDb.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                items: result.Items,
            }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Could not fetch items',
            }),
        };
    }
};
