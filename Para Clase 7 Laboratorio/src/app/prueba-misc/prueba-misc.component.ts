import { Component, OnInit } from '@angular/core';

import { PruebaServiceService } from '../prueba-service.service';

export class Persona
{
  constructor(public id : number = 1,
              public nombre : string = "nuevo",
              public apellido : string = "Nuevo",
              public email : string = "a@a.com",
              public color : string = 'red',
              public imagen : string = "img")
  {

  }
}

@Component({
  selector: 'app-prueba-misc',
  templateUrl: './prueba-misc.component.html',
  styleUrls: ['./prueba-misc.component.css']
})

export class PruebaMiscComponent implements OnInit {

  personas : Array<Persona>;

  persona : Persona = new Persona(0, "Nuevo Nombre", "Nuevo Apellido", "Nuevo@Mail.com", "orange", "no img");

  styleFila = {'color' : 'red'}; //Los estilos en ts.

  constructor(public servicio : PruebaServiceService) 
  { 
    this.personas = new Array<Persona>();
    // this.personas.push(new Persona());

    // var persona2 = new Persona();
    // persona2.color = 'blue';

    // this.personas.push(persona2);

    this.Cargar();
  }

  ngOnInit() {
  }

  Cargar()
  {
    this.servicio.TraerDatos()
      .then(
        data => {
          console.log(data);
          console.log("Exito al traer los usuarios");

          this.personas = data;
          console.log(this.personas);
        }
      )
      .catch(e => {
        console.log("error");
      })
  }

  AgregarUsuario()
  {
    this.persona.id = this.personas[this.personas.length - 1].id + 1;
    
    var nuevaPersona = new Persona(); // No utilizo la misma referencia ya que si no en el array se va a modificar cada vez que agrege un nuevo registro.
    nuevaPersona.id = this.personas[this.personas.length - 1].id + 1;
    nuevaPersona.nombre = this.persona.nombre;
    nuevaPersona.apellido = this.persona.apellido;
    nuevaPersona.email = this.persona.email;
    nuevaPersona.color = this.persona.color;
    nuevaPersona.imagen = null;
    
    this.personas.push(nuevaPersona);
  }

}
