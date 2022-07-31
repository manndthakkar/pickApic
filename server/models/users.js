const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password : {
        type: String,
        required: true,
    },
    profile_picture: {
        public_id: String,
        url: String
    },
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "post"}],
})  


// To hash the password before saving
userSchema.pre("save", async function(next) {
    if(this.isModified("password")) { this.password = await bcrypt.hash(this.password, 10); }
})

userSchema.methods.checkPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.getToken = async function(){
    return jsonwebtoken.sign({_id: this._id}, process.env.JWT_SEC)
}


const user = mongoose.model('user', userSchema);
module.exports = user;