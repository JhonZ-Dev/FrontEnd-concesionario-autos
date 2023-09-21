import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Citas } from './citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private url = "http://localhost:8080/citas/guardar-cita"
  private url2 = "http://localhost:8080/citas/"

  constructor(private http: HttpClient) { }

  agregarCita(cita:any){
    return this.http.post(this.url, cita);

  }

  detalleCitas(){
    return new Promise(resolve =>{
      this.http.get(this.url2+'obtenerTodasCitas').subscribe({
        next:(data)=>{
          resolve(data);

        },
        error(err){
          console.log(err);
        }
      })
    })
  }

  actualizarCita(id: number, cita: any): Observable<any> {
    const url = `${this.url2}actualizar/${id}`;
    return this.http.put(url, cita);
  }

  get(idcitas: number): Observable<Citas> {
    console.log('Llamando a la función get en el servicio con idcitas:', idcitas);
    return this.http.get<Citas>(this.url2 + 'encontrar/' + idcitas);
  }

           /**Eliminar  */
  delete(idcitas:number):Observable<Citas>{
    return this.http.delete<Citas>(this.url2+'eliminar/'+idcitas)
  }

  getCitas(){
    return new Promise(resolve =>{
      this.http.get(this.url2+'obtenerTodasCitas').subscribe({
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
