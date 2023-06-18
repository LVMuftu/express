const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const priceSCH = new Schema({
    url:{
        type:String,
        require:true
    },
    shdw:{
        type:String,
        require:true
    },
    unix:{
        type:Number,
        require:true
    }

},{timestamps:true});
const link = mongoose.model("links_test3",priceSCH);
module.exports = link ;