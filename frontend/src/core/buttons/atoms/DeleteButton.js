import React from 'react';
import { FaTrash } from 'react-icons/fa';
import DefaultButton from '@core/buttons/electrons/DefaultButton';

const DeleteButton = ({ onClick, label }) => {
  return (
    <DefaultButton
      sm
      label={
        <div className="flex items-center">
          <FaTrash />
          {label}
        </div>
      }
      bgColor="bg-red-100"
      bgColorHover="hover:bg-red-300"
      textColor="text-red-700"
      onClick={onClick}
    />
  );
};

export default DeleteButton;
