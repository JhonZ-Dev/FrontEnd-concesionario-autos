import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentasService } from '../ventas.service';


@Component({
  selector: 'app-detalles-ventas',
  templateUrl: './detalles-ventas.component.html',
  styleUrls: ['./detalles-ventas.component.css']
})
export class DetallesVentasComponent implements OnInit{
  public detalleVentas:any;

  constructor(public ventasService:VentasService,public router:Router){}

  ngOnInit(): void {
    this.cargarVentasDetalle();
    
  }

  //funcion para traer el detalle ventas
  cargarVentasDetalle(){
    this.ventasService.detalleVentas().then(data=>this.detalleVentas=data)
  }




}
