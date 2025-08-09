import express from 'express';
import multer from 'multer';
import {
  registerUser,
  loginUser,
  logoutUser,
  myProfile,
  userProfile,
  followAndUnfollowUser,
  updateUserProfile,
  changePassword,
  deleteUserAccount,
  getFollowersAndFollowing,
  getUserPosts,
  getUserCollections,
  updateDisplayPicture,
} from '../controllers/userController.js';
import isAuth from '../middlewares/isAuth.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// User registration
router.post('/register', registerUser);

// User login
router.post('/login',loginUser);

// User logout
router.get('/logout', isAuth, logoutUser);

// Change password
router.put('/changePassword', isAuth, changePassword);


// Delete account
router.delete('/deleteAccount', isAuth, deleteUserAccount);


// Get logged-in user's profile
router.get('/myProfile', isAuth, myProfile);

// Get another user's profile by ID
router.get('/:id', isAuth, userProfile);

// Follow or unfollow a user by ID
router.post('/follow/:id', isAuth, followAndUnfollowUser);

// Update user profile
router.put('/updateProfile', isAuth, upload.single('profilePicture'), updateUserProfile);


// Get followers and following
router.get('/followersAndFollowing/:id', isAuth, getFollowersAndFollowing);

// Get user's posts
router.get('/posts/:id', isAuth, getUserPosts);

// Get user's collections
router.get('/collections/:id', isAuth, getUserCollections);

// Upload profile picture
router.put('/updateDisplayPicture', isAuth, updateDisplayPicture);  // not working **********************************



export default router;
