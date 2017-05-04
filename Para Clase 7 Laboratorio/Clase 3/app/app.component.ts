import { Component } from '@angular/core';

export class Prueba {
  email: string;
  password: string;

  constructor(email : string = "", password : string = "") {
    this.email = email;
    this.password = password;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!!';

  // prueba : Prueba = new Prueba();

  // vector : Prueba[]= [new Prueba("a@a.com", "123"), new Prueba("b@b.com", "456"), new Prueba("c@c.com", "789")];

  // Agregar(): void {
  //   //console.log("Hola " + this.prueba.email);
  //   if (this.Validar())
  //   {
  //     this.vector.push(new Prueba(this.prueba.email, this.prueba.password));
  //     console.log("Usuario agregado: " + this.prueba.email);
  //     this.prueba = new Prueba();
  //   }
  //   else
  //     console.log("Datos no validos. ");
  // }

  // Validar(): Boolean{
  //   if (this.prueba.email.length < 6 || this.prueba.password.length < 6)
  //     return false;
  //   return true;
  // }
}
