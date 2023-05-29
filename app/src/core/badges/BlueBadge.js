import React from 'react';
import DefaultBadge from '@core/badges/DefaultBadge';

const BlueBadge = ({ text }) => {
  return <DefaultBadge text={text} bgColor="text-blue-800" textColor="bg-blue-100" />;
};

export default BlueBadge;
