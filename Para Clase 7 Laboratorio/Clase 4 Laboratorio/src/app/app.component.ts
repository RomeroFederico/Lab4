import { Component } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

export class Persona {
  // public nombre : string;
  // public email : string;
  // public edad : number;

  constructor(public nombre : string = "", public email : string = "", public edad : number = 0) {
    // this.nombre = nombre;
    // this.email = email;
    // this.edad = edad;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  log : boolean = true;

  form : Persona = new Persona();

  datos;

  personas : Array <Persona>;

  settings = {

    columns : {
      nombre : {
        title : "Nombre",
        editable : false,
        editor : {
          type : "textarea"
        }
      },
      edad : {
        title : "Edad"
      },
      email : {
        title : "Email"
      }
    },

    pager : {
      perPage : 2
    },

    noDataMessage : "No hay datos para mostrar.",

    actions : {
      edit : true,
      add : true,
      delete : true
    },

    edit : {
      editButtonContent : "Modificar",
      saveButtonContent : "Guardar",
      cancelButtonContent : "Cancelar",
      confirmSave : true
    }
  };

  constructor() 
  { 
    this.form.nombre = "mario";

    this.personas = [
    new Persona("Uno", "1@1.com", 1),
    new Persona("Dos", "2@2.com", 2),
    new Persona("Tres", "3@3.com", 3)
  ];
  }

  Subir()
  {
    console.log(event);
    console.log(this.form);

    this.log = false;

    this.personas.push(this.form);
    console.log(this.personas);
  }

  Editar($event)
  {
    console.log($event);
    $event.confirm.resolve($event.newData);
  }
}
