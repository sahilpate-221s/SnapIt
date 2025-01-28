import React, { useState } from "react";

const AddPosts = ({ collection }) => {
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handleAddPost = () => {
    if (imageUrl) {
      setPosts([...posts, { imageUrl, caption }]);
      setImageUrl("");
      setCaption("");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full border shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Add Posts to Collection
        </h1>
        <p className="text-gray-600 mb-6">
          <strong>Collection:</strong> {collection.name}
        </p>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="text-gray-700 font-medium">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full mt-2 border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="caption" className="text-gray-700 font-medium">
              Caption
            </label>
            <input
              type="text"
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full mt-2 border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black"
              placeholder="Add a caption (optional)"
            />
          </div>
          <button
            onClick={handleAddPost}
            className="w-full bg-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 focus:ring focus:ring-gray-300"
          >
            Add Post
          </button>
        </div>

        {/* Posts List */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Added Posts
          </h2>
          <ul className="space-y-4">
            {posts.map((post, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-gray-800">{post.caption || "No caption"}</p>
                    <p className="text-gray-500 text-sm">{post.imageUrl}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddPosts;
