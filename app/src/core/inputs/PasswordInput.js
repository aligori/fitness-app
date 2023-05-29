import React, { useState } from 'react';
import eye from '@assets/svg/eye.svg';
import eyeNo from '@assets/svg/eye_no.svg';

const PasswordInput = ({ label, error, containerClass, ...props }) => {
  const [show, setShow] = useState(false);

  const toggleVisibility = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <div className={containerClass}>
      {label && <label className="xs:text-sm md:text-lg">{label}</label>}
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          className={
            error
              ? `appearance-none relative block w-full mt-2 px-3 h-11 py-2 border border-gray-300 placeholder-gray-500 rounded text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-red-500 text-xs sm:text-sm`
              : `appearance-none relative block w-full mt-2 px-3 h-11 border border-gray-300 placeholder-gray-500 rounded text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-indigo-500 text-xs sm:text-sm`
          }
          {...props}
        />
        <div className="absolute top-0 h-full right-2 flex justify-center items-center cursor-pointer">
          <img
            role="presentation"
            alt="toggle"
            onClick={toggleVisibility}
            className="h-5"
            src={show ? eyeNo : eye}
          />
        </div>
      </div>
      {error && <label className="xs:text-xs md:text-sm text-red-500">{error[0]}</label>}
    </div>
  );
};

export default PasswordInput;
