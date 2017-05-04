import { Component } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';

import { DatosService } from './services/datos.service';

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

  source : LocalDataSource = new LocalDataSource();

  //personas : Array <Persona>;

  personas : any;

  settings = {

    columns : {
      // nombre : {
      //   title : "Nombre",
      //   editable : false,
      //   editor : {
      //     type : "textarea"
      //   }
      // },
      // edad : {
      //   title : "Edad"
      // },
      // email : {
      //   title : "Email"
      // }
      nombre : {
        title : "nombre",
        editable : false,
        editor : {
          type : "textarea"
        }
      },
      puntaje : {
        title : "puntaje"
      },
      partidasJugadas : {
        title : "partidas jugadas"
      },
      respCorrectas : {
        title : "respuestas correctas"
      },
      respIncorrectas : {
        title : "respuestas incorrectas"
      },
      imagen : {
        title : "imagen"
      },
      idJugador : {
        title : "id Jugador"
      }
    },

    pager : {
      perPage : 10
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

  constructor(public datosService : DatosService) 
  {
    this.source = new LocalDataSource();

    this.form.nombre = "mario";

    // this.personas = [
    // new Persona("Uno", "1@1.com", 1),
    // new Persona("Dos", "2@2.com", 2),
    // new Persona("Tres", "3@3.com", 3)
    // ];

    //console.log(this.datosService.TraerDatos());

    this.Cargar();
  }

  Cargar()
  {
    this.datosService.TraerDatos()
      .then(
        data => {
          console.log(data);
          console.log("Correcto");  
          
          this.source.load(data);
          console.log(this.source.count());
        }
      )
      .catch(e => {
        console.log("error");
      })
  }

  Subir()
  {
    this.datosService.SubirDatos({nombre : this.form.nombre})
      .then(
        data => {
          console.log("Exito : " + data.exito);

          if (data.exito)
          {
            this.Cargar()
          }
          else
            console.log(data.mensaje);

          // console.log("Correcto");  
          
          // this.source.load(data);
          // console.log(this.source.count());
        }
      )
      .catch(e => {
        console.log("Error");
      })
  }

  Editar($event)
  {
    console.log($event.newData);
    console.log($event.data);
    $event.confirm.resolve($event.newData);
    alert(12);
  }
}
