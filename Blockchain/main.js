const SHA256 = require('crypto-js/sha256');
// start class Block
class Block {
    constructor(index, timetap, data, previousHash = '') {
        this.index = index;
        this.timetap = timetap;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce=0;
    }

    calculateHash() {

        return SHA256(this.index + this.previousHash + this.timetap + JSON.stringify(this.data)+this.nonce).toString();

    }
        //yahan mining ka concept ha or we say mining block

        minerBlock(difficulty){
            while(this.hash.substring(0,difficulty)  !==Array(difficulty+1).join("0")){
                this.nonce++;
                this.hash=this.calculateHash();
        
        }

        console.log("BLOCKED MINED:"+this.hash);
    }

}
//end class block


//class blockchain

class blockchain {
    constructor() {
        this.chain = [this.createpwsblock()];
        this.difficulty=4;
    }

    createpwsblock() {
        return new Block(0, "21/02/2018", "pws block", "0");
    }
    getlatestblock() {
        return this.chain[this.chain.length - 1];

    }

    addblock(newBlock) {
        newBlock.previousHash = this.getlatestblock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.minerBlock(this.difficulty);
        this.chain.push(newBlock);
    }


    ischainvalid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentblock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            //if the hash of the block is valid 
            if (currentblock.hash !== currentblock.calculateHash()) {
                return false;
            }
            if (currentblock.previousHash !== currentblock.previousHash) {
                return false;
            }

        }
        return true;


    }
}

//for testing 

 let savjecoin = new blockchain();



console.log('*******Block chain is valid******* '+savjecoin.ischainvalid());



console.log("mining block 1 ");
savjecoin.addblock(new Block(1, "21/4/2018", { amount: 4 }));
console.log("mining block 2 ");
savjecoin.addblock(new Block(2, "21/4/2018", { amount: 8 }));
console.log("mining block 3 ");
savjecoin.addblock(new Block(3, "21/4/2018", { amount: 10 }));
console.log("mining block 4 ");
savjecoin.addblock(new Block(2, "21/4/2018", { amount: 7 }));
console.log("mining block 5 ");
savjecoin.addblock(new Block(3, "21/4/2018", { amount: 6 }));

console.log("mining block 6 ");
savjecoin.addblock(new Block(2, "21/4/2018", { amount: 7 }));
console.log("mining block 7 ");
savjecoin.addblock(new Block(3, "21/4/2018", { amount: 6 }));


console.log("mining block 8 ");
savjecoin.addblock(new Block(2, "21/4/2018", { amount: 7 }));
console.log("mining block 9 ");
savjecoin.addblock(new Block(3, "21/4/2018", { amount: 6 }));

console.log("mining block 10 ");
savjecoin.addblock(new Block(2, "21/4/2018", { amount: 7 }));
console.log("mining block 11 ");
savjecoin.addblock(new Block(3, "21/4/2018", { amount: 6 }));
console.log("mining block 12 ");
savjecoin.addblock(new Block(2, "21/4/2018", { amount: 7 }));
console.log("mining block 13 ");
savjecoin.addblock(new Block(3, "21/4/2018", { amount: 6 }));


// yahan check kya ha e block chain valid hai ya nahe
console.log(JSON.stringify(savjecoin, null, 4));


