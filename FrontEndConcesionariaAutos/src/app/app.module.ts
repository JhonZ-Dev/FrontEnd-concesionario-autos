import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VentasComponent } from './ventas/ventas.component';
import { VerModelosComponent } from './ver-modelos/ver-modelos.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    VentasComponent,
    VerModelosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
