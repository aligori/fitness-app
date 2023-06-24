import React from 'react';
const SearchInput = ({ onKeyUp, placeholder = 'Search by title/influencer', ...props }) => {
  return (
    <div {...props}>
      <div className="relative">
        <input
          className="block p-4 pl-8 border-1 border-gray-200 bg-white h-9 px-3 rounded-lg text-sm focus:ring-1 focus:ring-indigo-100 focus:outline-none w-full"
          type="text"
          name="search"
          placeholder={placeholder}
          onKeyUp={(e) => onKeyUp(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput