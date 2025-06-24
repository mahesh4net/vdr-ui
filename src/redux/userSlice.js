import { createSlice } from '@reduxjs/toolkit';


const initialUser = null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.user = null;
     
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
