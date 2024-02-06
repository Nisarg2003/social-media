import React from "react";
import { Avatar } from "@nextui-org/react";
import comment from "../../images/comment.svg";
import { useNavigate } from "react-router-dom";

const LikeAndDescriptionSection = ({
  liked,
  likes,
  isRequesting,
  renderImage,
  handleLike,
  handleCommentClick,
  post,
}) => {

  const navigate = useNavigate()
  const getUserProfile = (userId) => {
      navigate(`/profile/${userId}`);
    };
  
    return (
    <div className="flex flex-col justify-between h-[100%]">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="" onClick={() => getUserProfile(post?.user?._id) }>
            <Avatar
              isBordered
              radius="full"
              className="lg:w-10 w-8 lg:h-10 h-8 rounded-full mr-2"
              color="success"
              src={renderImage(
                post?.user?.profile_pic?.data,
                post?.user?.profile_pic?.contentType
              )}
            />
          </div>
          <div >
              <p  className="font-bold">{post?.user?.name}</p>
          </div>
        </div>
        <div className="mb-4">
          <p>{post?.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t-1 border-[#262626]">
        <div className="flex gap-2">
          <button
            className={`flex items-center ${
              liked ? "text-red-500" : "text-white"
            } ${isRequesting ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleLike}
            disabled={isRequesting}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={liked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-6 h-6 mr-1 ${
                liked ? "text-red-500" : "text-white"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 21.35l-1.45-1.32C5.4 14.36 2 11.47 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C14.09 3.81 15.76 3 17.5 3 20.58 3 23 5.42 23 8.5c0 2.97-3.4 5.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
          <img
            onClick={handleCommentClick}
            className="w-6"
            src={comment}
            alt=""
          />
        </div>
        <p className="text-white">{likes} likes</p>
      </div>
    </div>
  );
};

export default LikeAndDescriptionSection;