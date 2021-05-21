const express = require('express'),
     server = express(),
     jwt = require('./extended/jwt.js'),
     decoder = jwt.decoder,
     const os = require('os');

const port = process.env.PORT || 8080,
     REDISPORT = 6379;
//const bcrypt = require("bcrypt");

// redis.createClient() uses 127.0.0.1 and port 6379 by default
const redis = require('redis');
const redisClient = redis.createClient(REDISPORT, "redis");
var fs = require('fs');

const bid = require('./extended/bid.js'),
     user = require('./extended/user.js'),
     auction = require('./extended/auction.js');

server.use(express.json()); //add and use middleware in request processing pipeline
server.use(express.urlencoded({extended: true}));

server.get('/', (req, res) => {res.send('SCC311 Coursework');});

server.get('/api/auctions', /*decoder,*/ auction.getAuctions);
server.post('/api/auction', /*decoder,*/ auction.postAuction);
server.get('/api/auction/:id', /*decoder,*/ auction.getAuctionById);
server.post('/api/auction/:id', /*decoder,*/ auction.updateAuction);
server.delete('/api/auction/:id', /*decoder,*/ auction.deleteAuctionById);

server.post('/api/user/login', /*decoder,*/ user.postUserLogin);
server.post('/api/user', /*decoder,*/ user.postUserRegistration);

server.post('/api/auction/:auctionId/bid', /*decoder,*/ bid.postBidOnAuction);
server.get('/api/auction/:auctionId/bids', /*decoder,*/ bid.getAllBids);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~:@PORT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//listen to the connect event to see if connection was successful to the redis-server
redisClient.on('connect', function(){
    console.log('Client connected to REDIS')
});

//listen to error event to detect malfunctional connection to redis
redisClient.on('error', function(err){
    console.log('Something went wrong :( ' + err);
});

// ~~~~~~~~~STORING~~~~~~~~~~~~~LISTS~~~~~~~~~~~~~~REDIS~~~~~~~~~~~~~~


//set the {key, value} pairs in Redis to the name(port) and location of the service providers
//create key and assigne to it it's respective value
//if successful, prints "Reply: OK" to console saying that redis successfully saved the value assigned to the key
redisClient.rpush('Server', os.hostname(), function(err, res){
    if(err){
        console.log(err);
        throw err;
    }
    console.log('RPUSH result -> ' + res);
}); 

server.listen(port, () => console.log(`Listening on port ${port}`));
server.listen()

//PUG
//server.set('view engine', 'pug'); // Tells express to use pug as template engine.
//res.render('index'); // tell express to render the Pug index template
