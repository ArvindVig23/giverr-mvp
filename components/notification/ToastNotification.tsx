import { ToastProps } from '@/interface/notification';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast: React.FC<ToastProps> = ({ toastData, setToastData }) => {
  const { status, message, show } = toastData;
  React.useEffect(() => {
    if (show) {
      if (status === 'success') {
        toast.success(message, {
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => {
          setToastData({
            status: 'success',
            message: '',
            show: false,
          });
        }, 2000);
      } else if (status === 'error') {
        toast.error(message, {
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => {
          setToastData({
            status: 'success',
            message: '',
            show: false,
          });
        }, 2000);
      }
    } // eslint-disable-next-line
  }, [show, status, message]);

  return <ToastContainer limit={1} />;
};

export default Toast;
