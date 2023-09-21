import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitasService } from '../citas.service';
import { Citas } from '../citas';


@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent implements OnInit {
  public detalleCita:any;

  constructor(public citasService:CitasService, private route:Router){}
  ngOnInit(): void {
    this.cargarCitas();
  }

    //funcion para traer el detalle ventas
    cargarCitas(){
      this.citasService.detalleCitas().then(data=>this.detalleCita=data)
    }

    delete(cita: Citas): void {
      console.log("Eliminado");
      this.citasService.delete(cita.idcitas).subscribe(
        () => {
          this.citasService.getCitas().then(response => {
            this.detalleCita = response;
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
