import { Component, OnInit } from '@angular/core';
import { ModeloService } from './modelo.service';
import { Modelos } from './modelos';
import { forkJoin } from 'rxjs';
import { MarcasModelo } from './marcas-modelo';
import { ColorModelo } from './color-modelo';
import { AlertService } from '../alert.service';


@Component({
  selector: 'app-ver-modelos',
  templateUrl: './ver-modelos.component.html',
  styleUrls: ['./ver-modelos.component.css']
})
export class VerModelosComponent implements OnInit {
  modeloSeleccionado: Modelos | null = null;
  marcaSeleccionada: MarcasModelo | null = null;
  colorSeleccionado:ColorModelo | null =null;
  modelos: Modelos[]=[];
  modelo:Modelos = new Modelos;
  marcas:MarcasModelo[]=[];
  marca:MarcasModelo=new MarcasModelo;
  colores:ColorModelo[]=[];
  color:ColorModelo = new ColorModelo;
  mostrarFormulario = false;
  mostrarFormularioMarca = false;
  mostrarFormularioColor=false;

  
  mostrarFormularioParaModelo(modelo: Modelos): void {
    this.mostrarFormulario = true;
    this.modeloSeleccionado = modelo;
  }
  mostrarFormularioParaMarca(marcas: MarcasModelo): void {
    this.mostrarFormularioMarca = true;
    this.marcaSeleccionada = marcas;
  }
  mostrarFormularioParaColor(color:ColorModelo):void{
    this.mostrarFormularioColor=true;
    this.colorSeleccionado=color;

  }
  constructor(private modeloService: ModeloService, private alertService:AlertService) { }


  ngOnInit(): void {
    const modelos$ = this.modeloService.getListaModelos();
    const marcas$ = this.modeloService.getMarcas();
    const colores$ = this.modeloService.getColor();
  
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

  agregarModelo(){
    const modeloRegex = /^[A-Za-z\s]+$/;


    if(!this.modelo.modelo){
      this.alertService.showErrorAlert(
        'Error',
        'Por favor completa todos los campos antes de guardar.'
      );
      return;
    }
    if (this.modelo.modelo.length < 10) {
      this.alertService.showErrorAlert(
        'Error',
        'El modelo debe contener mas de 10 caracteres'
      );
      return;
    }
    if (!modeloRegex.test(this.modelo.modelo)) {
      this.alertService.showErrorAlert(
        'Error',
        'El modelo debe contener solo letras.'
      );
      return;
    }
  
    const modeloAutoGuardar ={
      modelo :this.modelo.modelo
    };
    this.modeloService.createModelo(modeloAutoGuardar).subscribe(
      (respuesta) => {
        console.log("Modelo agregado");
        // Después de agregar el modelo, cierra el formulario
       this.mostrarFormulario = false;
      },
      (error) => {
        if (error.status === 400 && error.error === 'Modelo duplicada') {
          console.error("El Modelo ya está en uso. Por favor, elige una modelo diferente.");
        } else {
          console.error("Error al agregar el modelo:", error);
        }
      }
    );
  }
  agregarMarca(){
    const marcaAutoGuardar ={
      marca :this.marca.marca
    };
    this.modeloService.createMarcas(marcaAutoGuardar).subscribe(
      (respuesta) => {
        console.log("Marca agregado");
        this.mostrarFormularioMarca = false;

      },
      (error) => {
        if (error.status === 400 && error.error === 'Modelo duplicada') {
          console.error("El Modelo ya está en uso. Por favor, elige una modelo diferente.");
        } else {
          console.error("Error al agregar el modelo:", error);
        }
      }
    );
  }

  agregarColor(){
    const colorAutoGuardar ={
      color :this.color.color
    };
    this.modeloService.createColor(colorAutoGuardar).subscribe(
      (respuesta) => {
        console.log("Color agregado");
        this.mostrarFormularioColor = false;

      },
      (error) => {
        if (error.status === 400 && error.error === 'Modelo duplicada') {
          console.error("El Modelo ya está en uso. Por favor, elige una modelo diferente.");
        } else {
          console.error("Error al agregar el modelo:", error);
        }
      }
    );
  }
  


}
