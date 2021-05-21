const redis = require('redis');
const express = require('express');
const request = require('request');

const REDISPORT = 6379;
const port = process.env.PORT || 8080;

const redisClient = redis.createClient(REDISPORT, "redis");

let serverHosts = [];
let current = 1;


// xxxxxxxxxxxxxxxxxx REDIS xxxxxxxxxxxxxxxxxxxx

//retrieve all elements in the list(order not preserved & doesn't accept duplicates)
//passing -1 as 3rd argument -> get all elements
redisClient.lrange('Server', 0, -1, function (err, res){ 
  if(err){
      console.log(err);
      throw err;
  }
  else{
    //temp = res.split(":")[1];
    serverHosts = res.slice();
    console.log('LRANGE result -> ' + serverHosts);
    
  }
});

//Check if key already exists on REDIS
redisClient.exists('Server', function (err, res) {
  if(res === 1){
    console.log('Key (Server) exists');
  }
  else{
    console.log('Key not found');
    console.log(err);
    throw err;
  }
});

//Delete/expire keys on REDIS
// redisClient.del('key', function(err, res){
//   console.log(res);
// });

//Expire key after timeout
// redisClient.expire('keyx', 30);


const handler = (req, res) => {
  const whichServer = 
    request({ url: `http://${serverHosts[current]}` + req.url })
    .on('error', error => {res.status(500).send(error.message);});
  req.pipe(whichServer).pipe(res);

  console.log(`server ${serverHosts[current]}`);
  console.log(`This is ${serverHosts[current]}!`);
  current = (current + 1) % serverHosts.length;
};

const server = express()
  .get('*', handler)
  .post('*', handler)
  .delete('*', handler);

server.listen(port, function () {
    console.log(`Listening on port ${port}`);
  });