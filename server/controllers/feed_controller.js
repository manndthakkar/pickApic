const Post = require('../models/post');
const User = require('../models/users');
const cloudinary = require("cloudinary");

// Create Post
exports.addFeed = async (req, res) => {
    try {

        const cloud = await cloudinary.v2.uploader.upload(req.body.img, {
            folder: "posts"
        });
        
        newPost = {
            title: req.body.title,
            text: req.body.text,
            author: req.user._id,
            picture: {
                public_id: cloud.public_id,
                url: cloud.secure_url
            }
        };

        
        const newFeed = await Post.create(newPost);

        const curr_user = await User.findById(req.user._id);
        curr_user.posts.unshift(newFeed._id);
        await curr_user.save();

        res.status(201).json({
            message: "Post Created"
        })

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
// Read Posts
exports.getFeed = async (req, res) => {
    try {
        const myPost = await Post.find().populate("author likes comments.author");
        res.status(200).json(myPost.reverse());
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
// Update Posts
exports.updatePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if(!post){return res.status(400).json({message: "Post Does Not Exists"})};

        if(post.author.toString() != req.user._id.toString()) {return res.status(400).json({message: "You are not authorized to update this post"})};
        const {title, caption} = req.body;

        if(!title || !caption) {return res.status(400).json({message: "Please Enter a New Caption"})};

        post.title = title;
        post.text = caption;
        post.save();
        res.status(201).json({message: "Post Updated"});

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// Delete Posts
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){return res.status(400).json({message: "Post Does Not Exists"})};
    
        if(post.author.toString() != req.user._id.toString()) {return res.status(400).json({message: "You are not authorized to delete this post"})};
        
        await cloudinary.v2.uploader.destroy(post.picture.public_id);
        // Post must be deleted from user's posts, and server:
        const user = await User.findById(req.user._id);
        const ind = user.posts.indexOf(req.params.id)
        user.posts.splice(ind, 1);
        await Post.deleteOne(post);
        user.save();
        return res.status(201).json({message: "Post Deleted"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// Likes (Complete)
exports.likeUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){return res.status(400).json({message: "Post Does Not Exists"})};
        // Get index of user in likes of post
        const ind = post.likes.indexOf(req.user._id)
        // If user in likes, and user used this route, that means user wants to unlike, hence unlike
        if(ind !== -1){ 
            post.likes.splice(ind, 1);
            await post.save();
            return res.status(201).json({message: "Post Unliked"});
        }
        // else, like 
        post.likes.unshift(req.user._id);
        post.save()
        res.status(201).json({message: "Post Liked"});

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

// Comments (Create):
exports.createComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {return res.status(400).json({message: "Post Does Not Exists"})};

        let newObj = {author: req.user._id, comments: req.body.comment}
        post.comments.push(newObj);
        await post.save();
        return res.status(200).json({message: "Comment Added"})

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

// Comments (Read):
exports.readComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {return res.status(400).json({message: "Post Does Not Exists"})};
        return res.status(200).json(post.comments)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

// Comments (Delete):
exports.deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {return res.status(400).json({message: "Post Does Not Exists"})};

        post.comments.forEach((comm, ind) => {
            if (comm._id.toString() === req.body.commID) {
                return post.comments.splice(ind, 1);
            }
        })

        await post.save();

        return res.status(201).json({message: "Comment Deleted"});


    } catch (error) {
        res.status(409).json({message: error.message})
    }
}