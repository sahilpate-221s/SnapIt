import axiosInstance from "../axiosConfig";
import { endpoints } from "../apis";
import { setLoading, setToken, setSignupData, clearToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { toast } from "react-toastify";

const {
  REGISTER_API,
  LOGIN_API,
  LOGOUT_API,
  CHANGE_PASSWORD_API,
  DELETE_ACCOUNT_API,
} = endpoints;

export function register(name, email, password, confirmPassword, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await axiosInstance.post(REGISTER_API, {
        name,
        email,
        password,
        confirmPassword,
      });

      if (!data?.success) throw new Error(data?.message);

      toast.success("Registration Successful");

      dispatch(setSignupData(data.user));
      dispatch(setToken(data.token));

      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Registration Failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await axiosInstance.post(LOGIN_API, { email, password });

      if (!data?.success) throw new Error(data?.message);

      dispatch(setToken(data.token));
      dispatch(setUser(data.user));

      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Login Failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await axiosInstance.get(LOGOUT_API);

      if (!data?.success) throw new Error(data?.message);

      toast.success("Logout Successful");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Logout Failed"
      );
    } finally {
      dispatch(setLoading(false));
    }

    dispatch(clearToken());
    dispatch(setUser(null));

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };
}

export function changePassword(currentPassword, newPassword, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await axiosInstance.post(CHANGE_PASSWORD_API, {
        currentPassword,
        newPassword,
      });

      if (!data?.success) throw new Error(data?.message);

      toast.success("Password Changed Successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Change Password Failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function deleteAccount(navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await axiosInstance.delete(DELETE_ACCOUNT_API);

      if (!data?.success) throw new Error(data?.message);

      toast.success("Account Deleted Successfully");

      dispatch(setToken(null));
      dispatch(setUser(null));

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/register");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Delete Account Failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
}
