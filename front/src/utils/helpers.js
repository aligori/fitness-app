import toast from 'react-hot-toast';

export const showSuccess = (message = 'Success', timeout = 2000) => {
  toast(message, {
    id: 'success-toast',
    position: 'top-center',
    // icon: <CheckCircleIcon className="text-green-400 h-5" />,
    className:
      'text-xs sm:text-sm leading-5 font-medium text-indigo-500 lg:max-w-md 2xl:max-w-lg',
    duration: timeout
  });
};

export const showError = (error, timeout = 2000) => {
  toast(error, {
    id: 'error-toast',
    position: 'top-center',
    // icon: <XCircleIcon className="text-red-500 h-5" />,
    className:
      'text-xs sm:text-sm leading-5 font-medium text-indigo-500 lg:max-w-md 2xl:max-w-lg',
    duration: timeout
  });
};
