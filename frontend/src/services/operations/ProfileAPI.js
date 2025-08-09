import axios from "axios";
import { toast } from "react-toastify";
import { profileEndpoints } from "../apis";

import { setUser } from "../../slices/profileSlice";

export const getUserProfile = (userId) => {
  return async () => {
    try {
      const response = await axios.get(profileEndpoints.USER_PROFILE_API(userId), {
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch user profile");
      }

      return { success: true, user: response.data.user };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };
};

export const getUserPosts = (userId) => {
  return async () => {
    try {
      const response = await axios.get(profileEndpoints.USER_POSTS_API(userId), {
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch user posts");
      }

      return { success: true, posts: response.data.posts };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };
};

export const updateProfile = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(profileEndpoints.UPDATE_PROFILE_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update profile");
      }

      dispatch(setUser(response.data.user));
      toast.success("Profile updated successfully!");
      return { success: true, user: response.data.user };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };
};
