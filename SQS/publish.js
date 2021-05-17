'use strict';
const uuid = require('uuid').v4;
const { Producer } = require('sqs-producer');

const topic = 'arn:aws:sns:us-west-2:864741574106:pickup.fifo';

const producer = Producer.create({
  queueUrl: `https://sqs.us-west-2.amazonaws.com/864741574106/1-206-flowers`,
  region: `us-west-2`,
});


let counter = 0;

setInterval(async () => {

  try {
    const message = {
      id: uuid(),
      body: `This is message #${counter++}`,
      TopicArn: topic,
    };

    // this produces a new "item" (which is the message above)
    // and sends it to our sqs queue
    const response = await producer.send(message);
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}, Math.floor(Math.random() * 1000));
