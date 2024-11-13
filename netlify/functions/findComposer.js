"use strict"

const redis = require('./redisdb');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
    const id = event.path.split("/").reverse()[0];
    
    redis.on("connect", function() {
      console.log("You are now connected");
    });

   const composer = await redis.get(`composer:${id}`);
   let composers = [];
   composers.push(composer);
   composers.forEach(toJson);

    return { statusCode: 200, headers, body: JSON.stringify(composers)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};