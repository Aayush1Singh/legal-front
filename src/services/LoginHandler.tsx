import axios from "axios";
import { eachMonthOfInterval } from "date-fns";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

interface Request {
  // Define the expected response structure here
  // For example:
  data: object;
}

export async function SignupHandler(email, password, username) {
  const body = {
    email,
    password,
    username,
    /* your body content here */
  };
  const response = await axios.post(`${apiUrl}/signup`, body, {
    // headers: { Authorization: `Bearer ${""}` },
    withCredentials: true,
  });

  return response.data;
}
export async function isLoggedIn() {
  const response = await axios.post(
    `${apiUrl}/verify`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
}
export async function LoginHandler(email, password) {
  const body = {
    email,
    password,
    /* your body content here */
  };
  try {
    const response = await axios.post(`${apiUrl}/signin`, body, {
      // headers: { Authorization: `Bearer ${""}` },
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function ResetPasswordHandler(password, new_password) {
  const response = await axios.post(
    `${apiUrl}/reset_password`,
    {
      password,
      new_password,
    },
    {
      // headers: { Authorization: `Bearer ${""}` },
      withCredentials: true,
    }
  );
  return response.data;
}
export async function logOut() {
  const response = await axios.post(`${apiUrl}/logout`, {
    // headers: { Authorization: `Bearer ${""}` },
    withCredentials: true,
  });

  return response.data;
}
