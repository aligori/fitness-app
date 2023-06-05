import React from 'react';

const Input = (props) => {
  const { id, label, placeholder, handleInputChange, error, onFocus, value } = props;
  return (
    <div>
      <label
        className={`w-full font-inter text-base font-normal ${
          error ? 'text-red-400' : 'text-darkest-gray'
        }`}
        htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        autoComplete="off"
        className={`caret-brand-light-blue placeholder-light-gray
                    appearance-none bg-transparent border-b-1
                    w-full text-gray-700 text-base mr-3 pt-2
                    pb-1 leading-tight focus:outline-none
                    resize-none focus:border-brand-light-blue
                    ${error && 'border-red-400'}
                    `}
        rows="4"
        onChange={(e) => handleInputChange(e.target.value)}
        onClick={onFocus}
        value={value}
        placeholder={placeholder}
        aria-label={label}
      />
      <div className={`text-xs text-red-400 pt-2 ${error ? '' : 'pb-4'}`}>
        {error ? error.message : ''}
      </div>
    </div>
  );
};

export default Input;
