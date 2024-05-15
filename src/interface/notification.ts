export interface ToastData {
  status: 'success' | 'error';
  message: string;
  show: boolean;
}

export interface ToastProps {
  toastData: ToastData;
  setToastData?: any;
}

export interface OptionalToastProp {
  toastData?: ToastData;
  setToastData?: any;
}
