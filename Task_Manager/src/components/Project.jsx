import React from 'react';
import { useDispatch } from 'react-redux';
import { selectData, unSelectData } from '../features/filter/filterSlice';

function Project({ project }) {
  const { projectName, colorClass } = project;

  const dispatch = useDispatch();

  const handleClickCheckBox = ({ project, e }) => {
    const checked = e.target.checked;

    if (checked) {
      dispatch(unSelectData(project.projectName));
    } else {
      dispatch(selectData(project.projectName));
    }
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={colorClass}
        defaultChecked
        onClick={(e) => handleClickCheckBox({ project, e })}
      />
      <p className="label">{projectName}</p>
    </div>
  );
}

export default Project;
