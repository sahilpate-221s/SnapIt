import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import {
  fetchAllPosts,
  likePost,
  addComment,
  deleteComment,
  deletePost,
  fetchSinglePost,
} from "../../../services/operations/PostAPI";
import { Loading } from "../../common/Loading"; // Loading component
import Masonry from "react-masonry-css"; // Masonry layout for grid
import PostCard from "./PostCard"; // PostCard component for detailed view
import { setSelectedPost } from "../../../slices/postSlice"; // Action to set selected post in Redux
import { clearToken } from "../../../slices/authSlice"; // Import the action to clear the token

const LoggedHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigation hook
  const user = useSelector((state) => state.profile.user);
  const posts = useSelector((state) => state.posts.posts || []); // Default to empty array
  const selectedPost = useSelector((state) => state.posts.selectedPost); // Access selected post from Redux
  const [loading, setLoading] = useState(false); // Loading state

  // Get token from state
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Check if the token is expired
    if (token && token.expiry < new Date().getTime()) {
      dispatch(clearToken()); // Clear expired token from Redux
      toast.error("Session expired. Please log in again.");
      navigate("/login"); // Redirect to the login page
    }
  }, [dispatch, token, navigate]);

  // Load posts when the component mounts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true); // Show loading spinner before the fetch call
        dispatch(fetchAllPosts()); // Fetch posts from the API
      } catch (error) {
        toast.error("Failed to load posts. Please try again.");
      } finally {
        setLoading(false); // Hide loading spinner after the fetch is complete
      }
    };

    loadPosts();
  }, [dispatch]);

  // Handle image click to open modal with post details
  const handleImageClick = async (post) => {
    await dispatch(fetchSinglePost(post._id)); // Fetch the latest post data including comments
    dispatch(setSelectedPost(post)); // Update Redux state with selected post
  };

  // Close the modal
  const closeModal = () => {
    dispatch(setSelectedPost(null)); // Reset the selected post in Redux when modal is closed
  };

  // Handle like action
  const handleLike = async (postId, isLiked) => {
    try {
      const updatedPost = await dispatch(likePost(postId, isLiked, posts, user._id));
      if (updatedPost) {
        console.log("Liked the post successfully:", updatedPost);
      }
    } catch (error) {
      console.error("Error in handleLike:", error);
    }
  };

  // Handle adding a comment to a post
  const handleAddComment = (postId, commentText) => {
    dispatch(addComment(postId, commentText, posts)); // Dispatch addComment action
  };

  // Handle deleting a comment
  const handleDeleteComment = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId, posts)); // Dispatch deleteComment action
  };

  // Handle deleting a post
  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId)); // Dispatch deletePost action
  };

  return (
    <div className="min-h-screen w-11/12 mx-auto p-6">
      {/* Content Section */}
      <div className="container min-h-screen w-full mx-auto">
        {loading ? (
          <Loading /> // Display Loading component while data is loading
        ) : posts.length > 0 ? (
          <Masonry
            breakpointCols={{ default: 5, 1100: 3, 700: 2, 500: 1 }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-lg rounded-lg mb-6"
              >
                {/* Image Section */}
                {post.images && post.images.length > 0 && (
                  <div className="relative">
                    <img
                      src={post.images[0].url}
                      alt={post.title}
                      className="w-full object-cover rounded-lg cursor-pointer"
                      onClick={() => handleImageClick(post)} // Open modal on image click
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
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center overflow-y-auto z-30"
          onClick={closeModal} // Close modal on click outside
        >
          <div
            className="bg-white sm:p-0 h-[85%] md:h-96 lg:h-[31rem] xl:h-[44rem]  p-4 rounded-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[70%] max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg flex lg:my-auto md:overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            {/* PostCard Component for displaying post details */}
            <PostCard
              post={selectedPost}
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
