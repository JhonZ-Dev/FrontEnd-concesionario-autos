import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitasService } from './citas.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  nuevaCita: any = {};
 

  constructor(public citasService:CitasService,private alertService:AlertService, private route:Router){}

  characterCount = 0;

  countCharacters() {
    this.characterCount = this.nuevaCita.descripcion.length;
  }
  validarFechaFutura() {
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(this.nuevaCita.fecha_estimada);

    if (fechaSeleccionada < fechaActual) {
      // La fecha seleccionada es anterior a la fecha actual.
      // Puedes mostrar un mensaje de error o tomar alguna acción aquí.
      console.log('Por favor selecciona una fecha futura.');
      this.nuevaCita.fecha_estimada = null; // Reinicia la fecha seleccionada.
    }
  }
  agregarCita() {
    const correoRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;

    if (
      !this.nuevaCita.fecha_estimada ||
      !this.nuevaCita.hora_estimada ||
      !this.nuevaCita.descripcion ||
      !this.nuevaCita.correo ||
      !this.nuevaCita.identificacion
    ) {
      this.alertService.showErrorAlert(
        'Error',
        'Por favor completa todos los campos.'
      );
      return;
    }
    if (!correoRegex.test(this.nuevaCita.correo)) {
      this.alertService.showErrorAlert(
        'Error',
        'El correo debe tener formato de Gmail (correo@gmail.com).'
      );
      return;
    }
    if (this.nuevaCita.descripcion.length !== 80) {
      this.alertService.showErrorAlert(
        'Error',
        'La descripción debe tener exactamente 80 caracteres.'
      );
      return;
    }
    
  if (this.nuevaCita.identificacion.length > 10) {
    this.alertService.showErrorAlert(
      'Error',
      'La identificación debe tener máximo 10 caracteres.'
    );
    return;
  }  

    this.citasService.agregarCita(this.nuevaCita).subscribe(
      (respuesta) => {
        console.log('Cita agregada correctamente.');

        // Lógica adicional después de agregar la venta (por ejemplo, redireccionar, mostrar un mensaje, etc.).
        this.alertService.showSuccessAlert(
          'Éxito',
          'Cita agregada correctamente.'
        );

        // Puedes agregar aquí la lógica adicional que necesites después de una venta exitosa.
        this.route.navigate(['/detalle-cita']);
      },
      (error) => {
        console.error('Error al agregar la venta:', error);

        // Mostrar una alerta de error en caso de error en la solicitud.
        this.alertService.showErrorAlert(
          'Error',
          'No se pudo agregar la venta. Por favor, intenta nuevamente.'
        );
      }
    );
  }

}
