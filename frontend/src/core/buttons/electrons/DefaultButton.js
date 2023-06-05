import React from 'react';
import { Link } from 'react-router-dom';

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
  ...props
}) => {
  let sizingClasses = 'py-2 px-4 text-sm';
  if (xs) {
    sizingClasses = 'py-1 px-2 text-xs';
  }
  if (sm) {
    sizingClasses = 'py-2 px-3 text-xs';
  }

  const className = `group relative ${width} justify-center border border-transparent font-medium rounded-md ${
    textColor || 'text-white'
  } ${sizingClasses} 
  ${disabled ? 'bg-gray-400' : bgColor || 'bg-indigo-800'}  ${
    disabled ? '' : bgColorHover || 'hover:bg-indigo-900'
  } focus:outline-none`;

  if (link) {
    // TODO: check disabled prop on link
    return (
      <Link disabled={disabled} to={to} className={className} {...props}>
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className} disabled={disabled} {...props}>
      {label}
    </button>
  );
};

export default DefaultButton;
