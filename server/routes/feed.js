const router = require('express').Router();
const { getFeed, addFeed, likeUnlikePost, deletePost, createComment, readComment, deleteComment, updatePost } = require('../controllers/feed_controller');
const { auth } = require('../middlewares/authentication');


// We want only authenticated users to add Feed. Hence we add a handler:
// If you do auth, you always have req.user._id (id of user, currently using)

// CRUD - Post
router.post('/upload', auth ,addFeed);
router.get('/', getFeed);
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)

// Likes
router.get('/:id', auth, likeUnlikePost)

// Comments
router.post('/post/comments/:id', auth, createComment)
router.get('/post/comments/:id', auth, readComment)
router.delete('/post/comments/:id', auth, deleteComment)

module.exports = router;