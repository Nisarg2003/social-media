import { useState, useEffect, useMemo } from "react";
import "tailwindcss/tailwind.css";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@nextui-org/react";

const SearchUserComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const renderImage = (imageData, contentType) => {
    const flattenedData = [].concat(imageData.data);
    const imageBlob = new Blob([new Uint8Array(flattenedData)], {
      type: contentType,
    });
    const imageUrl = URL.createObjectURL(imageBlob);
    return imageUrl;
  };

  const debouncedSearch = useMemo(
    () =>
      _.debounce(async (term) => {
        try {
          const response = await axios.post(
            `http://localhost:8080/api/v1/searchUser?search=${term}`
          );
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error searching user:", error);
        }
      }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="lg:w-[40%] flex flex-col justify-center items-center mt-8 p-4 bg-black rounded-lg shadow-md">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-[#262626] p-2 mb-2 rounded text-white bg-[#0a0a0a]"
        placeholder="Search users"
      />

      <ul className="mt-4 w-[100%]">
        {searchResults.map((user) => (
          <li
            key={user._id}
            className="flex items-center gap-2 border-t border-[#262626] p-2 bg-[#0a0a0a] rounded-md cursor-pointer"
            onClick={() => handleUserClick(user._id)}
          >
            {user.profile_pic &&
              user.profile_pic.data &&
              user.profile_pic.contentType && (
                <Avatar
                  radius="full"
                  className="w-10 h-10"
                  color="success"
                  src={renderImage(
                    user.profile_pic.data,
                    user.profile_pic.contentType
                  )}
                />
              )}
            <span className="text-white">{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUserComponent;
