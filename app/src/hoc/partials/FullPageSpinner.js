import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import logo from '@assets/svg/logo.svg';

const FullPageSpinner = () => {
  const isActive = useSelector((state) => _.get(state, 'spinnerReducer.show', false));
  const loaderMessage = useSelector((state) => _.get(state, 'spinnerReducer.text', ''));

  if (!isActive) {
    return null;
  }

  return (
    <div
      className="w-full h-full fixed flex justify-center items-center top-0 left-0 bg-black90"
      style={{ zIndex: 9999 }}>
      <span className="text-white flex flex-col items-center relative text-center">
        <div className="animate-bounce">
          <img src={logo} alt="Logo" className="w-30 animate-pulse relative mb-2 opacity-10" />
        </div>
        {loaderMessage}
      </span>
    </div>
  );
};

export default FullPageSpinner;
