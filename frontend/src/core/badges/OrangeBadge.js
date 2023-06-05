import React from 'react';
import DefaultBadge from '@core/badges/DefaultBadge';

const OrangeBadge = ({ text }) => {
  return <DefaultBadge text={text} bgColor="text-yellow-800" textColor="bg-yellow-100" />;
};

export default OrangeBadge;
