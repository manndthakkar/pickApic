const { registerUser, getUsers, loginUsers, logoutUser, updPassword, updName, updEmail, deleteUser, getMyProfile, getGivenUserProfile, getMyPosts, updImage, getGivenUserPosts } = require('../controllers/user_controller');
const { auth } = require('../middlewares/authentication');

const router = require('express').Router();

// Create: 
router.post('/register', registerUser)
router.post('/login', loginUsers)

// Read: 
router.get('/', getUsers)
router.get('/myprofile', auth, getMyProfile)
router.get('/profile/:id', getGivenUserProfile)
router.get('/myprofile/posts', auth, getMyPosts)
router.get('/posts/:id', getGivenUserPosts)

// Update: 
router.put('/upd/password', auth, updPassword)
router.put('/upd/name', auth, updName)
router.put('/upd/email', auth, updEmail)
router.put('/upd/img', auth, updImage)

// Delete: 
router.get('/logout', auth, logoutUser)
router.delete('/delete/user', auth, deleteUser)

module.exports = router;