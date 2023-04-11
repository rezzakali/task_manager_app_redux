import React from 'react';
import ProjectsList from './ProjectsList';
import TeamMembers from './TeamMembers';

function Sidebar() {
  return (
    <div className="sidebar">
      <ProjectsList />
      <TeamMembers />
    </div>
  );
}

export default Sidebar;
