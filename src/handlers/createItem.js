const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createItem = async (event) => {
  const body = JSON.parse(event.body);
  const params = {
    TableName: process.env.BACKLOG_TABLE,
    Item: {
      id: body.id,
      title: body.title,
      description: body.description,
      criteria: body.criteria, // MoSCoW, RICE, etc.
      score: body.score,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item created successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create item' }),
    };
  }
};
