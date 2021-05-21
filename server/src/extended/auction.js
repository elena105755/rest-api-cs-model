const Joi = require('joi'); //require joi for input validation
const auctions = require('./data/auctions.js');
const jwt = require('./jwt.js');

module.exports = {
    getAuctions: (req, res) => {
        res.send(auctions);
        //res.sendFile(__dirname + "/auction.html");
        //res.json(auctions);
    },

    postAuction: (req, res) => {
        const jwtAuth = jwt.verifyAuth(req, "testtesttest");

        const { error } = validateAuction(req.body); //<=>result.error, OBJECT DESTRUCTURING
        if(req.body.name === ""){
            return res
                .status(400)
                .header('Error', 'No name provided for the auction')
                .end();
        }
        else if(req.body.firstBid === "" || isNaN(req.body.firstBid)){
            return res
                .status(400)
                .header('Error', 'No starting bid provided for the auction')
                .end();
        }
        else if(req.body.name === "" && req.body.firstBid === ""){
            return res
                .status(400)
                .header('Error', 'No inputted values...')
                .end();
        }
        else if (jwtAuth === false){
            return res
                .status(401)
                .header('Error', 'You are not authorized to perform this action.')
                .end();
        }
        else {
            const auction = 
            {
                id: auctions[auctions.length -1].id + 1,
                status: 'available',
                name: req.body.name,
                firstBid: req.body.firstBid,
                sellerId: jwt.getID(req)
            };
            //console.log(sellerId);
            auctions.push(auction); //push new object in array
            return res
                .status(200)
                .send(auction); //return object in the body of the resource
        }
    },

    getAuctionById: (req, res) => {
        const auction = auctions.find(c => c.id === parseInt(req.params.id));
        if(auction === undefined || auction === "") 
            return res
                .status(404)
                .header('Error', 'The auction with the given ID does not exist.')
                .end();
        else return res
            .status(200)
            .send(auction);
    },

    updateAuction: (req, res) => {
        const jwtAuth = jwt.verifyAuth(req, "testtesttest");
        // Look up auction
        // If not existing, return 404 - Not found
        const auctionIndex = auctions.find(c => c.id === parseInt(req.params.id));
        const indexNewAuction = auctions.findIndex(newAuction => newAuction.id === parseInt(req.params.id));
        //Validate auction input
        const { error } = validateAuction(req.body); //<=>result.error, OBJECT DESTRUCTURING

        if(indexNewAuction === undefined || indexNewAuction === "") {
            return res
                .status(404)
                .header('Error', 'The auction with the given ID does not exist.')// return 404 object not found
                .end(); //exit function if no auction
        }
        else if((req.body.name === undefined || req.body.name === "") || (req.body.firstBid === undefined || req.body.firstBid === "")){
            // 400 Bad Request
            return res
                .status(400)
                .header('Error', 'One of the required fields was left empty.')
                .end();
        }
        else if(req.body.name === "" && req.body.firstBid === ""){
            // 400 Bad Request
            return res
                .status(400)
                .header('Error', 'All fields must be non-empty')
                .end();
        }
        else if (jwtAuth === false) 
            return res
                .status(401)
                .header('Error', 'You are not authorized to make this action')
                .end();
        else{
            //Update auction
            const newAuction = 
            {
                id: auctionIndex.id,
                name: req.body.name,
                status: 'available',
                firstBid: req.body.firstBid,
                sellerId: jwt.getID(req)
            };
            //Return updated auction
            auctions.splice(indexNewAuction, 1, newAuction);
            return res
                .status(200)
                .send(newAuction)
        }
    },

    deleteAuctionById: (req, res) => {
        const jwtAuth = jwt.verifyAuth(req, "testtesttest");

        //Look up auction
        //If auction does not exist, return 404 - Not found
        const auction = auctions.find(c => c.id === parseInt(req.params.id));
        if(isNaN(req.params.id)){
            return res
                .status(404)
                .header('Error', 'Please enter a number for the auction id.')// return 404 object not found
                .end();
        }
        else if(auction === undefined){
            return res
                .status(404)
                .header('Error', 'The auction with the given ID does not exist.')// return 404 object not found
                .end();
        }
        else if (jwtAuth === false){
            return res
                .status(403)
                .header('Error', 'You are not authorized to make this action')
                .end();
        }
        else if(jwt.getID(req) !== auction.sellerId){
            return res
                .status(401)
                .header('Error', 'Only the creator of this auction can delete it.')
                .end();
        }
        else{
            //Delete auction with a given index
            const indexOfAuction = auctions.indexOf(auction);
            auctions.splice(indexOfAuction, 1);

            //Return the same auction
            return res
                .status(200)
                .send(auction);
        }
    }
}

//-------------OBJECT DESTRUCTURING && ERROR HANDLING------------------

function validateAuction(auction){
    const schema = {
        name: Joi.string().min(3).required(),
        firstBid: Joi.string().required(),
        sellerId: Joi.string().required()
    };

    return Joi.validate(auction, schema);
}