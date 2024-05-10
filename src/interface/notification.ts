export interface ToastData {
  status: 'success' | 'error';
  message: string;
  show: boolean;
}

export interface ToastProps {
  status: 'success' | 'error';
  message: string;
  show: boolean;
}
