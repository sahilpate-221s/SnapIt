import axios from 'axios'; // Import axios
import { endpoints } from '../apis'; // Ensure your endpoints are correct
import { setLoading, setToken,setSignupData } from '../../slices/authSlice';
import { setUser } from "../../slices/profileSlice";
import { toast } from 'react-toastify';

const { 
  REGISTER_API, 
  LOGIN_API, 
  LOGOUT_API, 
  CHANGE_PASSWORD_API, 
  DELETE_ACCOUNT_API 
} = endpoints;

export function register(name, email, password, confirmPassword, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      // Sending the registration request to the server
      const response = await axios.post(REGISTER_API, {
        name,
        email,
        password,
        confirmPassword,
      },
      {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Signup failed");
      }

      // No need to store the token in Redux or LocalStorage since it's in an HTTP-only cookie
      // Dispatch user information or success data if needed
      dispatch(setSignupData(response.data.user)); // Store the user data if needed
      dispatch(setToken(response.data.token));
      navigate("/all");  // Redirect after successful registration
    } catch (error) {
      console.error("Error in register function:", error.response?.data || error.message);
      toast.error(error.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await axios.post(LOGIN_API, {
        email,
        password,
      },
      {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      console.log("LOGIN API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
      }

      toast.success("Login Successful");

      // Store token and user in HTTP-only cookie
      const user = response.data.user;

      dispatch(setToken(response.data.token));
      dispatch(setUser(user));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/all");  // Redirect after login
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "Login Failed";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


export function logout(navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging out...");
    dispatch(setLoading(true));

    try {
      const response = await axios.post(LOGOUT_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Logout Successful");
      dispatch(setToken(null));
      dispatch(setUser(null));

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "Logout Failed";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function changePassword(currentPassword, newPassword, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Changing password...");
    dispatch(setLoading(true));

    try {
      const response = await axios.post(CHANGE_PASSWORD_API, {
        currentPassword,
        newPassword,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Changed Successfully");
      navigate("/profile");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "Change Password Failed";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function deleteAccount(navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting account...");
    dispatch(setLoading(true));

    try {
      const response = await axios.delete(DELETE_ACCOUNT_API);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Account Deleted Successfully");
      dispatch(setToken(null));
      dispatch(setUser(null));

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/register");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "Delete Account Failed";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
