import React from 'react';
import DefaultBadge from '@core/badges/DefaultBadge';

const GreenBadge = ({ text }) => {
  return <DefaultBadge text={text} bgColor="text-emerald-800" textColor="bg-emerald-100" />;
};

export default GreenBadge;
