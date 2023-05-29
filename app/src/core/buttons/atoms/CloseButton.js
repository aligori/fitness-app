import React from 'react';
import DefaultButton from '@core/buttons/electrons/DefaultButton';
import { FaTimes } from 'react-icons/fa';

const CloseButton = ({ onClick, label }) => {
  return (
    <DefaultButton
      sm
      label={
        <div className="flex items-center">
          <FaTimes className="mr-1" />
          {label}
        </div>
      }
      bgColor="bg-gray-200"
      bgColorHover="hover:bg-gray-300"
      textColor="text-gray-800"
      onClick={onClick}
    />
  );
};

export default CloseButton;
