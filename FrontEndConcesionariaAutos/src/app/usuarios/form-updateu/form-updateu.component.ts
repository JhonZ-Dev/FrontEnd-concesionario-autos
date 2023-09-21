import { Component, OnInit } from '@angular/core';
import { Usurio } from '../usurio';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { AlertService } from 'src/app/alert.service';

@Component({
  selector: 'app-form-updateu',
  templateUrl: './form-updateu.component.html',
  styleUrls: ['./form-updateu.component.css']
})
export class FormUpdateuComponent implements OnInit {

  usuario:any;
  public cedula: string;
  public nombre: string;
  public apellido: string;
  public telefono: string;
  public direccion: string;
  public correo: string;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService,private router:Router,
    private alertService:AlertService) {}

  ngOnInit(): void {
   
   this.cargar();
  }
  cargar():void{
    this.route.params.subscribe(
      e=>{
        let id=e['cedula'];
        if(id){
          this.usuarioService.get(id).subscribe(
            es=>this.usuario=es
          );
        }
         
      }
    );
  }
  update():void{
    const correoRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const direccionRegex = /^[A-Za-z\s]+$/;
    if (!this.usuario.nombre || !this.usuario.apellido 
      || !this.usuario.telefono || !this.usuario.direccion 
      || !this.usuario.edad || !this.usuario.identificacion ||!this.usuario.ciudad_residencia
      || !this.usuario.correo) {
      this.alertService.showErrorAlert('Error', 'Por favor completa todos los campos antes de guardar.');
      return; // Detener la ejecución del método si falta algún campo
    }
    if (!/^\d{10}$/.test(this.usuario.identificacion)) {
      this.alertService.showErrorAlert(
        'Error',
        'La identificación debe tener exactamente 10 dígitos numéricos.'
      );
      return;
    }
     
    if (!/^\d{10}$/.test(this.usuario.telefono)) {
      this.alertService.showErrorAlert(
        'Error',
        'El telefono debe tener exactamente 10 dígitos numéricos.'
      );
      return;
    }
    
    if (!direccionRegex.test(this.usuario.direccion)|| !direccionRegex.test(this.usuario.ciudad_residencia)) {
      this.alertService.showErrorAlert(
        'Error',
        'Solo se acepta texto (letras).'
      );
      return;
    }
    if (!correoRegex.test(this.usuario.correo)) {
      this.alertService.showErrorAlert(
        'Error',
        'El correo debe tener formato de Gmail (correo@gmail.com).'
      );
      return;
    }
    
    this.usuarioService.update(this.usuario).subscribe(
      
      res=>this.router.navigate(['/detalles-usuarios'])
      
    )
  }

  

}
