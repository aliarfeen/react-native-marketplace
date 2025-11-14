import { createSlice } from '@reduxjs/toolkit';

const categories = ["Electronics", "Men’s Clothing", "Jewelery"];

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    category: 'Electronics',
  },
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    },

    toggleCategory: (state) => {
      const currentIndex = categories.indexOf(state.category);
      const nextIndex = (currentIndex + 1) % categories.length;
      state.category = categories[nextIndex];
    },
  },
});

export const { changeCategory, toggleCategory } = homeSlice.actions;
export default homeSlice.reducer;
