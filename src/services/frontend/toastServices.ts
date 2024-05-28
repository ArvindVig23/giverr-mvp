import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const sweetAlertToast = (icon: any, title: any, timer = 3000) => {
  Toast.fire({
    icon: icon,
    title: title,
    timer: timer ? timer : icon === 'success' ? 1000 : 3000,
  });
};
