import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutosService } from '../autos.service';
import { Autos } from '../autos';
@Component({
  selector: 'app-auto-detalle',
  templateUrl: './auto-detalle.component.html',
  styleUrls: ['./auto-detalle.component.css']
})
export class AutoDetalleComponent implements OnInit{

  public autoDetalle:any;
  constructor(public autoService:AutosService,public router:Router){}
  ngOnInit(): void {
    this.cargarAutos();
    }

  cargarAutos(){
    this.autoService.getAutos().then(data=>this.autoDetalle=data)
    
  }
  delete(auto: Autos): void {
    console.log("Eliminado");
    this.autoService.delete(auto.modelo).subscribe(
      () => {
        this.autoService.getAutos().then(response => {
          this.autoDetalle = response;
        }).catch(error => {
          console.log(error);
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  


}
