import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import Card from "./PostCard";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [initialLoadCount, setInitialLoadCount] = useState(3);
  const lastPostRef = useRef();



  const getTheData = async () => {
    try {
      const postData = await axios.get(
        `https://social-media-app-5eap.onrender.com/api/v1/post/all-posts/?page=${currentPage}&limit=${initialLoadCount}`
      );
  
      if (currentPage === 1) {
        
        setData(
          postData.data.posts.map((post) => ({
            ...post,
            imageStyle: "object-cover",
          }))
        );
      } else {
        setData((prevData) => [
          ...prevData,
          ...postData.data.posts.map((post) => ({
            ...post,
            imageStyle: "object-cover",
          })),
        ]);
      }
      setHasMorePosts(postData.data.posts.length === initialLoadCount);
    } catch (error) {
      console.error(error);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleLoadMore = () => {
    if (!loading && hasMorePosts) {
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 70 &&
        !loading &&
        hasMorePosts
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMorePosts]);


  useEffect(() => {
  getTheData();
}, [currentPage, initialLoadCount]);

const renderImage = useMemo(
  () => (imageData, contentType) => {
    if (imageData && imageData.data) {
      const flattenedData = [].concat(imageData.data);
      const imageBlob = new Blob([new Uint8Array(flattenedData)], {
        type: contentType,
      });
      return URL.createObjectURL(imageBlob);
    } else {
      // Handle the case when imageData or imageData.data is undefined
      return null; // Or provide a default value or take other appropriate action
    }
  },
  []
);

  const toggleImageStyle = (index) => {
    setData((prevData) => {
      return prevData.map((post, i) => {
        if (i === index) {
          return {
            ...post,
            imageStyle:
              post.imageStyle === "object-cover"
                ? "object-contain"
                : "object-cover",
          };
        }
        return post;
      });
    });
  };

  return (
    <div className="lg:w-[80%] w-[100%] flex flex-col justify-center items-center gap-5 py-5 pb-14">
      {loading && <p className="text-white">Loading...</p>}
      {error && <p>{error}</p>}
      {data.map((post, index) => (
        <Card
          key={post._id}
          post={post}
          index={index}
          renderImage={renderImage}
          toggleImageStyle={toggleImageStyle}
        />
      ))}
       {/* {!loading && hasMorePosts && (
        <button onClick={handleLoadMore} className="text-white bg-blue-500 px-4 py-2 rounded">
          Load More
        </button>
      )} */}
            <div ref={lastPostRef} />

    </div>
  );
};

export default Cards;