import Swal from 'sweetalert2';

export function spinner(mensaje: string = "Cargando...", options: any = {}) {
    Swal.fire({
      toast: options?.toast ?? false,
      position: options?.position ?? 'center',
      html: mensaje,
      backdrop: options?.backdrop ?? true,
      allowEscapeKey: options?.escapeKey ?? false,
      allowOutsideClick: false,
      customClass: {
        ...(options?.customClass ?? {}),
      },
      width: 'auto',
      didOpen: (toast) => {
        Swal.showLoading();
      },
    });
  }