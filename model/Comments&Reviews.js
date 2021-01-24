const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
const CommentsreviewsSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'users' },
        username:String,

        productid: {
            type: String
        },
        comment:{
            type:String
        },
        ratings:{
            type:Number
        }

    }, { timestamps: true }
);


const CommentsReviews = mongoose.model('CommentsReviews', CommentsreviewsSchema);

module.exports = { CommentsReviews }