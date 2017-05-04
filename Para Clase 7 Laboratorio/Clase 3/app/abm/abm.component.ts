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
  selector: 'app-abm',
  templateUrl: './abm.component.html',
  styleUrls: ['./abm.component.css']
})
export class AbmComponent implements OnInit {

  usuario : Usuario = new Usuario();

  constructor() { }

  ngOnInit() {
  }
  
  Alta() : void
  {
    console.log("Nombre : " + this.usuario.nombre + " Email : " + this.usuario.email + " Password : " + this.usuario.password);
  }
}
