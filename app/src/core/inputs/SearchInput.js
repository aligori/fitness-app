import React from 'react';

const SearchInput = ({ onKeyUp, placeholder }) => {
  return (
    <input
      className="border-1 h-9 px-3 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 focus:bg-white focus:border-gray-300 focus:shadow-md focus:outline-1 focus:ring-primary-200 focus:outline-none w-60"
      placeholder={placeholder}
      onKeyUp={(e) => onKeyUp(e.target.value)}
    />
  );
};

export default SearchInput;
