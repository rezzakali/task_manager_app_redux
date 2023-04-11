import React from 'react';
import Header from '../ui/Header';
import Tasks from './Tasks';

function TaskContainer() {
  return (
    <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
      <Header />
      <Tasks />
    </div>
  );
}

export default TaskContainer;
