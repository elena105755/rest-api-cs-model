//Auctions array of JSON objects takes 4 parameters:
//   id = the id of the auction
//   status = the status of an auction (available/ not available)
//   name = the name of the auctioned element 
//   firstBid = the amount from which the bidding starts (seller inputs it)
//   sellerId = the id of the seller 


const auctions = [ 
    { id: 1, status:'available', name: 'Alice in Wonderland by Lewis Caroll(Hardover)', firstBid: 0.99, sellerId: 20},
    // { id: 2, status:'available', name: 'Deux Citrons by Phelippe Bernard', firstBid: 0.49, sellerId: 21},
    // { id: 3, status:'available', name: 'Pride and prejudice by Jane Austen', firstBid: 1.29, sellerId: 22},
];

module.exports = auctions;