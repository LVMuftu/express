const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const priceSCH = new Schema({
    name:{
        type:String,
        require:true
    },
    code:{
        type:String,
        require:true
    },
    stock:{
        type:String,
        require:true
    },
    priceA:{
        type:String,
        require:true
    },
    priceB:{
        type:String,
        require:true
    },

},{timestamps:true});
const price = mongoose.model("test_price1",priceSCH);
module.exports = price ;