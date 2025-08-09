import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../services/axiosConfig";
import { profileEndpoints, postEndpoints } from "../services/apis";
import { FaHeart, FaComment, FaExpand, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Loading } from "../components/common/Loading";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.profile);
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  
  // Modal state for image viewing
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(profileEndpoints.USER_PROFILE_API(userId));
      
      if (response.data.success) {
        setUserProfile(response.data.user);
        setFollowersCount(response.data.user.followers?.length || 0);
        setFollowingCount(response.data.user.following?.length || 0);
        setIsFollowing(response.data.user.followers?.includes(currentUser._id) || false);
      }
    } catch (error) {
      setError("Failed to load user profile");
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await axiosInstance.get(profileEndpoints.USER_POSTS_API(userId));
      
      if (response.data.success) {
        setUserPosts(response.data.posts);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const handleFollow = async () => {
    try {
      // Optimistically update the UI
      const newIsFollowing = !isFollowing;
      const newFollowersCount = newIsFollowing ? followersCount + 1 : followersCount - 1;
      
      // Update state immediately for real-time feel
      setIsFollowing(newIsFollowing);
      setFollowersCount(newFollowersCount);
      
      const response = await axiosInstance.post(profileEndpoints.FOLLOW_USER_API(userId), {});
      
      // Use the response data for accurate counts
      if (response.data) {
        setFollowersCount(response.data.followersCount);
        setFollowingCount(response.data.followingCount);
        setIsFollowing(response.data.isFollowing);
      }
      
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
      // Revert changes on error
      setIsFollowing(isFollowing);
      setFollowersCount(followersCount);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axiosInstance.post(postEndpoints.REACT_TO_POST_API(postId), {});
      
      // Re-fetch posts to update like status
      await fetchUserPosts();
      
      // Update selected post if it's the one being liked
      if (selectedPost && selectedPost._id === postId) {
        const updatedPost = userPosts.find(post => post._id === postId);
        if (updatedPost) {
          setSelectedPost(updatedPost);
        }
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const checkIfLiked = (post) => {
    return post.likes?.includes(currentUser._id) || false;
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const handlePrevImage = () => {
    if (selectedPost && selectedPost.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedPost.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedPost && selectedPost.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedPost.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{error}</h2>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User not found</h2>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow-lg">
        <div className="w-11/12 max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* User Info */}
            <div className="flex items-center space-x-6">
              <img
                src={userProfile.profilePicture || "/placeholder-profile.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-300"
              />
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  {userProfile.name}
                </h1>
                <p className="text-gray-600">@{userProfile.name}</p>
                <p className="mt-2 text-lg text-gray-700">{userProfile.bio}</p>
                
                {/* Follow/Unfollow Button */}
                {currentUser._id !== userId && (
                  <button
                    onClick={handleFollow}
                    className={`mt-4 px-6 py-2 rounded-lg transition ${
                      isFollowing
                        ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
            </div>

            {/* User Stats */}
            <div className="flex space-x-8 mt-4 lg:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{userPosts.length}</div>
                <div className="text-gray-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{followersCount}</div>
                <div className="text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{followingCount}</div>
                <div className="text-gray-600">Following</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="w-11/12 max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Posts</h2>
        
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handlePostClick(post)}
              >
                {post.images && post.images.length > 0 && (
                  <div className="relative">
                    <img
                      src={post.images[0].url}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded">
                      <FaExpand size={16} />
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <FaHeart size={14} />
                        <span>{post.likes?.length || 0}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FaComment size={14} />
                        <span>{post.comments?.length || 0}</span>
                      </span>
                    </div>
                    <span className="text-xs">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showModal && selectedPost && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl sm:max-w-2xl">
            {/* User Info Section */}
            <div className="absolute top-6 left-6 bg-black bg-opacity-50 text-white p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <img
                  src={userProfile.profilePicture || "/placeholder-profile.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <span className="text-white text-sm font-semibold">
                    {userProfile.name}
                  </span>
                  <p className="text-xs text-gray-300">
                    {new Date(selectedPost.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Like Button */}
            <button
              onClick={() => handleLike(selectedPost._id)}
              className={`absolute top-6 right-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-800 ${
                checkIfLiked(selectedPost) ? 'text-red-500' : 'text-white'
              }`}
            >
              <FaHeart className="text-xl" />
            </button>

            <img
              src={selectedPost.images[currentImageIndex]?.url || ""}
              alt={selectedPost.title || "Post image"}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-800"
            >
              <FaTimes className="text-xl" />
            </button>
            {selectedPost.images && selectedPost.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-800"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-800"
                >
                  <FaArrowRight />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
