import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showSuccessAlert(title: string, message: string) {
    Swal.fire({
      icon: 'success',
      title,
      text: message,
    });
  }

  showErrorAlert(title: string, message: string) {
    Swal.fire({
      icon: 'error',
      title,
      text: message,
    });
  }

  showConfirmationAlert(title: string, message: string) {
    return Swal.fire({
      icon: 'question',
      title,
      text: message,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    });
  }
}
