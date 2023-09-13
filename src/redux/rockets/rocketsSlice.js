import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const path = 'https://api.spacexdata.com/v4/rockets';

const initialState = {
  rockets: {},
};

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async (thunkAPI) => {
  try {
    const list = await axios(path);
    return list.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
});

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default rocketsSlice.reducer;