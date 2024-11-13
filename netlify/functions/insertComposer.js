"use strict";

const redis = require('./redisdb');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    redis.on("connect", function() {
      console.log("You are now connected");
    });

    const data = JSON.parse(event.body);

    // Guarda el registro con la clave en formato 'movie:id'
    await redis.set(`composer:${data.id}`, event.body);
    await redis.incr('composer_N'); // Incrementa el contador de películas

    return { statusCode: 200, headers, body: 'OK' };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
