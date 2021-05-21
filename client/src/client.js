const Joi = require('joi');
const express = require('express');
const client = express();

client.use(express.json()); //add and use middleware in request processing pipeline
client.use(express.urlencoded({extended: true}));
//client.use(express.static(__dirname + "/" + "page"));

client.get('/', (req, res) => {
    console.log('To log in, navigate to ../api/user/login');
    res.status(200).send('To log in, navigate to ../api/user/login');
});

client.get('/api/user', (req, res) => {
   
    //res.send('To log in, navigate to ../api/user/login');
    //res.sendFile(__dirname + "/server.html");
    res.sendFile(__dirname + "/userRegistry.html");
    //return res.redirect('/api/user/login');
});

client.get('/api/user/login', (req, res) => {
    res.sendFile(__dirname + "/userAuthentication.html");
});

function validateRegistration(auction)
{
    const schema = {
        name: Joi.string().min(3).required(),
        firstBid: Joi.string().required(),
        sellerId: Joi.string().required()
    };

    return Joi.validate(auction, schema);
}

const port = process.env.PORT || 8080;
client.listen(port, () => console.log(`Listening on port ${port}`));
//return res.redirect('/path');