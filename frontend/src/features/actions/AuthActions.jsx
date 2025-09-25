const { axiosIntance } = require("../../config/axiosInstance");

const fetchRegisterThunk = (data) => async (dispatch) => {
  try {
    let response = await axiosIntance.post("/auth/register", data);
    if (response) {
      console.log(response);
    }
  } catch (error) {
    console.log("error in registration", error);
  }
};
