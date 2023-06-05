import React from 'react';
import CloseButton from '@core/buttons/atoms/CloseButton';
import { useTranslation } from 'react-i18next';

const BlankModal = ({
  show,
  onClose,
  children,
  title,
  icon,
  iconBg = 'bg-primary-100',
  maxWidth = 'xl',
  otherButtons = [],
  secondButton = [],
  width = 'sm:w-2/3'
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`fixed z-40 inset-0 overflow-y-auto ${show ? '' : 'hidden'}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-${maxWidth} ${width}`}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex flex-col">
              <div className="mt-3 flex flex-col sm:flex-row text-center sm:mt-0 sm:text-left md:mr-12">
                <div
                  className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${iconBg} sm:mx-0 sm:h-10 sm:w-10`}>
                  {icon}
                </div>
                <div className="mt-3 flex-1 text-center sm:mt-0 sm:ml-4 sm:text-left md:mr-12">
                  {title && (
                    <h3 className="text-lg mt-1.5 leading-6 font-medium text-gray-900">{title}</h3>
                  )}
                </div>
              </div>
              <div className="mt-2 justify-center">{children}</div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
            <div>
              <CloseButton onClick={onClose} label={t('close')} />
            </div>
            {otherButtons.map((button) => (
              <div className="ml-2" key={button}>
                {button}{' '}
              </div>
            ))}
            {secondButton.map((button) => (
              <div className="ml-2" key={button}>
                {button}{' '}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlankModal;
