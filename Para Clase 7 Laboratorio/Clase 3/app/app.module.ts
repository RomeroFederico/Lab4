import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AbmComponent } from './abm/abm.component';

const AppRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'ABM', component: AbmComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AbmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
