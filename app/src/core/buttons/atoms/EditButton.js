import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import DefaultButton from '@core/buttons/electrons/DefaultButton';

const EditButton = ({ onClick, label }) => {
  return (
    <DefaultButton
      sm
      label={
        <div className="flex items-center">
          <FaPencilAlt />
          {label}
        </div>
      }
      bgColor="bg-emerald-100"
      bgColorHover="hover:bg-emerald-200"
      textColor="text-emerald-700"
      onClick={onClick}
    />
  );
};

export default EditButton;
