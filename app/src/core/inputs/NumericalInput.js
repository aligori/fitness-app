import React from 'react';
import { numbersOnly } from '@utils/helpers';

const Input = ({
  label,
  placeholder,
  onChange,
  error,
  value,
  className,
  disabled,
  height = 'h-11',
  extraClasses = 'text-sm',
  required = false,
  i,
  ...props
}) => {
  return (
    <div>
      {label && (
        <div className={`${extraClasses} flex font-semibold`}>
          <div className="text-base">{i}</div>
          {label}
          {required && <div className="text-red-600 ml-1">*</div>}
        </div>
      )}
      <input
        disabled={disabled}
        value={value}
        className={`appearance-none ${height} relative block w-full mt-2 px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-500 rounded text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm ${className}`}
        placeholder={placeholder}
        onChange={(e) => onChange(numbersOnly(e.target.value))}
        {...props}
      />
      {error && <div className={`text-xs text-red-400 pt-2 ${!error && 'pb-4'}`}>error</div>}
    </div>
  );
};

export default Input;
