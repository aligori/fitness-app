import React from 'react';

const RowDetails = ({ value, label }) => {
  return (
    <div className="flex justify-between px-10 border-b mb-4">
      <div className="text-lg">{label}</div>
      <div className="text-lg">{value}</div>
    </div>
  );
};
export default RowDetails;
