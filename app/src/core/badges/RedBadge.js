import React from 'react';
import DefaultBadge from '@core/badges/DefaultBadge';

const RedBadge = ({ text }) => {
  return <DefaultBadge text={text} bgColor="text-red-800" textColor="bg-red-100" />;
};

export default RedBadge;
