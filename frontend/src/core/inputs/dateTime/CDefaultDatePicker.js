import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from '@core/dropdowns/Select';
import useDateOptions from '@hooks/useDateOptions';

const CDefaultDatePicker = ({ value, onChange, error, disabled, minDate, maxDate, ...props }) => {
  const { t } = useTranslation();
  const { days, months, years } = useDateOptions(value);

  const [day, setDay] = useState({ label: '', value: '' });
  const [month, setMonth] = useState({ label: '', value: '' });
  const [year, setYear] = useState({ label: '', value: '' });

  useEffect(() => {
    if (!value) {
      setDay({ label: '', value: '' });
      setMonth({ label: '', value: '' });
      setYear({ label: '', value: '' });
      return;
    }
    const date = new Date(value);
    const dateDay = days().find((day) => day.value === String(date.getDate()).padStart(2, '0'));
    const dateMonth = months().find(
      (month) => month.value === String(date.getMonth() + 1).padStart(2, '0')
    );
    const dateYear = years().find((year) => year.value === String(date.getFullYear()));
    setDay(dateDay);
    setMonth(dateMonth);
    setYear(!!dateYear ? dateYear : { label: '', value: '' });
  }, [value, days, months, years]);

  const handleMobileDateChange = (value, field) => {
    switch (field) {
      case 'day':
        setDay(value);
        if (!!month.value && !!year.value) {
          onChange(`${year.value}-${month.value}-${value.value}`);
        }
        return;
      case 'month':
        setMonth(value);
        if (!!day.value && !!year.value) {
          onChange(`${year.value}-${value.value}-${day.value}`);
        }
        return;
      case 'year':
        setYear(value);
        if (!!day.value && !!month.value) {
          onChange(`${value.value}-${month.value}-${day.value}`);
        }
        return;
      default:
        setDay(value);
        if (!!month.value && !!year.value) {
          onChange(`${year.value}-${month.value}-${value}`);
        }
    }
  };

  return (
    <div {...props}>
      <div className="md:hidden flex w-full">
        <Select
          className="w-22"
          onSelect={(value) => handleMobileDateChange(value, 'day')}
          placeholder={t('date.day')}
          options={days()}
          valueKey="value"
          labelKey="label"
          selected={day}
          disabled={disabled}
        />
        <Select
          className="w-22 mx-2"
          onSelect={(value) => handleMobileDateChange(value, 'month')}
          placeholder={t('date.month')}
          options={months()}
          valueKey="value"
          labelKey="label"
          selected={month}
          disabled={disabled}
        />
        <Select
          className="w-22"
          onSelect={(value) => handleMobileDateChange(value, 'year')}
          placeholder={t('date.year')}
          options={years()}
          valueKey="value"
          labelKey="label"
          selected={year}
          disabled={disabled}
          focusedOption={{ value: '2022', label: '2022' }}
        />
      </div>
      <input
        type="date"
        min={minDate}
        max={maxDate}
        className={`${
          error ? 'focus:ring-red-100 border-red-300' : ''
        } border-1 border-gray-200 shadow-sm rounded-md text-black w-full text-sm leading-5 font-normal px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100 webkit-none hidden md:block`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {error && <label className="text-xs text-red-500 pt-1 font-normal">{error}</label>}
    </div>
  );
};

export default CDefaultDatePicker;
