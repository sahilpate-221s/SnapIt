import { apiConnector } from "../apiconnector";
import { postEndpoints } from "../apis";
import { setLoading } from "../../slices/profileSlice";
import { toast } from "react-toastify";

const { NEW_POST_API } = postEndpoints;

export const createPost = (formData, navigate) => {
  return async (dispatch) => {
    console.log("createPost function called with ", formData); // Debugging line
    const toastId = toast.loading("Creating post...");
    dispatch(setLoading(true));

    // Check if user is logged in and has a token
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please log in to create a post.");
      navigate("/login"); // Redirect to login page
      return;
    }

    // Set headers with token for authorization
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      // Check for formData validity
      if (!formData || !formData.get("title") || !formData.get("description")) {
        throw new Error("Title, description, and files are required.");
      }

      // Send the POST request with formData and authorization header
      const response = await apiConnector("POST", NEW_POST_API, formData, config);

      console.log("Raw API Response:", response);
      console.log("Response Data:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || "Post creation failed");
      }

      toast.success(response.data.message || "Post created successfully!");
      dispatch(addPost(response.data.post));
      navigate("/all"); // Navigate after successful post creation
    } catch (error) {
      console.error("Error in createPost function:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};

