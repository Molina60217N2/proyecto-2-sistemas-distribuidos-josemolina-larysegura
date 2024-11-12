
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
    
    redis.on("connect", function() {
      console.log("You are now connected");
    });
   
   let keys = [];
   let n = await redis.get('composer_N');
   console.log(n)

   for(let i = 1; i<=n; i++){
     keys.push(`composer:${i}`);
      console.log(`composer:${i}`);
   }

   const composers = await redis.mget(...keys); 
 
   composers.forEach(toJson);

//    console.log(composers);

    return { statusCode: 200, headers, body: JSON.stringify(composers)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};