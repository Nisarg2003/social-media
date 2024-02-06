import express from "express"
import formidable from "express-formidable";
import { commentController, fetchCommentsController } from "../Controller/commentsController.js"
import { likedUser, likesController } from "../Controller/likesController.js"
import { createPost, getAllPost, getPostByUserId, postImageById } from "../Controller/postController.js"
import { profilePictureController } from "../Controller/userController.js"


const router = express.Router();

// Post Routes

router.post('/createPost', formidable(), createPost)


// Post Likes Route

router.post('/like-post/:postId', likesController)

router.post('/comment-post/:postId', commentController)

router.get('/all-posts', getAllPost)

router.get('/post-by-userId/:userId', getPostByUserId)

router.post('/profile-pic/:userId', formidable(), profilePictureController)

router.post('/check-likes/:postId',likedUser)

router.get('/images/:postId',postImageById)

router.get('/fetch-all-comments/:postId',fetchCommentsController)

export default router