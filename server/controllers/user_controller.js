const Post = require('../models/post');
const User = require('../models/users');
const cloudinary = require("cloudinary");

exports.registerUser = async(req, res) => {

    try {
        // To register, need: name, email, password
        const {name, email, password, img} = req.body;

        if(!name){return res.status(400).json({message: "Enter your Name"})};
        if(!email){return res.status(400).json({message: "Enter your Email"})};
        if(!password){return res.status(400).json({message: "Enter your Password"})};

        let user = await User.findOne({email});
        if(user) {return res.status(400).json({message: "User Exists"})}
        else{
            if(img){
                const cloud = await cloudinary.v2.uploader.upload(img, {
                    folder: "users"
                });
                user = await User.create({name, email, password, profile_picture:{public_id: cloud.public_id, url: cloud.secure_url}, posts: []});
            }
            else{
                user = await User.create({name, email, password, profile_picture:{public_id: "nil", url: "nil"}, posts: []});
            }
            await user.save();
            const {token} = req.cookies;
            // res.status(200).cookie("token", token, {expires: new Date(Date.now() + 5184000000), httpOnly: true}).json({message: "User logged in", user, token})
            if(token) {
                res.cookie("token", null, {expires: new Date(Date.now() + 5184000000), httpOnly: true})
            }
            res.status(201).json({user});
        }
        // After register, user has to login 
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

exports.loginUsers = async (req, res) => {
    try {
        // Get email & passoword
        const {email, password} = req.body;
        // Get user with same email
        const user = (await User.findOne({email}).populate("posts"));
        // If email does not exist, Error
        if(!user){return res.status(400).json({message: "User Does Not Exist"})};
        //Check if password is correct
        const isUserPasswordCorrect = await user.checkPasswordCorrect(password);
        // If password is incorrect, Error
        if(!isUserPasswordCorrect){return res.status(400).json({message: "Password is Incorrect"})};
        // Email exists and passowrd is correct. Hence, return user.
        const token = await user.getToken();
        // Login expired after 2 months (60 Days)
        res.status(200).cookie("token", token, {expires: new Date(Date.now() + 5184000000), httpOnly: true}).json({message: "User logged in", user, token})

        // 2 new functions used: checkPasswordCorrect, getToken in Users (Model).

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.logoutUser = async (req, res) => {
    try {
        // Logout
        res.status(200).cookie("token", null, {expires: new Date(Date.now() + 0), httpOnly: true}).json({message: "User Logged out"})

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.updPassword = async (req, res) => {
    try {
        const {oldPass, newPass} = req.body;
        if(!oldPass) {return res.status(400).json({message: "Please Enter the Correct Old Password"})};
        if(!newPass) {return res.status(400).json({message: "Please Enter a New Password"})};
        
        const user = await User.findById(req.user._id);
        if(!user) {return res.status(400).json({message: "User Does Not Exist"})};


        const correctPassword = await user.checkPasswordCorrect(oldPass);
        if(!correctPassword) {return res.status(400).json({message: "Old Password Incorrect"})};

        user.password = newPass;
        await user.save();
        
        res.status(201).json({message: "Password Updated"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.updName = async (req, res) => {
    try {
        const {newName} = req.body;
        if(!newName) {return res.status(400).json({message: "Please Enter a New Name"})};

        const user = await User.findById(req.user._id);
        if(!user) {return res.status(400).json({message: "User Does Not Exist"})};

        user.name = newName;
        user.save();
        res.status(201).json({message: "Name Updated"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.updEmail = async (req, res) => {
    try {
        const {newEmail} = req.body;
        if(!newEmail) {return res.status(400).json({message: "Please Enter a New Email"})};

        const user = await User.findById(req.user._id);
        if(!user) {return res.status(400).json({message: "User Does Not Exist"})};

        user.email = newEmail;
        user.save();
        res.status(201).json({message: "Email Updated"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const allPost = await Post.find();
        for(let i = 0; i<allPost.length; i++){
            const post = await Post.findById(allPost[i]._id);
            for (let j = 0; j < post.comments.length; j++) {
                if(post.comments[j].author._id.toString() === user._id.toString()){
                    post.comments.splice(j, 1)
                    j-=1;
                }
            }
            for (let j = 0; j < post.likes.length; j++) {
                if(post.likes[j]._id .toString() === user._id.toString()){
                    post.likes.splice(j, 1)
                    j-=1;
                }
            }
            await post.save();
        }
        await cloudinary.v2.uploader.destroy(user.profile_picture.public_id) 

        for(let ind = 0; ind<user.posts.length; ind++){
            const removePost = await Post.findById(user.posts[ind]);
            await cloudinary.v2.uploader.destroy(removePost.picture.public_id); 
            await removePost.remove();
        }
        await user.remove();
        res.status(200).cookie("token", null, {expires: new Date(Date.now() + 0), httpOnly: true}).json({message: "User Deleted"})

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getUsers = async (req, res) => {
    try {
        const user = await User.find({name: { $regex: req.query.name, $options: "i" }});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getGivenUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getMyPosts = async (req, res) => {
    try {
        const user = await (await User.findById(req.user._id));

        const myPosts = [];
        for(let i = 0; i<user.posts.length; i++){
            const post = await Post.findById(user.posts[i]).populate("likes comments.author author");
            myPosts.push(post)
        }

        res.status(200).json(myPosts);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.getGivenUserPosts = async (req, res) => {
    try {
        const user = await (await User.findById(req.params.id));

        const myPosts = [];
        for(let i = 0; i<user.posts.length; i++){
            const post = await Post.findById(user.posts[i]).populate("likes comments.author author");
            myPosts.push(post)
        }

        res.status(200).json(myPosts);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
 
exports.updImage = async (req, res) => {
    try {
        const user = await (await User.findById(req.user._id));

        await cloudinary.v2.uploader.destroy(user.profile_picture.public_id);

        const { img } = req.body;

        if(img){
            const cloud = await cloudinary.v2.uploader.upload(img, {
                folder: "users"
            });
            user.profile_picture.public_id = cloud.public_id;
            user.profile_picture.url = cloud.secure_url;
        }
        else{
            user.profile_picture.public_id = nil;
            user.profile_picture.url = nil;
        }

        await user.save();

        res.status(201).json({message: "Profile Picture Updated"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
 