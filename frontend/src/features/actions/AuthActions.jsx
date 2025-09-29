import { axiosIntance } from "../../config/axiosInstance";

export const fetchRegisterApi = (data) => async (dispatch) => {
  try {
    let response = await axiosIntance.post("/auth/register", data);
    if (response) {
      console.log(response);
    }
  } catch (error) {
    console.log("error in registration", error);
  }
};

export const loginUserApi = (data) => async (dispatch) => {
  try {
    let response = await axiosIntance.post("/auth/login", data);
    if (response) {
      console.log(response);
    }
  } catch (error) {
    console.log("error in login", error);
  }
};
