import mongoose from "mongoose";
import userModel from "../Models/userModel.js";
import JWT from "jsonwebtoken";
import fs from 'fs'

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }

        const user = await userModel.findOne({ email, password })

        if (!user) {
            return res.status(404).send('user not found')
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET)
        res.status(200).send({
            success: true,
            message: "User login successfully",
            user,
            token
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in Login",
            error
        })
        console.log(error)
    }
}


export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // const {profile_pic} = req.files

        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!name) {
            return res.send({ message: "Password is Required" });
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Registered User",
            })
        }
        const user = new userModel({ ...req.body })
        // if(profile_pic){
        //     user.profile_pic.data = fs.readFileSync(profile_pic.path)
        //     user.profile_pic.contentType = profile_pic.Type
        // }
        await user.save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in registration",
            error
        })
        console.log(error)
    }
}


export const profilePictureController = async (req, res) => {
    const { profile_pic } = req.files;
    const { userId } = req.params;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        if (profile_pic) {
            // Check if user already has a profile pic
            const alreadyProfilePic = user.profile_pic !== null || user.profile_pic !== undefined || user.profile_pic;

            if (!alreadyProfilePic) {
                user.profile_pic = {
                    data: fs.readFileSync(profile_pic.path),
                    contentType: profile_pic.type,
                };
            } else {
                user.profile_pic.data = fs.readFileSync(profile_pic.path);
                user.profile_pic.contentType = profile_pic.type;
            }

            const updatedUser = await user.save();

            return res.status(200).send({
                success: true,
                message: alreadyProfilePic ? "Profile picture updated successfully" : "Profile picture added successfully",
                updatedUser
            });
        } else {
            return res.status(400).send({
                success: false,
                message: "No profile picture provided",
            });
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in profile picture update",
            error
        });
        console.log(error);
    }
};

export const searchUser = async (req, res) => {
    const searchQuery = req.query.search;

    if (!searchQuery) {
        res.send([]);
        return;
    }

    const keyword = {
        $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
        ],
    };

    try {
        const users = await userModel.find(keyword)
        res.send(users);
    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).send("Internal Server Error");
    }
};
export const updateUserInfo = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await userModel.findOneAndUpdate({ _id: userId }, req.body.payload, { new: true }).select('-profile_pic');

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const userDetails = async (req, res) => {
    const { userId } = req.params
    try {
        const user = await userModel.findById(userId)

        res.status(201).send(user)
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in User Info",
            error
        });
        console.log(error);
    }
}
