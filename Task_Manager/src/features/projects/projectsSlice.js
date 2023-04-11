import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasksToFilter: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setFilteredTask: (state, action) => {
      state.tasksToFilter = action.payload;
    },
  },
});

export const { setFilteredTask } = projectsSlice.actions;

export default projectsSlice.reducer;
