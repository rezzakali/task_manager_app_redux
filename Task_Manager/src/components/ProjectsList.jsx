import React from 'react';
import { useGetProjectsQuery } from '../features/projects/projectsApi';
import Error from '../ui/Error';
import Loading from '../ui/Loading';
import Project from './Project';

function ProjectsList() {
  const { data: projects, isLoading, isError, error } = useGetProjectsQuery();

  let content = null;
  if (isLoading) content = <Loading />;

  if (!isLoading && isError) content = <Error error={error} />;

  if (!isLoading && !isError && projects?.length === 0)
    content = <div>No projects found!</div>;

  if (!isLoading && !isError && projects?.length > 0)
    content = projects.map((project) => (
      <Project key={project.id} project={project} />
    ));

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}

export default ProjectsList;
