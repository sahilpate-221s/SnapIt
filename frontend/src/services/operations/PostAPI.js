import { useSelector } from "react-redux";
import { postEndpoints } from "../apis";
import { toast } from "react-toastify";
import axios from "axios";
import { setSelectedPost, setPosts } from "../../slices/postSlice";

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
  return async (dispatch, getState) => {
    const toastId = toast.loading("Creating post...");
    dispatch(setLoadingSlice(true));

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

      const response = await axios.post(NEW_POST_API, formData, config);

      if (!response.data.success) {
        throw new Error(response.data.message || "Post creation failed");
      }

      toast.success(response.data.message || "Post created successfully!");
      dispatch(setPosts(response.data.post));
      dispatch(setPosts([response.data.post, ...posts])); // in dono me se koi ek dekhna hai
      navigate("/");
    } catch (error) {
      console.error("Error in createPost function:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      dispatch(setLoadingSlice(false));
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
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
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

      dispatch(setSelectedPost(response.data.post));
      return response.data;
    } catch (error) {
      console.error("Error in fetchSinglePost function:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
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
    } catch (error) {
      console.error("Error in deletePost function:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
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

      const response = await axios.patch(
        UPDATE_POST_API(postId),
        formData,
        config
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update post");
      }

      toast.success("Post updated successfully!");
      dispatch(fetchAllPosts()); // Re-fetch posts after update
    } catch (error) {
      console.error("Error in updatePost function:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };
};

export const addComment = (postId, commentText,posts) => {
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

      const updatedComments = response.data.post.comments;

      const updatedPosts = posts.map((p) =>
        p._id === postId ? { ...p, comments: updatedComments } : p
      );

      dispatch(setPosts(updatedPosts));
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error in addComment function:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };
};

export const deleteComment = (postId, commentId,posts) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        DELETE_COMMENT_API(postId, commentId),
        { withCredentials: true }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete comment");
      }

      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            comments: post.comments.filter((comment) => comment._id !== commentId),
          };
        }
        return post;
      });

      dispatch(setPosts(updatedPosts));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error in deleteComment function:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };
};

export const likePost = (postId, isLiked, posts, userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        REACT_TO_POST_API(postId),
        {}, // Send the isLiked status in the request body
        { withCredentials: true }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to update reaction on post"
        );
      }

      const updatedpostdata = posts.map(p=>
        p._id === postId ? {
          ...p,
          likes:isLiked ? p.likes.filter(id=> id !== userId) : [...p.likes,userId]
        } : p
      )

      // Dispatch the updated posts to the Redux store
      dispatch(setPosts(updatedpostdata));
      toast.success(response.data.message || "Reaction updated!");
      return updatedpostdata;

    } catch (error) {
      console.error("Error in likePost function:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };
};
