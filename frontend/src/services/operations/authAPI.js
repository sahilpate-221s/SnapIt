import { apiConnector } from '../apiconnector';
import { endpoints } from '../apis';
import { setLoading, setToken } from '../../slices/authSlice';
import { setUser } from "../../slices/profileSlice";
import { toast } from 'react-toastify';

const { 
  REGISTER_API, 
  LOGIN_API, LOGOUT_API, 
  CHANGE_PASSWORD_API, 
  DELETE_ACCOUNT_API 
} = endpoints;

export function register(name, email, password, confirmPassword, navigate) {
  return async (dispatch) => {
    console.log("Register function called with:", { name, email, password, confirmPassword }); // Debug
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", REGISTER_API, {
        name,
        email,
        password,
        confirmPassword,
      });
    
      console.log("Raw API Response:", response);
      console.log("Response Data:", response.data);
    
      if (!response.data.success) {
        throw new Error(response.data.message || "Signup failed");
      }
    
      const token = response.data.token;
      if (!token) {
        throw new Error("Token not received");
      }
    
      dispatch(setToken(token)); // Save token to Redux and localStorage
      console.log("Token stored successfully:", token);
      navigate("/all");
    } catch (error) {
      console.error("Error in register function:", error);
    }
     finally {
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
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));

      // localStorage.setItem("token", JSON.stringify(response.data.token));
      // localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/all");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "Login Failed";
      toast.error(errorMessage);
      // dispatch(setError(errorMessage)); // If this action is defined
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
      const response = await apiConnector("POST", LOGOUT_API);

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
      // dispatch(setError(errorMessage)); // If this action is defined
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
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, {
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
      // dispatch(setError(errorMessage)); // If this action is defined
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
      const response = await apiConnector("DELETE", DELETE_ACCOUNT_API);

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
      // dispatch(setError(errorMessage)); // If this action is defined
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
