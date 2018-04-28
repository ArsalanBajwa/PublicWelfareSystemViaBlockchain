var request = require("request");

function getprice(x){

    
request({

    url :"https://blockchain.info/stats?format=json",
    json :true
    
    },function(err,res,body){
    
    var price=body.market_price_usd;
    var blocks=body.n_blocks_total;
    x(price,blocks);
    
    });
};


function  hello(){
console.log("Hello there");
};
getprice(function(icecream,blocks){
console.log(icecream);
console.log(blocks);
hello();
});



