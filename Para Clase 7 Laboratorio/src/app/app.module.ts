import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { RouterModule, Routes } from "@angular/router";

import { DatosService } from './services/datos.service';
import { PruebaServiceService } from './prueba-service.service';

import { AppComponent } from './app.component';
import { PruebaMiscComponent } from './prueba-misc/prueba-misc.component';
import { TablaComponent } from './tabla/tabla.component';

const AppRoutes : Routes = [
  {path: 'prueba', component: PruebaMiscComponent},
  {path: 'tabla', component: TablaComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PruebaMiscComponent,
    TablaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2SmartTableModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [DatosService, PruebaServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
