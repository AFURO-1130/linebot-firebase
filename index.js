'use strict';

const functions = require('firebase-functions');
const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelSecret: 'b50104921c1035eefad7725c020fc4ce',
    channelAccessToken: 'QMIxrgTAf1Mr1JUopAYmtGkpoZQ0CzU8l37HKKJVYFhKoVhgJxlxqioiioTbQOuSQBncyxVYgK20MweMlUX8Oryp6AkMQwiPYaPi9XBcvKakMvqug8b6teZb//uHd1xOmE3I0TogZ8PdO9E4+oQrqgdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

exports.app = functions.https.onRequest(app);

