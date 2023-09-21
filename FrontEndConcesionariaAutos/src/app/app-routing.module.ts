import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VentasComponent } from './ventas/ventas.component';
import { VerModelosComponent } from './ver-modelos/ver-modelos.component';

const routes: Routes = [
  //ruta principal
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'usuarios', component:UsuariosComponent},
  
  {path:'ventas', component:VentasComponent},
  {path:'modelos',component:VerModelosComponent},
  {path:'nueva-cita',component:VentasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
