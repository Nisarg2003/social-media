// PostCard.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Comment from "./Comment";
import io from "socket.io-client";
import LikeAndDescriptionSection from "./LikeAndDescriptionSection";

const PostCard = ({ post, index, renderImage, toggleImageStyle }) => {
  const userId = JSON.parse(localStorage.getItem("user"));
  const [isRequesting, setIsRequesting] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const [liked, setLiked] = useState();
  const [likes, setLikes] = useState(post.likes);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8080");

    socketRef.current.on("Likes", (data) => {
      if (data.postId === post._id) {
        setLikes(data.likes);
      }
    });
  }, [userId?._id, post?._id, post._id]);

  useEffect(() => {
    const Likescheck = async () => {
      const res = await axios.post(
        `https://social-media-app-5eap.onrender.com/api/v1/post/check-likes/${post?._id}`,
        {
          userId: userId?._id,
        }
      );

      if (res) {
        if (res.data === true) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      } else {
        console.log("Error in checking the likes");
      }
    };

    Likescheck();
  }, [post?._id, userId?._id]);

  const handleCommentClick = () => setIsCommentClicked(!isCommentClicked);

  const handleLike = async () => {
    try {
      if (isRequesting) return;

      setIsRequesting(true);

      socketRef.current = io("http://localhost:8080");

      socketRef.current.on("Likes", (data) => {
        if (data.postId === post._id) {
          setLikes(data.likes);
        }
      });

      const res = await axios.post(
        `https://social-media-app-5eap.onrender.com/api/v1/post/like-post/${post?._id}`,
        {
          userId: userId?._id,
        }
      );

      if (res.data.success) {
        setLiked(!liked);
        socketRef.current.disconnect();
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Network error:", error.message);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="text-white post-card bg-[#0a0a0a] border border-[#262626] shadow-md w-[95%] lg:w-[80%] xl:w-[70%] flex flex-col lg:flex-row overflow-hidden rounded-lg">
      <div className="w-full h-[400px] border-b-1 border-b-[#262626] lg:border-r-1 lg:border-r-[#262626]">
        <img
          src={`https://social-media-app-5eap.onrender.com/api/v1/post/images/${post._id}`}
          alt="Instagram Post"
          className={`w-full h-full bg-[#0a0a0a] ${post?.imageStyle}`}
          onClick={() => toggleImageStyle(index)}
          loading="lazy"
        />
      </div>
      <div className="lg:w-[80%] w-[100%] flex flex-col justify-between">
        {isCommentClicked ? (
          <Comment
            handleBackClick={handleCommentClick}
            postId={post._id}
            userId={userId._id}
            userName={userId?.name}
            postComments={post?.comments}
          />
        ) : (
          <LikeAndDescriptionSection
            renderImage={renderImage}
            liked={liked}
            isRequesting={isRequesting}
            handleLike={handleLike}
            handleCommentClick={handleCommentClick}
            post={post}
            likes={likes}
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;