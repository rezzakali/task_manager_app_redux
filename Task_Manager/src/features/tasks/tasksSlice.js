import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    allTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { allTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
