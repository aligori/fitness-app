import React, { useState } from 'react';
import DownChevron from '@assets/svg/down_chevron_gray.svg';

const Select = (props) => {
  const { label, placeholder, value, options = [], handleInputChange } = props;

  const [showOptions, setShowOptions] = useState(false);

  const optionsArray = () => {
    return options.map((option, index) => {
      return (
        <div
          key={index}
          className="text-sm font-semibold hover:bg-gray-300 hover:font-bold py-1 px-3 flex flex-row items-center cursor-pointer"
          onClick={() => {
            handleInputChange(option);
          }}>
          {option.label}
        </div>
      );
    });
  };

  const onClickOutsideListener = () => {
    setShowOptions(false);
    document.removeEventListener('click', onClickOutsideListener);
  };

  const addOnClickOutsideListener = () => {
    document.addEventListener('click', onClickOutsideListener);
  };

  return (
    <div className="w-full relative" onBlur={() => addOnClickOutsideListener()}>
      {label && <label className="text-sm font-semibold">{label}</label>}
      <button
        className={`
                    ${showOptions ? 'border-brand-light-blue' : ''}
                    ${value === placeholder ? 'text-light-gray' : ''}
                    appearance-none relative block w-full px-2 py-3 border border-gray-200 placeholder-gray-400 rounded text-gray-900 sm:text-sm
                    w-full focus:outline-none items-center inline-flex justify-between mt-2`}
        onClick={() => setShowOptions(!showOptions)}>
        <div className="pl-1 text-xs font-semibold">{placeholder}</div>
        <img src={DownChevron} alt="Down Arrow" className="px-3" />
      </button>
      <div
        className={`${
          !showOptions ? 'hidden' : ''
        } border-1 overflow-y-auto overflow-hidden w-full absolute z-50 bg-white max-h-80 mt-0.5`}>
        {optionsArray()}
      </div>
    </div>
  );
};

export default Select;
