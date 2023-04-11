import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetProjectsQuery } from '../features/projects/projectsApi';
import { useEditTaskMutation } from '../features/tasks/tasksApi';
import { useGetTeamQuery } from '../features/team/teamApi';

function Edit() {
  const { data: teamMembers } = useGetTeamQuery();
  const { data: projects } = useGetProjectsQuery();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    deadline: deadlineToEdit,
    id: idToEdit,
    projectName: projectNameToEdit,
    status: statusToEdit,
    taskName: taskNameToEdit,
    project: projectToEdit,
    teamMember: teamMemberToEdit,
  } = location?.state?.data || {};

  const {
    name: memberName,
    avatar: memberAvatar,
    id: memberId,
  } = teamMemberToEdit;
  const { id: projectIdToEdit, projectName, colorClass } = projectToEdit;

  const [tName, setTName] = useState(taskNameToEdit ? taskNameToEdit : '');
  const [assignTo, setAssignTo] = useState(memberName ? memberName : '');
  const [pName, setPName] = useState(projectName ? projectName : '');
  const [deadline, setDeadline] = useState(
    deadlineToEdit ? deadlineToEdit : ''
  );

  const [editTask, { data, isSuccess }] = useEditTaskMutation();

  const member = teamMembers?.find((member) => member.name === assignTo);
  const project = projects?.find((project) => project.projectName === pName);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask({
      id: idToEdit,
      data: { tName, project, member, deadline },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  return (
    <>
      <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
        Edit Task for Your Team
      </h1>

      <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="fieldContainer">
            <label htmlFor="lws-taskName">Task Name</label>
            <input
              type="text"
              name="taskName"
              id="lws-taskName"
              required
              placeholder="Implement RTK Query"
              value={tName}
              onChange={(e) => setTName(e.target.value)}
            />
          </div>

          <div className="fieldContainer">
            <label>Assign To</label>
            <select
              name="teamMember"
              id="lws-teamMember"
              required
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
            >
              <option value="" hidden defaultValue>
                Select Job
              </option>
              {teamMembers?.map((team) => (
                <option key={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
          <div className="fieldContainer">
            <label htmlFor="lws-projectName">Project Name</label>
            <select
              id="lws-projectName"
              name="projectName"
              required
              value={pName}
              onChange={(e) => setPName(e.target.value)}
            >
              <option value="" hidden defaultValue>
                Select Project
              </option>
              {projects?.map((p) => (
                <option key={p.id}>{p.projectName}</option>
              ))}
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-deadline">Deadline</label>
            <input
              type="date"
              name="deadline"
              id="lws-deadline"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="text-right">
            <button type="submit" className="lws-submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Edit;
