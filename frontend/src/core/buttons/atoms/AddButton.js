import React from 'react';
import { FaPlus } from 'react-icons/fa';
import DefaultButton from '@core/buttons/electrons/DefaultButton';

const AddButton = ({ onClick, label }) => {
  return (
    <DefaultButton
      xs
      label={
        <div className="flex items-center p-1">
          <FaPlus className="mr-1" />
          {label}
        </div>
      }
      onClick={onClick}
    />
  );
};

export default AddButton;
