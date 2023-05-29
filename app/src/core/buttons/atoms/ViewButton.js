import React from 'react';
import { FaEye } from 'react-icons/fa';
import DefaultButton from '@core/buttons/electrons/DefaultButton';

const ViewButton = ({ onClick, label }) => {
  return (
    <DefaultButton
      sm
      label={
        <div className="flex items-center">
          <FaEye />
          {label}
        </div>
      }
      bgColor="bg-primary-100"
      bgColorHover="hover:bg-primary-200"
      textColor="text-primary-700"
      onClick={onClick}
    />
  );
};

export default ViewButton;
