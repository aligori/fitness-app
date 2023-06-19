import React from 'react';

const Tabs = ({
                selectedOptionState,
                options = [],

                textSize = 'text-sm',
                ...props
}) => {
  const [selectedOption, setSelectedOption] = selectedOptionState;

  return (
    <div data-testid="tab-radio-buttons" {...props}>
      <div className={`flex items-center text-gray-700 px-1 ${textSize} border rounded-lg h-9`}>
        {options.map((option) => (
          <span
            key={option}
            data-testid={`tab-${option}`}
            className={`text-center flex-1 rounded-md cursor-pointer p-1 mr-1 last:mr-0
            ${selectedOption === option ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-50'}`}
            onClick={() => setSelectedOption(option)}>
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
