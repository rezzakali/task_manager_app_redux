import { apiSlice } from '../api/apiSlice';

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/tasks`,
    }),

    addTask: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: {
          taskName: data.tName,
          teamMember: {
            name: data.member.name,
            avatar: data.member.avatar,
            id: data.member.id,
          },
          deadline: data.deadline,
          project: {
            id: data.member.id,
            projectName: data.project.projectName,
            colorClass: data.project.colorClass,
          },
          status: 'pending',
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
              draft.push(res.data);
            })
          );
        } catch (error) {}
      },
    }),

    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: {
          taskName: data.tName,
          teamMember: {
            name: data.member.name,
            avatar: data.member.avatar,
            id: data.member.id,
          },
          deadline: data.deadline,
          project: {
            id: data.member.id,
            projectName: data.project.projectName,
            colorClass: data.project.colorClass,
          },
          status: 'pending',
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
              const result = draft.find((d) => d.id === arg.id);
              if (result) {
                const myIndex = draft.indexOf(result);
                draft[myIndex] = res.data;
              }
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const result = dispatch(
          apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
            const myTask = draft.find((t) => t.id === arg);

            const taskIndex = draft.indexOf(myTask);

            if (taskIndex !== -1) {
              draft.splice(taskIndex, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          result.undo();
        }
      },
      // optimistic cache update end
    }),

    statusChange: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData('getTasks', undefined, (draft) => {
              const result = draft.find((d) => d.id === arg.id);
              if (result) {
                const myIndex = draft.indexOf(result);
                draft[myIndex] = res.data;
              }
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useStatusChangeMutation,
} = tasksApi;
