import { Component } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AlertService } from '../alert.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  nuevoUsuario:any={};
  usuario:Usuario = new Usuario;
  constructor(public usuarioService:UsuarioService, private route:Router,private alertService:AlertService){}

  agregarUsuario() {
    const correoRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const direccionRegex = /^[A-Za-z\s]+$/;

    if (
      !this.usuario.nombre ||
      !this.usuario.apellido ||
      !this.usuario.telefono ||
      !this.usuario.direccion ||
      !this.usuario.edad ||
      !this.usuario.identificacion ||
      !this.usuario.ciudad_residencia ||
      !this.usuario.correo
    ) {
      this.alertService.showErrorAlert(
        'Error',
        'Por favor completa todos los campos antes de guardar.'
      );
      return;
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

    if (
      !direccionRegex.test(this.usuario.direccion) ||
      !direccionRegex.test(this.usuario.ciudad_residencia)
    ) {
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

    // Verificación de correo electrónico duplicado
    this.usuarioService
    .verificarCorreoDuplicado(this.usuario.correo)
    .subscribe(
      (existeCorreo) => {
        if (existeCorreo) {
          this.alertService.showErrorAlert(
            'Error',
            'No se pudo agregar el usuario. Correo electrónico duplicado'
          );
        } else {
          // Verificación de teléfono duplicado
          this.usuarioService
            .verificarTelefonoDuplicado(this.usuario.telefono)
            .subscribe(
              (existeTelefono) => {
                if (existeTelefono) {
                  this.alertService.showErrorAlert(
                    'Error',
                    'No se pudo agregar el usuario. Teléfono duplicado'
                  );
                } else {
                  // Continuar con la lógica para guardar el usuario
                  const usuarioParaGuardar = {
                    nombre: this.usuario.nombre,
                    apellido: this.usuario.apellido,
                    telefono: this.usuario.telefono,
                    direccion: this.usuario.direccion,
                    edad: this.usuario.edad,
                    identificacion: this.usuario.identificacion,
                    ciudad_residencia: this.usuario.ciudad_residencia,
                    correo: this.usuario.correo
                  };

                  this.usuarioService.create(usuarioParaGuardar).subscribe(
                    (respuesta) => {
                      console.log('Usuario agregado');
                      this.alertService.showSuccessAlert(
                        'Éxito',
                        'Usuario agregado correctamente.',
                      );
                      this.route.navigate(['/detalles-usuarios'])
                    },
                    (error) => {
                      if (
                        error.status === 400 &&
                        error.error === 'Identificación duplicada'
                      ) {
                        console.error(
                          'La identificación ya está en uso. Por favor, elige una identificación diferente.'
                        );
                        this.alertService.showErrorAlert(
                          'Error',
                          'No se pudo agregar el usuario. Identificacion Duplicada'
                        );
                      } else {
                        console.error('Error al agregar el usuario:', error);
                      }
                    }
                  );
                }
              },
              (error) => {
                console.error('Error al verificar el teléfono:', error);
              }
            );
        }
      },
      (error) => {
        console.error('Error al verificar el correo:', error);
      }
    );
}

}
