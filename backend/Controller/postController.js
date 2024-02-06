import postModel from "../Models/postModel.js";
import fs from 'fs';

export const createPost = async (req, res) => {
    try {
        console.log('Request Fields:', req.fields);
        console.log('User from Fields:', req.fields.user);

        const { description, user } = req.fields;
        const { image } = req.files;

        const parsedUser = JSON.parse(user);
        console.log(parsedUser)

        if (!parsedUser || !parsedUser._id) {

            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const post = new postModel({
            description,
            user: parsedUser._id,
        });

        if (image) {
            post.image.data = fs.readFileSync(image.path);
            post.image.contentType = image.type;
        }

        await post.save();

        await post.populate('user')

        return res.status(200).send({
            success: true,
            message: "Post Created Successfully",
            post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Post not created",
            error: error.message
        });
    }
};

export const getAllPost = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const posts = await postModel.find({})
                                    .select("-image")
                                    .sort({ createdAt: -1 })
                                    .populate("user", "-password")
                                    .populate("comments.user")
                                    .skip((page - 1) * limit)
                                    .limit(parseInt(limit, 10));
        const count = posts.length;
        res.status(200).send({
            success: true,
            message: "get posts successfully",
            count,
            posts,
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "get posts failed",
            error
        });
    }
}

export const getPostByUserId = async (req, res) => {
    const { userId } = req.params
    try {
        if (!userId) {
            return res.status(404).send({
                success: false,
                message: "post not found"
            });
        }
        const posts = await postModel.find({ user: userId });

        const count = posts.length;
        res.status(200).send({
            success: true,
            message: "get posts by id successfully",
            count,
            posts,
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "get posts by id failed",
            error
        });
    }
}

export const postImageById = async(req,res)=>{
    try {
        const {postId} = req.params
        const post = await postModel.findById(postId).select("image")     
        if(post.image.data){
            res.set('Content-type',post.image.contentType)
            // res.contentType(post.image.contentType);
            return res.status(200).send(post.image.data)
        }   
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"Error in getting photo",
            error
        })
    }    
} 
