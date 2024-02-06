import mongoose from 'mongoose';
import postModel from '../Models/postModel.js';
import { io } from '../server.js'

export const likesController = async (req, res) => {
    const { userId } = req.body;
    const { postId } = req.params;

    try {
        // Check if the user has already liked the post
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const alreadyLiked = post.likedBy.includes(userId);

        // If the user has already liked the post, remove the like (dislike)
        if (alreadyLiked) {
            const updatedPost = await postModel.findByIdAndUpdate(
                postId,
                { $inc: { likes: -1 }, $pull: { likedBy: userId } }, // Decrement likes by 1 and remove user from likedBy array
                { new: true }
            );

            io.emit('Likes', {
                postId: updatedPost._id,
                likes: updatedPost.likes,
            });

            return res.status(200).send({
                success: true,
                message: "Dislike Successful",
                updatedPost
            });
        } else {
            // If the user has not liked the post, add the like
            const updatedPost = await postModel.findByIdAndUpdate(
                postId,
                { $inc: { likes: 1 }, $push: { likedBy: userId } }, // Increment likes by 1 and add user to likedBy array
                { new: true }
            );

            io.emit('Likes', {
                postId: updatedPost._id,
                likes: updatedPost.likes,
            });

            return res.status(200).send({
                success: true,
                message: "Like Successful",
                updatedPost
            });
        }
    } catch (error) {
        return res.status(500).send({
            error,
            success: false,
            message: "Likes Not Updated",
        });
    }
};

export const likedUser = async(req,res)=>{
    const {postId} = req.params
    const {userId} = req.body
    let liked = true
    const result = await postModel.findById(postId)

    const alreadyLiked = result.likedBy.includes(userId)

    if(alreadyLiked){
        res.status(201).send(liked)
    }
    else{
        liked = false
        res.status(201).send(liked)
    }
} 