"use strict"

const redis = require('./redisdb');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {

    const id = event.path.split("/").reverse()[0];

    redis.on("connect", function() {
      console.log("You are now connected");
    });

   await redis.set(`album:${id}`,event.body);
   return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
