const Joi = require('joi'); //require joi for input validation

const jwt = require('./jwt.js');

//Require local data - existing bids, auctions and users
const bids = require('./data/bids.js');
const auctions = require('./data/auctions.js');
const userRegistrations = require('./data/userReg.js');

module.exports = {
    postBidOnAuction: (req, res) => {
        const jwtAuth = jwt.verifyAuth(req, "testtesttest");
        
        const { error } = validateBid(req.body); //<=>result.error, OBJECT DESTRUCTURING
        const auction = auctions.find(c => c.id === parseInt(req.params.auctionId));
        const userRegistration = userRegistrations.find(c => c.id === parseInt(req.params.auctionId));
        //const indexNewAuction = auctions.findIndex(auction => auction.id === parseInt(req.params.id));
        const maxBidInAuction = bids.find(b => b.auctionId === parseInt(req.params.auctionId));
        const indexOfAuction = auctions.indexOf(auction);

        if((req.body.bidAmount == "") || (!req.body.bidAmount) || (isNaN(req.body.bidAmount))){
            // 400 Bad Request
            return res
                .status(400)
                .header('Error', 'Invalid data supplied')
                .end();
        }  
        else if((!auction.id) || (auction.id == "") || (isNaN(auction.id))){
            return res
                .status(404)
                .header('Error', 'Auction with the given ID does not exist.')
                .end(); 
        } 
        else if(req.body.bidAmount === "" && auction.id === ""){
            // 400 Bad Request
            return res
                .status(400)
                .header('Error', 'Invalid data supplied')
                .end();
        }
        else if (jwtAuth === false){
            return res
                .status(401)
                .header('Error', 'You are not authorized to perform this action.')
                .end();
        }
        else if(jwt.getID(req) === auction.sellerId){
            return res
                .status(401)
                .header('Error', 'You are not allowed to bid in your own auction.')
                .end();
        }
        else if(req.body.bidAmount < auction.firstBid || req.body.bidAmount < maxBidInAuction){
            return res
                .status(401)
                .header('Error', 'New bid needs to be greater than current bid and greater than starting bid.')
                .end();
        }
        else{
            const bid = {
                id: bids.length + 1,
                auctionId: auction.id,
                bidAmount: req.body.bidAmount,
                bidderId: jwt.getID(req)
            };
    
            bids.push(bid); //push new object in array
            return res
                .status(200)
                .send(bid); //return object in the body of the resource 
        }
    },

    getAllBids: (req,res) => {
        const aId = auctions.find(c => c.id === parseInt(req.params.auctionId));
        const bidsInAuction = bids.filter(b => b.auctionId === parseInt(req.params.auctionId));
        
        if(!aId || aId == undefined){
            return res
                .status(400)
                .header('Error', 'Auction does not exist.')
                .end();
        }
        else {
            return res
                .status(200)
                .send(bidsInAuction);
        }
    }
}

//-------------OBJECT DESTRUCTURING && ERROR HANDLING------------------

function validateBid(bid){
    const schema = {
        bidAmount: Joi.string().required(),
        bidderId: Joi.string().required()
    };

    return Joi.validate(bid, schema);
}