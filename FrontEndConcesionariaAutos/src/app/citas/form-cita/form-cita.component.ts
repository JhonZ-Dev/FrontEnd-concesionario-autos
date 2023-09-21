import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CitasService } from '../citas.service';
import { AlertService } from 'src/app/alert.service';
@Component({
  selector: 'app-form-cita',
  templateUrl: './form-cita.component.html',
  styleUrls: ['./form-cita.component.css']
})
export class FormCitaComponent implements OnInit {
  citaForm: FormGroup;
  idcitas: number;
  cita:any;
  descripcion:string;
  nuevaCita:any;

  constructor(
    private route: ActivatedRoute,
    private citasService: CitasService,
    private alertService:AlertService,
    private router:Router
  ) {}

  characterCount = 0;
  countCharacters() {
    this.characterCount = this.cita.descripcion.length;
  }
  ngOnInit(): void {
    this.cargar();
  }
  cargar(): void {
    this.route.params.subscribe(
      params => {
        this.idcitas = params['idcitas']; // Asignar el valor de idcitas desde los parámetros de la ruta
        if (this.idcitas) {
          this.citasService.get(this.idcitas).subscribe(
            cita => {
              this.cita = cita;
            }
          );
        }
      }
    );
  }
  

  actualizarCita() {
    const correoRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    if (
      !this.cita.fecha_estimada ||
      !this.cita.hora_estimada ||
      !this.cita.descripcion ||
      !this.cita.correo ||
      !this.cita.identificacion
    ) {
      this.alertService.showErrorAlert(
        'Error',
        'Por favor completa todos los campos.'
      );
      return;
    }
    if (!correoRegex.test(this.cita.correo)) {
      this.alertService.showErrorAlert(
        'Error',
        'El correo debe tener formato de Gmail (correo@gmail.com).'
      );
      return;
    }
    if (this.cita.descripcion.length !== 80) {
      this.alertService.showErrorAlert(
        'Error',
        'La descripción debe tener exactamente 80 caracteres.'
      );
      return;
    }
    
  if (this.cita.identificacion.length > 10) {
    this.alertService.showErrorAlert(
      'Error',
      'La identificación debe tener máximo 10 caracteres.'
    );
    return;
  }  

    this.citasService.actualizarCita(this.idcitas, this.cita).subscribe(
      () => {
        // La cita se actualizó exitosamente, realiza las acciones necesarias
          // Lógica adicional después de agregar la venta (por ejemplo, redireccionar, mostrar un mensaje, etc.).
          this.alertService.showSuccessAlert(
            'Éxito',
            'Cita agregada correctamente.'
          );
  
          // Puedes agregar aquí la lógica adicional que necesites después de una venta exitosa.
          this.router.navigate(['/detalle-cita']);
      },
      (error) => {
        console.error('Error al actualizar la cita:', error);
        
      }
    );
  }


  validarFechaFutura() {
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(this.cita.fecha_estimada);

    if (fechaSeleccionada < fechaActual) {
      // La fecha seleccionada es anterior a la fecha actual.
      // Puedes mostrar un mensaje de error o tomar alguna acción aquí.
      console.log('Por favor selecciona una fecha futura.');
      this.cita.fecha_estimada = null; // Reinicia la fecha seleccionada.
    }
  }

}
