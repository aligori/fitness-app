import React from 'react';
import DefaultButton from '@core/buttons/electrons/DefaultButton';

const GreenButton = (props) => {
  return <DefaultButton bgColor="bg-emerald-500" bgColorHover="hover:bg-emerald-600" {...props} />;
};

export default GreenButton;
