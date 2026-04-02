import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const url =
  "https://e7945ea0-aff2-46b2-83a6-9d226964b9a9-00-3u8ccvscbgxqb.janeway.replit.dev";

export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchByUser",
  async (userId) => {
    const response = await fetch(`${url}/posts/user/${userId}`);
    return response.json();
  },
);

export const postNewPost = createAsyncThunk(
  "posts/postNewpost",
  async (postContent) => {
    const token = localStorage.getItem("authToken");

    const decode = jwtDecode(token);
    const userId = decode.id;

    const data = {
      title: "Post Title",
      content: postContent,
      user_id: userId,
    };

    const response = await axios.post(`${url}/posts`, data);
    return response.data;
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    (builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    }),
      builder.addCase(postNewPost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      }));
  },
});

export default postsSlice.reducer;
