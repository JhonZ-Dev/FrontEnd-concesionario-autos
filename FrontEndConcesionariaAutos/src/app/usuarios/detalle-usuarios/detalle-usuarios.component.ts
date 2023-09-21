import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usurio } from '../usurio';


@Component({
  selector: 'app-detalle-usuarios',
  templateUrl: './detalle-usuarios.component.html',
  styleUrls: ['./detalle-usuarios.component.css']
})
export class DetalleUsuariosComponent implements OnInit{
  public usuarioDetails:any;
  public filteredUsuarios: any[]; // Nuevo arreglo para datos filtrados

  constructor(public usuarioService:UsuarioService,public router:Router){}


  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(){
    this.usuarioService.getUsers().then(data=>this.usuarioDetails=data)
  }

  delete(usuario:Usurio):void{
    console.log("Eliminado");
    this.usuarioService.delete(usuario.identificacion).subscribe(
      res => this.usuarioService.getAll().subscribe(
       response=> this.usuarioDetails=response
      )
    )
  }
  eliminarUsuario(identificacion: string): void {
    this.usuarioService.eliminarUsuario(identificacion).subscribe(
      () => {
        console.log('Usuario eliminado correctamente');
        // Puedes redirigir a la lista de usuarios u otra página
        this.router.navigate(['/usuarios']);
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }

  

}
