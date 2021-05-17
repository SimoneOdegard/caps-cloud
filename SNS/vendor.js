'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const faker = require('faker');

const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-west-2:864741574106:pickup.fifo';

setInterval(async () => {
  try{
    const message = {
      Message: `{ orderID: ${faker.datatype.uuid()}, customer: ${faker.name.findName()}, vendorID: 'arn:aws:sqs:us-west-2:864741574106:1-206-flowers' }`,
      TopicArn: topic,
    };
    const response = await sns.publish(message);
      console.log(message);
  } catch (error) {
    console.error(error);
  }
}, 5000);
