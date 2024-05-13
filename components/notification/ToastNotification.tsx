import { ToastProps } from '@/interface/notification';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast: React.FC<ToastProps> = ({ status, message, show }) => {
  React.useEffect(() => {
    if (show) {
      if (status === 'success') {
        toast.success(message, {
          position: 'top-right',
          autoClose: 3000,
        });
      } else if (status === 'error') {
        toast.error(message, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  }, [show, status, message]);

  return <ToastContainer limit={1} />;
};

export default Toast;
