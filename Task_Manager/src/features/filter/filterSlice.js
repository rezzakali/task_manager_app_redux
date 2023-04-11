import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterWord: '',
  filteredTask: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterWord: (state, action) => {
      state.filterWord = action.payload;
    },
    selectData: (state, action) => {
      state.filteredTask.push(action.payload);
    },
    unSelectData: (state, action) => {
      const index = state.filteredTask.indexOf(action.payload);
      if (index !== -1) {
        state.filteredTask.splice(index, 1);
      }
    },
  },
});

export const { setFilterWord, selectData, unSelectData } = filterSlice.actions;

export default filterSlice.reducer;
