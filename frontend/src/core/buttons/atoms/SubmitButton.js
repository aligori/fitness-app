import React from 'react';
import DefaultButton from '@core/buttons/electrons/DefaultButton';
import { FaCheck, FaSpinner } from 'react-icons/fa';

const SubmitButton = ({ onClick, disabled = false, loading = false, label, ...props }) => {
  return (
    <DefaultButton
      sm
      disabled={disabled || loading}
      label={
        <div className="flex items-center">
          {loading ? <FaSpinner className="animate-spin mr-1" /> : <FaCheck className="mr-1" />}
          {label}
        </div>
      }
      onClick={onClick}
      {...props}
    />
  );
};

export default SubmitButton;
