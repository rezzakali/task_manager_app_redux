import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTasksQuery } from '../features/tasks/tasksApi';
import Error from '../ui/Error';
import Loading from '../ui/Loading';
import Task from './Task';

function Tasks() {
  const filterWord = useSelector((state) => state.filter.filterWord);

  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

  const { filteredTask } = useSelector((state) => state.filter);

  const rmSpace = (str) => str.replace(/\s/g, '');

  function filterBySearch(task) {
    const searchStr = filterWord.toLowerCase();
    const nameTask = task.taskName.toLowerCase();

    if (searchStr === '') {
      return true;
    } else if (nameTask.includes(searchStr)) {
      return true;
    } else if (rmSpace(nameTask).includes(rmSpace(searchStr))) {
      return true;
    } else if (nameTask.startsWith(searchStr)) {
      return true;
    }
  }

  let content = null;
  if (isLoading) content = <Loading />;

  if (!isLoading && isError) content = <Error error={error} />;

  if (!isLoading && !isError && tasks?.length === 0)
    content = <div>No tasks found!</div>;

  if (!isLoading && !isError && tasks?.length > 0)
    content = tasks
      .filter(filterBySearch)
      .filter((t) => !filteredTask.includes(t.project.projectName))
      .map((task) => <Task key={task.id} task={task} />);

  return <div className="lws-task-list">{content}</div>;
}

export default Tasks;
