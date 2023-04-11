import React from 'react';
import { useGetTeamQuery } from '../features/team/teamApi';
import Error from '../ui/Error';
import Loading from '../ui/Loading';
import TeamMember from './TeamMember';

function TeamMembers() {
  const { data: teamMembers, isLoading, isError, error } = useGetTeamQuery();

  let content = null;
  if (isLoading) content = <Loading />;

  if (!isLoading && isError) content = <Error error={error} />;

  if (!isLoading && !isError && teamMembers?.length === 0)
    content = <div>No members found!</div>;

  if (!isLoading && !isError && teamMembers?.length > 0)
    content = teamMembers.map((teamMember) => (
      <TeamMember key={teamMember.id} teamMember={teamMember} />
    ));

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}

export default TeamMembers;
