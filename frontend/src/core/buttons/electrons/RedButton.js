import React from 'react';
import DefaultButton from '@core/buttons/electrons/DefaultButton';

const RedButton = (props) => {
  return <DefaultButton bgColor="bg-red-500" bgColorHover="hover:bg-red-600" {...props} />;
};

export default RedButton;
