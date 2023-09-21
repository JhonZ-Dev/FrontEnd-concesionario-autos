import { Component } from '@angular/core';
import { VentasService } from './ventas.service';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

  nuevaVenta: any = {};

  constructor(public ventasService:VentasService, private alertService:AlertService, private route:Router){}

  agregarVenta() {
    if (
      !this.nuevaVenta.identificacion ||
      !this.nuevaVenta.placa ||
      !this.nuevaVenta.precio ||
      !this.nuevaVenta.fecha_venta
    ) {
      this.alertService.showErrorAlert(
        'Error',
        'Por favor completa todos los campos.'
      );
      return;
    }

    this.ventasService.agregarVenta(this.nuevaVenta).subscribe(
      (respuesta) => {
        console.log('Venta agregada correctamente.');

        // Lógica adicional después de agregar la venta (por ejemplo, redireccionar, mostrar un mensaje, etc.).
        this.alertService.showSuccessAlert(
          'Éxito',
          'Venta agregada correctamente.'
        );

        // Puedes agregar aquí la lógica adicional que necesites después de una venta exitosa.
        this.route.navigate(['/detalle-ventas']);
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

  redirectoDetalle(){
    this.route.navigate(['/detalle-ventas']);
  }


}
