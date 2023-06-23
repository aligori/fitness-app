import React from 'react';
import Select from 'react-select';

const CSelectInput = ({
                        selectedOptionState,
                        options = [],
                        placeholder = 'Select...',
                        formatOptionLabel = false,
                        onChange = null,
                        maxHeight = "400px",
                        isClearable = false,
                        isDisabled = false,
                        label = null,
                        padding = '2px',
                        width,
                        error,
                        showErrorText,
                        ...props
                      }) => {
  const [selectedOption, setSelectedOption] = selectedOptionState;

  const styles = {
    control: (base) => ({
      ...base,
      fontSize: '14px',
      lineHeight: '20px',
      borderRadius: '7px',
      borderColor: error ? '#F87171' : '#E5E7EB',
      maxWidth: width || undefined,
      padding,
      '&:hover': {
        borderColor: '#8E8AFF',
        boxShadow: '0px 0px 2px #E5E7EB'
      }
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: '14px'
    }),
    menuList: (styles) => ({
      ...styles,
      maxHeight: maxHeight || null
    }),
    option: (styles, { isFocused, isSelected }) => {
      let backgroundColor = null;
      if (isSelected) {
        backgroundColor = '#C3C1F8';
      } else if (isFocused) {
        backgroundColor = '#E3E2FC';
      }
      return {
        ...styles,
        backgroundColor,
        color: 'black'
      };
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (onChange) {
      onChange();
    }
  };

  return (
    <div {...props} data-testid="core-select">
      {label && (
        <label className="w-full leading-5 font-medium text-sm mb-3 font-normal text-gray-700">
          {label}
        </label>
      )}
      <Select
        placeholder={placeholder}
        defaultValue={options[0]}
        closeMenuOnSelect
        formatOptionLabel={formatOptionLabel}
        options={options}
        styles={styles}
        onChange={handleChange}
        value={selectedOption}
        isClearable={isClearable}
      />
    </div>
  );
};

export default CSelectInput;
