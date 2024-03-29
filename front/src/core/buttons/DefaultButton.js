import React from 'react';
import {Link} from 'react-router-dom';

const DefaultButton = ({
                         label,
                         link,
                         to,
                         onClick,
                         bgColor,
                         bgColorHover,
                         textColor,
                         disabled = false,
                         xs = false,
                         sm = false,
                         width = 'flex w-full',
                         isLoading,
                         ...props
                       }) => {
  let sizingClasses = 'py-2 px-4 text-sm';
  if (xs) {
    sizingClasses = 'py-1.5 px-2 text-xs';
  }
  if (sm) {
    sizingClasses = 'py-2 px-3 text-xs';
  }

  const className = `group relative ${width} justify-center border border-transparent font-medium rounded-md ${
    textColor || 'text-white'
  } ${sizingClasses} 
  ${disabled ? 'bg-gray-400' : bgColor || 'bg-indigo-600'}  ${
    disabled ? '' : bgColorHover || 'hover:bg-indigo-900'
  } focus:outline-none transition duration-300`;

  if (link) {
    return (
      <Link disabled={disabled} to={to} className={className} {...props}>
        {label}
      </Link>
    );
  }

  return (
    <div {...props}>
      <button onClick={onClick} className={className} disabled={disabled}>
        {isLoading && (
          <div className="mr-1">
            <div
              style={{ borderTopColor: 'transparent' }}
              className="w-4 h-4 border-2 border-white border-dotted rounded-full animate-spin"
            />
          </div>
        )}
        {label}
      </button>
    </div>
  );
};

export default DefaultButton;
