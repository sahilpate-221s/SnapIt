import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchAllPosts,
  likePost,
  addComment,
  deleteComment,
  deletePost,
} from "../../../services/operations/PostAPI";
import { setLoading } from "../../../slices/postSlice"; // Import setLoading from the correct slice
import { Loading } from "../../common/Loading";
import Masonry from "react-masonry-css"; // Importing the Masonry layout
import PostCard from "./PostCard"; // Importing the PostCard component

const LoggedHomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts || []); // Default to an empty array
  const loading = useSelector((state) => state.posts.loading); // Getting loading state from Redux
  const [selectedPost, setSelectedPost] = useState(null); // State for the selected post modal

  useEffect(() => {
    const loadPosts = async () => {
      try {
        dispatch(setLoading(true)); // Set loading state to true
        dispatch(fetchAllPosts());
      } catch (error) {
        toast.error("Failed to load posts. Please try again.");
      } finally {
        dispatch(setLoading(false)); // Set loading state to false after the request completes
      }
    };

    loadPosts();
  }, [dispatch]);

  const handleImageClick = (post) => {
    setSelectedPost(post); // Set the selected post for the modal
  };

  const closeModal = () => {
    setSelectedPost(null); // Close the modal
  };

  const handleLike = (postId) => {
    dispatch(likePost(postId)); // Like the post
  };

  const handleAddComment = (postId, commentText) => {
    dispatch(addComment(postId, commentText)); // Add comment to post
  };

  const handleDeleteComment = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId)); // Delete comment from post
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId)); // Delete the post
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Content Section */}
      <div className="container mx-auto bg-white p-6 rounded-xl shadow-lg w-11/12">
        {loading ? (
          <Loading /> // Display Loading component while data is loading
        ) : posts.length > 0 ? (
          <Masonry
            breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map((post) => (
              <div key={post._id} className="bg-white shadow-lg rounded-lg p-4">
                {/* Image */}
                {post.images && post.images.length > 0 && (
                  <div className="relative">
                    <img
                      src={post.images[0].url}
                      alt={post.title}
                      className="w-full object-cover rounded-lg mb-4 cursor-pointer"
                      onClick={() => handleImageClick(post)} // Handle image click
                    />
                    {post.images.length > 1 && (
                      <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                        {post.images.length} images
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </Masonry>
        ) : (
          <p className="text-center text-gray-600">
            No posts available at the moment.
          </p>
        )}
      </div>

      {/* Modal for Full Post Details */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg w-3/4 md:w-1/2 flex"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Render PostCard Component with the selected post */}
            <PostCard
              post={selectedPost}
              closeModal={closeModal}
              onLike={handleLike}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
              onDeletePost={handleDeletePost}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedHomePage;
