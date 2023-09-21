import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string ="http://localhost:8080/usuarios"
  //reemplaza por tu URL:


  constructor(private http:HttpClient) { }

  //funcion para crear un usuario
  create(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.url+'/guardar',usuario)
  }

  getUsers(){
    return new Promise(resolve =>{
      this.http.get(this.url+'/obtenerUsuarios').subscribe({
        next:(data)=>{
          resolve(data);

        },
        error(err){
          console.log(err);
        }
      })
    })
  }

  update(usuario: Usuario): Observable<Usuario> {
    const url = `${this.url}/actualizar/${usuario.identificacion}`;
    return this.http.put<Usuario>(url, usuario);
  }
  actualizar(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(this.url +'/actualizar', usuario);
  }

  
  updateUsers(cedula: string, usuario: Usuario): Observable<any> {
    const url = `${this.url}/actualizar/${cedula}`;
    return this.http.post(url, usuario);
  }

  
    /*Usuario por id */
    getUserById(cedula: string): Observable<any> {
      return this.http.get(this.url + '/usuariosByIdentificacion/' + cedula);
    }

    
    /*Usuario por id */
    getUserByIdUsers(cedula: string){
      /**UTILIZAR UNA "PROMESA" PERMITE MAJEAR LA PROGRAMACION ASINCONA LO QUE PERMITE HACER TAREAS CONSULTAS POR VARIOS CLIENTE*/
      return new Promise(resolve =>{
        this.http.get(this.url +'usuariosByIdentificacion/' + cedula).subscribe({
          next: (data) => {
            resolve(data);
          },
          error(err) {
            console.log(err)
          }
        });
      });
    }
        /*Update usuario */
        updateUser(cedula: string, usuario: any){
          /**UTILIZAR UNA "PROMESA" PERMITE MAJEAR LA PROGRAMACION ASINCONA LO QUE PERMITE HACER TAREAS CONSULTAS POR VARIOS CLIENTE*/
          return new Promise(resolve =>{
            this.http.put(this.url +'actualizar/' + cedula, usuario).subscribe({
              next: (data) => {
                resolve(data);
              },
              error(err) {
                console.log(err)
              }
            });
          });
        }
        get(cedula:string):Observable<Usuario>{
          return this.http.get<Usuario>(this.url+'/usuariosByIdentificacion/'+cedula)
        }
  

         /**Eliminar  */
  delete(cedula:string):Observable<Usuario>{
    return this.http.delete<Usuario>(this.url+'/eliminar/'+cedula)
  }
  getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url+'/obtenerUsuarios')
  }

  eliminarUsuario(identificacion: string): Observable<void> {
    const url = `${this.url}/eliminar/${identificacion}`;
    return this.http.delete<void>(url);
  }

  verificarCorreoDuplicado(correo: string): Observable<boolean> {
    const url = `${this.url}/verificarCorreo/${correo}`; // Ajusta la URL según tu API
    return this.http.get<boolean>(url);
  }
  verificarTelefonoDuplicado(teledono: string): Observable<boolean> {
    const url = `${this.url}/verificarTelefono/${teledono}`; // Ajusta la URL según tu API
    return this.http.get<boolean>(url);
  }


}
