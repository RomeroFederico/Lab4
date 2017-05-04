import { Component, OnInit } from '@angular/core';

export class Usuario {
  nombre: string;
  email: string;
  password: string;

  constructor(nombre : string = "", email : string = "", password : string = "") {
    this.email = email;
    this.password = password;
    this.nombre = nombre;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : Usuario = new Usuario();

  constructor() { }

  ngOnInit() {
  }
  
  Login() : void
  {
    console.log("Login --> Email : " + this.usuario.email + " Password : " + this.usuario.password);
  }

}
