

var express = require("express");
var request = require("request");
var app = express();
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");
var btce = require("btc-e");


app.use(bodyparser.urlencoded({

    extended: true
}));

app.use(bodyparser.json());

app.set("view engine" ,"ejs");

//yahan call back function bnaya ha
function brainwallet(uinput, callback) {
    var input = new Buffer(uinput);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var addy = new bitcore.PrivateKey(bn).toAddress();
    callback(pk, addy);
};


request({
url:" https://btc-e.com/api/3/ticker/btc_usd",
json :true

},function(err,res,body){
    price=body.btc_usd;

});

app.get("/", function (req, res) {
    // res.sendFile(__dirname + "/index.html");
    res.render("index" ,{
     lastprice:price

});
});

app.post("/wallet", function (req, res) {
    var brainsrc = req.body.brainsrc;
    console.log(brainsrc);
    brainwallet(brainsrc, function (priv, addr) {


        res.send("The Brain Wallet of " + brainsrc + " <br/> Address:  " + addr + " <br/> private key : " + priv);

    });

});
//    var input=new Buffer(brainsrc);
//    var hash= bitcore.crypto.Hash.sha256(input);
//    var bn = bitcore.crypto.BN.fromBuffer(hash);
//    var pk=new bitcore.PrivateKey(bn).toWIF();
//    var addy=new bitcore.PrivateKey(bn).toAddress();



app.listen(80, function () {

    console.log("go");

});






    // request({
//             url:"https://blockchain.info/stats?format=json",
//             json :true

// },function (error,response,body){
//     btcprice=body.market_price_usd;
//     btcblocks=body.n_blocks_total;


// });

// app.get("/block",function(req,res){
//     // res.send("block of raycoin "  + btcblocks);
//     res.sendfile("index.html");

//     });

