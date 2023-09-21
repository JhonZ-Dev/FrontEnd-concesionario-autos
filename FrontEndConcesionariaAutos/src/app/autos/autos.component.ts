import { Component, OnInit } from '@angular/core';
import { Autos } from './autos';
import { Router } from '@angular/router';
import { AutosService } from './autos.service';
import { ModeloAuto } from './modelo-auto';
import { Modelos } from '../ver-modelos/modelos';
import { MarcasModelo } from '../ver-modelos/marcas-modelo';
import { ColorModelo } from '../ver-modelos/color-modelo';
import { forkJoin } from 'rxjs';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  nuevoAuto:any={};
  autos:Autos= new Autos;
  modelos:Modelos[]=[];
  marcas:MarcasModelo[]=[];
  colores:ColorModelo[]=[];
  autoSeleccionado: any = {}; // Usar any temporalmente, ajustar a la estructura correcta de Autos
  marcaSeleccionada:any={};
  colorSeleccionado:any={};
  placa:number;
  anio:string;
  modelo:string;
  marca:string;
  color:string;
  constructor(private route:Router, public autoServicio:AutosService, private alertService:AlertService){}

  ngOnInit(): void {
    const modelos$ = this.autoServicio.getListaModelos();
    const marcas$ = this.autoServicio.getMarcas();
    const colores$ = this.autoServicio.getColor();
  
    forkJoin([modelos$, marcas$, colores$]).subscribe(
      ([modelos, marcas, colores]) => {
        this.modelos = modelos;
        this.marcas = marcas; // Supongamos que tienes una propiedad llamada 'marcas'
        this.colores = colores; // Supongamos que tienes una propiedad llamada 'colores'
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );
  }
  
  guardarAuto() {
    if (!this.autoSeleccionado.modelo || !this.marcaSeleccionada.marca || !this.colorSeleccionado.color || !this.autos.anio || !this.autos.placa) {
      this.alertService.showErrorAlert('Error', 'Por favor completa todos los campos antes de guardar.');
      return; // Detener la ejecución del método si falta algún campo
    }
    if (isNaN(Number(this.autos.anio))) {
      this.alertService.showErrorAlert('Error', 'El campo Año debe ser un número válido.');
      return; // Detener la ejecución del método si el año no es un número
    }
  
    const autoGuardar = {

      placa: this.autos.placa,
      modelo: this.autoSeleccionado.modelo, // Aquí debes usar autoSeleccionado
      marca: this.marcaSeleccionada.marca,
      anio: this.autos.anio,
      color: this.colorSeleccionado.color
    };
  
    this.autoServicio.nuevoauto(autoGuardar).subscribe(
      (respuesta) => {
        console.log("Auto agregado");
        this.alertService.showSuccessAlert('Éxito', 'Auto agregado correctamente.');
        this.route.navigate(['/detalle-autos']);


      },
      (error) => {
        if (error.status === 400 && error.error === 'Placa duplicada') {
          console.error("La placa ya está en uso. Por favor, elige una identificación diferente.");
          this.alertService.showErrorAlert('Error', 'La placa ya está en uso. Por favor, elige una identificación diferente.');

        } else {
          console.error("Error al agregar el Auto:", error);
          this.alertService.showErrorAlert('Error', 'Error al agregar el Auto: ' + error.message);

        }
      }
    );
  }
  


}
