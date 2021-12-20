import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:4000/",
});

export const Api = {
  getAll: () => api.get(`/`),
  createPost: (user_code, board_author, board_title, board_content) =>
    api.post(`/create`, {
      user_code,
      board_author,
      board_title,
      board_content,
    }),
  editPost: (board_code, board_title, board_content) =>
    api.put(`/update/${board_code}`, { board_title, board_content }),
  deletePost: (board_code) => api.post(`/delete`, { board_code }),
};
