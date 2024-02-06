import mongoose from 'mongoose'
import postModel from '../Models/postModel.js'
import { io } from '../server.js'

export const commentController = async (req, res) => {

    const { userId, comment } = req.body
    const { postId } = req.params

    try {
        const post = await postModel.findById(postId)

        if (!post) {
            return res.status(404).send({
                success: false,
                message: "Post Not Found"
            })
        }

        const newComment = {
            user: userId,
            comment: comment 
        }

        post.comments.push(newComment)

        const updatedPost = await post.save()

        io.emit('newComment', {
            postId: updatedPost._id,
            comment: newComment,
        });

        return res.status(200).send({
            success: true,
            message: "Comments added Successfully",
            updatedPost
        })

    } catch (error) {
        res.status(500).send({
            error,
            success: false,
            message: "Comments not added"
        })
    }
}


export const fetchCommentsController = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).send({
                success: false,
                message: "Post Not Found"
            });
        }

        return res.status(200).send({
            success: true,
            comments: post.comments,
        });
    } catch (error) {
        res.status(500).send({
            error,
            success: false,
            message: "Error fetching comments"
        });
    }
};