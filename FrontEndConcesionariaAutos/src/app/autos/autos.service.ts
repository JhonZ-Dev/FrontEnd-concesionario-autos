import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Autos } from './autos';
import { Modelos } from '../ver-modelos/modelos';
import { MarcasModelo } from '../ver-modelos/marcas-modelo';
import { ColorModelo } from '../ver-modelos/color-modelo';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private url:string ="http://localhost:8080/autos"
  private urlApi="http://localhost:8080/modelo-auto"
  private urlMarca="http://localhost:8080/marcas"
  private urlColor="http://localhost:8080/color"


  constructor( private http:HttpClient) { }

  nuevoauto(auto:Autos):Observable<Autos>{
    return this.http.post<Autos>(this.url+'/guardarNuevoAuto',auto)
  }

  getListaModelos(): Observable<Modelos[]> {
    return this.http.get<Modelos[]>(this.urlApi+'/traer-todos');
  }
  getMarcas(): Observable<MarcasModelo[]> {
    return this.http.get<MarcasModelo[]>(this.urlMarca+'/traerMarcas');
  }
  getColor(): Observable<ColorModelo[]> {
    return this.http.get<ColorModelo[]>(this.urlColor+'/traerColor');
  }

  getListaAutosDetalles():Observable<Autos[]>{
    return this.http.get<Autos[]>(this.url+'/g')
  }
  getAutos(){
    return new Promise(resolve =>{
      this.http.get(this.url+'/g').subscribe({
        next:(data)=>{
          resolve(data);

        },
        error(err){
          console.log(err);
        }
      })
    })
  }

  get(placa:string):Observable<Autos>{
    return this.http.get<Autos>(this.url+'/autosPorPlaca/'+placa)
  }

  update(auto: Autos): Observable<Autos> {
    const url = `${this.url}/update/${auto.placa}`;
    return this.http.put<Autos>(url, auto);
  }


           /**Eliminar  */
  delete(placa:string):Observable<Autos>{
    return this.http.delete<Autos>(this.url+'/eliminar/'+placa)
  }
  
}
