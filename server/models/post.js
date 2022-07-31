const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: String,
    text: String,
    picture: {
        public_id: String,
        url: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    comments: [{author: {type: mongoose.Schema.Types.ObjectId, ref: "user"}, comments: {type: String, required: true} }],
    tags: [{author: {type: mongoose.Schema.Types.ObjectId}}], 
    dateOfCreation: {type: Date, default: new Date()}
})  

const post = mongoose.model('post', postSchema);
module.exports = post;