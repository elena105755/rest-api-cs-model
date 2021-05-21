//Bids array of JSON objects takes 4 parameters:
//   id = the id of the bid
//   auctionId = the id of the auction the bidder is placing a bid on
//   bidAmount = the amount the bidder wants to bid
//   bidderId = the id of the bidder 

const bids = [
    // { id: 1, auctionId: 1, bidAmount: 0.99, bidderId: 1},
    // { id: 2, auctionId: 2, bidAmount: 0.49, bidderId: 2},
    // { id: 3, auctionId: 3, bidAmount: 1.29, bidderId: 3}
];

// bids.sort(function(a, b) {
//     return parseFloat(a.bidAmount) - parseFloat(b.bidAmount);
// });

// let highestBid = bids[bids.length - 1].bidAmount;

// console.log(highestBid);


module.exports = bids;
