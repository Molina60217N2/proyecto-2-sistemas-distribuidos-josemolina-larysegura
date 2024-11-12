
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
   let n = await redis.get('album_N');
//    console.log(n)

   for(let i = 1; i<=n; i++)
     keys.push(`album:${i}`);

   const albums = await redis.mget(...keys); 
 
   albums.forEach(toJson);

    return { statusCode: 200, headers, body: JSON.stringify(albums)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};