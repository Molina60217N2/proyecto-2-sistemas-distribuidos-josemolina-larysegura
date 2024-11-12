const Redis = require('ioredis');
const client = new Redis({
  host:'redis-16506.c14.us-east-1-3.ec2.redns.redis-cloud.com', 
  port:'16506',
  password:'GsFskOdyJBgnJR0HPBh7K2SUYIv8xbQU'});
module.exports = client;