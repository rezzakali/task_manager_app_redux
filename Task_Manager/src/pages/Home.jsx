import React from 'react';
import Sidebar from '../components/Sidebar';
import TaskContainer from '../components/TaskContainer';

function Home() {
  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <Sidebar />
        <TaskContainer />
      </main>
    </div>
  );
}

export default Home;
