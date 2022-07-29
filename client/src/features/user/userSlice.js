import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import http from '../../http-commons';

const initialState = {
   user: null,
   token: localStorage.getItem('token'),
   isLoading: false,
   isAuth: false
   
   

   
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const  registerAsync = createAsyncThunk(
  'user/register',
  async (form) => {
    const res = await http.post('/users/register', form);
    // The value we return becomes the `fulfilled` action payload
    return res.data;
  }
);

export const loginAsync = createAsyncThunk('users/login',
  async (form) => {
    const res = await http.post('/users/login', form);
    return res.data;
  }
 )

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAsync.fulfilled, (state,{payload}) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = payload.user;
        localStorage.setItem('token', payload.token);
      })
      .addCase(registerAsync.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state,{payload}) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = payload.user;
        localStorage.setItem('token', payload.token)
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
      })
      ;
  },
});




export default userSlice.reducer;
