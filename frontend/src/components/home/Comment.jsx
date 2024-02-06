import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Avatar } from "@nextui-org/react";

const Comment = ({ handleBackClick, postId, userId }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("https://social-media-app-5eap.onrender.com");

    fetchComments();
    
    socketRef.current.on("newComment",  (data) => {
      if (data.postId === postId) {
        setComments((prevComments) => [...prevComments, data.comment]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [postId]);


  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };


  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        
        await axios.post(
          `https://social-media-app-5eap.onrender.com/api/v1/post/comment-post/${postId}`,
          {
            comment: newComment,
            userId: userId,
          }
        );
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://social-media-app-5eap.onrender.com/api/v1/post/fetch-all-comments/${postId}`);
      const commentData = response.data.comments;
  
      const commentsWithUsers = await Promise.all(commentData.map(async (comment) => {
        if (comment.user) {
          try {
            const userResponse = await axios.get(`https://social-media-app-5eap.onrender.com/api/v1/user/${comment.user}`);
            const user = userResponse.data?.name;  
            return {
              ...comment,
              userName: user,
            };
          } catch (userError) {
            console.error("Error fetching user details:", userError);
            return {
              ...comment,
              userName: "Unknown User",
            };
          }
        } else {
          return {
            ...comment,
            userName: "Unknown User",
          };
        }
      }));
  
      setComments(commentsWithUsers);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  

  return (
    <div className=" border-gray-300 rounded-md shadow-md h-[100%] flex flex-col justify-between p-3">
      <div className="flex flex-col gap-2">
        <button
          className="w-8 h-8 rounded-full focus:outline-none focus:ring focus:border-gray-300"
          onClick={handleBackClick}
        >
          {"<-"}
        </button>
        <div className="overflow-y-auto lg:max-h-72 max-h-40 flex flex-col gap-2">
          {comments.map((comment, index) => (
            <div key={index} className="pl-5 flex gap-2 w-[100%]">
              <Avatar 
              className="mt-1 w-8 h-8 "></Avatar>
              
              <div className="flex flex-col w-[80%]">
                <span className="font-bold">{ comment.userName}</span>
                <p className="">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleCommentChange}
          className="flex-1 px-3 py-2 focus:outline-none bg-inherit border-b-1"
        />
        <button
          onClick={handleAddComment}
          className="text-white px-6 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Comment;