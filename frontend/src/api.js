import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:4000/",
});

export const Api = {
  getAll: () => api.get(`/post`),
  createPost: (user_code, board_author, board_title, board_content) =>
    api.post(
      `/post/create`,
      {
        user_code,
        board_author,
        board_title,
        board_content,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    ),
  editPost: (board_code, board_title, board_content) =>
    api.put(
      `/post/update/${board_code}`,
      { board_title, board_content },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    ),
  deletePost: (board_code) =>
    api.post(
      `/post/delete`,
      { board_code },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    ),
  getUser: () =>
    api.get(`/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),
  signUp: (user_name, user_id, user_password) =>
    api.post(`/user/create`, {
      user_name,
      user_id,
      user_password,
    }),
  login: (user_id, user_password) =>
    api.post(`/user/login`, { user_id, user_password }),
  getMe: () =>
    api.get(`/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),
};
