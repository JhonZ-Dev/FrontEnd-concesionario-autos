import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VentasService {
    private apiUrl = 'http://localhost:8080/ventas/insertar'; // Reemplaza esta URL con la URL de tu API
    private url = "http://localhost:8080/ventas/"


  constructor(private http: HttpClient) { }


   agregarVenta(nuevaVenta: any) {
    return this.http.post(this.apiUrl, nuevaVenta);
  }

  detalleVentas(){
    return new Promise(resolve =>{
      this.http.get(this.url+'obtenerTodo').subscribe({
        next:(data)=>{
          resolve(data);

        },
        error(err){
          console.log(err);
        }
      })
    })
  }
}
