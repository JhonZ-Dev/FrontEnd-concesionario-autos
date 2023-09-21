import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutosService } from '../autos.service';
import { ColorModelo } from 'src/app/ver-modelos/color-modelo';
import { Modelos } from 'src/app/ver-modelos/modelos';
import { MarcasModelo } from 'src/app/ver-modelos/marcas-modelo';
import { Autos } from '../autos';
import { forkJoin } from 'rxjs';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-update-auto',
  templateUrl: './update-auto.component.html',
  styleUrls: ['./update-auto.component.css']
})
export class UpdateAutoComponent implements OnInit{
  auto:any;
   placa:string;
   modelo:string;
   marca:string;
   anio:string;
   color:string;
  autos:Autos= new Autos;
  modelos:Modelos[]=[];
  marcas:MarcasModelo[]=[];
  colores:ColorModelo[]=[];
  autoSeleccionado: any = {}; // Usar any temporalmente, ajustar a la estructura correcta de Autos
  marcaSeleccionada:any={};
  colorSeleccionado:any={};

  constructor(private route: ActivatedRoute,private router:Router, private autoServicio:AutosService,
    private alertService:AlertService){}


  ngOnInit(): void {
    this.cargar();
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

  cargar():void{
    this.route.params.subscribe(
      e=>{
        let id=e['placa'];
        if(id){
          this.autoServicio.get(id).subscribe(
            es=>this.auto=es
          );
        }
         
      }
    );
  }

  update():void{
   
    this.autoServicio.update(this.auto).subscribe(
      res=>this.router.navigate(['/detalle-autos'])
    )
  }

}
