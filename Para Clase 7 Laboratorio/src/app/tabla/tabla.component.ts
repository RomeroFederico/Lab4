import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';

import { DatosService } from '../services/datos.service';

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
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  log : boolean = true;

  form : Persona = new Persona();

  datos;

  source : LocalDataSource = new LocalDataSource();

  settings = {

    columns : {
        nombre : {
        title : "Nombre",
        editor : {
          type : "textarea"
        }
      },
      email : {
        title : "E-mail"
      },
      password : {
        title : "Password"
      },
      id : {
        title : "ID",
        editable : false
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
    },

    delete : {
      deleteButtonContent : "Eliminar",
      confirmDelete : true
    },

    add: {
      addButtonContent : "Agregar",
      createButtonContent : "Crear",
      cancelButtonContent : "Cancelar",
      confirmCreate : true 
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

  ngOnInit() {
  }

  Cargar()
  {
    this.datosService.TraerDatos()
      .then(
        data => {
          console.log(data);
          console.log("Exito al traer los usuarios");  
          
          this.source.load(data);
          console.log(this.source.count());
        }
      )
      .catch(e => {
        console.log("error");
      })
  }

  //Agregar con confirmacion
  Agregar($event)
  {
    console.log($event.newData); // Si deseo agregar en la base de datos utilizo este registro.
    var objAModificar = $event.newData;

    //Deberia hacerse en modificar tambien.
    if (objAModificar.nombre.length == 0 || objAModificar.email.length == 0 || objAModificar.password.length == 0)
    {
      console.log("Datos invalidos");
      $event.confirm.reject();
    }
    else
      $event.confirm.resolve($event.newData);

    this.AgregarRegistro(objAModificar);
  }

  //Editar con confirmacion.
  Editar($event)
  {
    //$event.data contiene el dato viejo.
    console.log($event.newData); // Si deseo modificar la base de datos utilizo este registro.
    var objAModificar = $event.newData;
    $event.confirm.resolve($event.newData);

    this.ModificarRegistro(objAModificar);
  }

  //Eliminar con confirmacion.
  Eliminar($event)
  {
    console.log($event);
    //console.log($event.data); // Si deseo modificar la base de datos utilizo este registro, su id.

    var idEliminar = $event.data.id;

    if (confirm("Desea eliminar el registro " + $event.data.nombre))
    {
      $event.confirm.resolve();
      this.EliminarRegistro(idEliminar);
    }
    else
      $event.confirm.reject();
  }

  AgregarRegistro(registro)
  {
    this.datosService.AgregarDatos(registro)
      .then(
        data => {
          if (data.exito)
          {
            console.log("Exito al agregar!!!");
            console.log(data.usuario);
            this.Cargar();
          }
          else
            console.log("Error al registrar");
        }
      )
      .catch(e => {
        console.log("Error");
        this.Cargar();
      })
  }

  ModificarRegistro(registro)
  {
    this.datosService.ModificarDatos(registro)
      .then(
        data => {
          if (data == false)
            console.log("Ocurrio un error al querer modificar");
          else
          {
            console.log("Exito al modificar!!!");
            this.Cargar();
          }
        }
      )
      .catch(e => {
        console.log("Error");
        this.Cargar();
      })
  }

  EliminarRegistro(id)
  {
    this.datosService.EliminarDato(id)
      .then(
        data => {
          if (data == false)
            console.log("Ocurrio un error al querer eliminar");
          else
          {
            console.log("Exito al eliminar!!!");
            this.Cargar();
          }
        }
      )
      .catch(e => {
        console.log("Error");
        this.Cargar();
      })
  }

}
