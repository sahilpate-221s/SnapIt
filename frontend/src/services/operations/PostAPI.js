import { postEndpoints } from "../apis";
import { toast } from "react-toastify";
import axiosInstance from "../axiosConfig";
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

export const createPost = (formData) => {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Creating post...");
    try {
      // Make the API request
      const response = await axiosInstance.post(NEW_POST_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Destructure the response for clarity
      const { success, post, message } = response.data;

      if (success) {
        // Get the current posts from state
        const { posts } = getState().posts;

        // Update Redux state with the new post
        dispatch(setPosts([post, ...posts]));

        // Success notification
        toast.success(message || "Post created successfully!");
        return { success: true };
      } else {
        // Error notification for API failure
        toast.error(message || "Failed to create post.");
        return { success: false, message };
      }
    } catch (error) {
      // Detailed error handling
      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      // Dismiss loading toast
      toast.dismiss(toastId);
    }
  };
};

export const fetchAllPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(ALL_POSTS_API);

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
      const response = await axiosInstance.get(SINGLE_POST_API(postId));

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
      const response = await axiosInstance.delete(DELETE_POST_API(postId));

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
      const response = await axiosInstance.patch(
        UPDATE_POST_API(postId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

export const addComment = (postId, commentText, posts) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post(
        ADD_COMMENT_API(postId),
        { text: commentText }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to add comment");
      }

      const updatedComments = response.data.post.comments;

      const updatedPosts = posts.map((p) =>
        p._id === postId ? { ...p, comments: updatedComments } : p
      );

      dispatch(setPosts(updatedPosts));
    } catch (error) {
      console.error("Error in addComment function:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };
};

export const deleteComment = (postId, commentId, posts) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.delete(
        DELETE_COMMENT_API(postId, commentId)
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete comment");
      }

      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== commentId
            ),
          };
        }
        return post;
      });

      dispatch(setPosts(updatedPosts));
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
      const response = await axiosInstance.post(
        REACT_TO_POST_API(postId),
        {} // Send the isLiked status in the request body
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to update reaction on post"
        );
      }

      const updatedpostdata = posts.map((p) =>
        p._id === postId
          ? {
              ...p,
              likes: isLiked
                ? p.likes.filter((id) => id !== userId)
                : [...p.likes, userId],
            }
          : p
      );

      // Dispatch the updated posts to the Redux store
      dispatch(setPosts(updatedpostdata));
      return updatedpostdata;
    } catch (error) {
      console.error("Error in likePost function:", error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };
};
