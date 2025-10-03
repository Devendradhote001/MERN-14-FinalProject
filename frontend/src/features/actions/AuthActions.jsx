import { axiosIntance } from "../../config/axiosInstance";
import { addUser, removeUser } from "../reducers/authSlice";

export const userRegisterApi = (data) => async (dispatch) => {
  try {
    let response = await axiosIntance.post("/auth/register", data);
    if (response) {
      dispatch(addUser(response.data.user));
    }
  } catch (error) {
    console.log("error in registration", error);
  }
};

export const loginUserApi = (data) => async (dispatch) => {
  try {
    let response = await axiosIntance.post("/auth/login", data);
    if (response) {
      dispatch(addUser(response.data.user));
    }
  } catch (error) {
    console.log("error in login", error);
  }
};

export const logoutUserApi = () => async (dispatch) => {
  try {
    let response = await axiosIntance.post("/auth/logout");
    if (response) {
      console.log(response);
    }
  } catch (error) {
    console.log("error in login", error);
  }
};
