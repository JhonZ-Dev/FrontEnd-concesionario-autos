import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Modelos } from './modelos';
import { MarcasModelo } from './marcas-modelo';
import { ColorModelo } from './color-modelo';


@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  private urlApi="http://localhost:8080/modelo-auto"
  private url="http://localhost:8080/marcas"
  private urlColor="http://localhost:8080/color"



  constructor( private http:HttpClient) { }

  getListaModelos(): Observable<Modelos[]> {
    return this.http.get<Modelos[]>(this.urlApi+'/traer-todos');
  }

  createModelo(modelo:Modelos):Observable<Modelos>{
    return this.http.post<Modelos>(this.urlApi+'/guardarModelo',modelo)
  }

  getMarcas(): Observable<MarcasModelo[]> {
    return this.http.get<MarcasModelo[]>(this.url+'/traerMarcas');
  }
  createMarcas(marcas:MarcasModelo):Observable<MarcasModelo>{
    return this.http.post<MarcasModelo>(this.url+'/guardarMarca',marcas)
  }
  getColor(): Observable<ColorModelo[]> {
    return this.http.get<ColorModelo[]>(this.urlColor+'/traerColor');
  }
  createColor(color:ColorModelo):Observable<ColorModelo>{
    return this.http.post<ColorModelo>(this.urlColor+'/guardarColor',color)
  }
}
