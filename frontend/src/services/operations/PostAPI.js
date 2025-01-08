import { apiConnector } from "../apiconnector";
import { postEndpoints } from "../apis";
import { setLoading } from "../../slices/profileSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { setPosts } from "../../slices/postSlice";
import { useSelector } from "react-redux";

const {
  NEW_POST_API,
  ALL_POSTS_API,
  SINGLE_POST_API,
  DELETE_POST_API,
  UPDATE_POST_API,
  ADD_COMMENT_API,
  REACT_TO_POST_API,
  DELETE_COMMENT_API,
} = postEndpoints;

export const createPost = (formData, navigate) => {
  return async (dispatch) => {
    console.log("createPost function called with ", formData);
    const toastId = toast.loading("Creating post...");
    dispatch(setLoading(true));

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to create a post.");
      navigate("/login");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (!formData || !formData.get("title") || !formData.get("description")) {
        throw new Error("Title, description, and files are required.");
      }

      const response = await apiConnector(
        "POST",
        NEW_POST_API,
        formData,
        config
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Post creation failed");
      }

      toast.success(response.data.message || "Post created successfully!");
      dispatch(addPost(response.data.post));
      navigate("/all");
    } catch (error) {
      console.error("Error in createPost function:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};

export const fetchAllPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(ALL_POSTS_API, {
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch posts");
      }

      dispatch(setPosts(response.data.posts));
    } catch (error) {
      console.error("Error in fetchAllPosts function:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };
};

export const fetchSinglePost = (postId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(SINGLE_POST_API(postId), {
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch post");
      }

      // Assuming you have an action to set the single post
      dispatch(setPosts(response.data.post));
    } catch (error) {
      console.error("Error in fetchSinglePost function:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(DELETE_POST_API(postId), {
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete post");
      }

      toast.success("Post deleted successfully!");
      dispatch(fetchAllPosts()); // Re-fetch posts after deletion
    } catch (error) {
      console.error("Error in deletePost function:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };
};

export const updatePost = (postId, formData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to update the post.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.patch(UPDATE_POST_API(postId), formData, config);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update post");
      }

      toast.success("Post updated successfully!");
      dispatch(fetchAllPosts()); // Re-fetch posts after update
    } catch (error) {
      console.error("Error in updatePost function:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };
};

export const addComment = (postId, commentText) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        ADD_COMMENT_API(postId),
        { text: commentText },
        { withCredentials: true }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to add comment");
      }

      toast.success("Comment added successfully!");
      dispatch(fetchSinglePost(postId)); // Re-fetch the single post to update comments
    } catch (error) {
      console.error("Error in addComment function:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };
};

export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        DELETE_COMMENT_API(postId, commentId),
        { withCredentials: true }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete comment");
      }

      toast.success("Comment deleted successfully!");
      dispatch(fetchSinglePost(postId)); // Re-fetch the single post to update comments
    } catch (error) {
      console.error("Error in deleteComment function:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };
};

export const likePost = (postId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        REACT_TO_POST_API(postId),
        { reaction: "like" },
        { withCredentials: true }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to like post");
      }

      toast.success("Post liked!");
      dispatch(fetchSinglePost(postId)); // Re-fetch the post to update likes
    } catch (error) {
      console.error("Error in likePost function:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };
};
