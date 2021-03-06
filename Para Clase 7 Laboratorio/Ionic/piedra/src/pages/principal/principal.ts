import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, FabContainer, ToastController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { InformacionPage } from '../informacion/informacion';
import { PartidasPage } from '../partidas/partidas';

import { Jugador } from '../login/login';

import { JuegoService } from '../../providers/juego-service';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
  providers: [ToastController]
})
export class PrincipalPage {

  jugador : Jugador;

  partida = {
    Victoria : 0,
    Empate : 0,
    Derrota : 0
  }

  //Logica Partida
  habilitar = {
  piedra :  true,
  papel : true,
  tijera : true,
  }

  habilitarCPU = {
  piedra :  true,
  papel : true,
  tijera : true,
  }

  jugadas = ["piedra", "papel", "tijera"];

  resultado : string = "";
  mostrarResultado : boolean = null;
  mostrarReiniciar1 : boolean = null;
  mostrarReiniciar2 : boolean = null;

  //Animacion y Estetica
  clsImagen : string = "animated pulse infinite";
  clsImagenCPU : string = "animated flip infinite";
  colorResultado : any;
  coloresParaResultados = {
    Derrota : {'color' : 'red'},
    Empate : {'color' : 'orange'},
    Victoria : {'color' : 'green'}
  }
  clsResultado : string;
  clsResultadoBoton : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl : AlertController, public toastCtrl : ToastController,
              public juegoService : JuegoService) 
  {
    this.jugador = navParams.get('Jugador');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  //Referente al Menu

  MostrarDatos(fab: FabContainer) : void 
  {
    fab.close();

    console.log("Mostrar Datos del Jugador");
    this.navCtrl.push(InformacionPage, {
      Jugador : this.jugador,
    });
  }

  MostrarResultados(fab: FabContainer) : void 
  {
    fab.close();

    console.log("Mostrar Resultados de Partidas");
    this.navCtrl.push(PartidasPage);
  }

  MostrarAbout(fab: FabContainer) : void 
  {
    fab.close();

    console.log("Mostrar About");
    this.navCtrl.push(AboutPage);
  }

  Logout(fab: FabContainer) : void
  {
    fab.close();

    let alert = this.alertCtrl.create({
      title: 'Cerrar Sesion...',
      message: '¿Desea Cerrar la Sesion?',
      buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('No se Cerro la Sesion.');
        }
      },
      {
        text: 'Ok',
        handler: () => {
          console.log('Cerrando Sesion.');
          this.navCtrl.setRoot(LoginPage, {}, {
          animate: true, 
          direction: "backward"
          });
        }
      }
    ]
    });
    alert.present();
  }

  //Referente al Juego

  Jugar(seleccion)
  {
    if (this.mostrarResultado)
      return;

    this.CambiarEstadoBotones();
    this.habilitar[seleccion] = true;
    this.clsImagen = "animated fadeOutUp infinite";
    this.clsImagenCPU = "animated fadeOutDown infinite";

    var eleccionCPU;
    
    eleccionCPU = Math.floor(Math.random() * (3 - 0)) + 0;
    this.CambiarEstadoBotonesCPU();
    this.habilitarCPU[this.jugadas[eleccionCPU]] = true;

    console.log(this.jugador.nombre + " jugo " + seleccion);
    console.log("CPU jugo " + this.jugadas[eleccionCPU])

    this.resultado = this.ObtenerResultado(seleccion, this.jugadas[eleccionCPU]);
    this.clsResultado = "animated zoomIn";
    this.clsResultadoBoton = "animated rotateIn infinite";
    this.mostrarResultado = true;
    this.colorResultado = this.coloresParaResultados[this.resultado];
    
    this.partida[this.resultado]++;

    //Modifico al Jugador.
    this.ModificarJugador(seleccion);

    //Guardo al jugador modificado y la partida.
    //Solo se mostrara la opcion de reiniciar la partida si se terminan ambos procesos.
    this.GuardarModificacionJugador();
    this.GuardarPartida();

    console.log(this.resultado);
  }

  CambiarEstadoBotones(estado = null)
  {
    this.habilitar.piedra = estado;
    this.habilitar.papel = estado;
    this.habilitar.tijera = estado;
  }

  CambiarEstadoBotonesCPU(estado = null)
  {
    this.habilitarCPU.piedra = estado;
    this.habilitarCPU.papel = estado;
    this.habilitarCPU.tijera = estado; 
  }

  ObtenerResultado(seleccion, eleccionCPU)
  {
    if (seleccion == "piedra")
    {
      this.jugador.jugPiedra++;

      if (eleccionCPU == "piedra")
        return "Empate";
      else if (eleccionCPU == "papel")
        return "Derrota";
      else
        return "Victoria";
    }
    else if (seleccion == "papel")
     {
      this.jugador.jugPapel++;

      if (eleccionCPU == "piedra")
        return "Victoria";
      else if (eleccionCPU == "papel")
        return "Empate";
      else
        return "Derrota";
     }
     else
     {
      this.jugador.jugTijera++;

      if (eleccionCPU == "piedra")
        return "Derrota";
      else if (eleccionCPU == "papel")
        return "Victoria";
      else
        return "Empate";
     }
  }

  ModificarJugador(seleccion)
  {
    if (this.resultado == "Victoria")
      this.jugador.partidasGanadas++;
    else if (this.resultado == "Empate")
      this.jugador.partidasEmpatadas++;
    else
      this.jugador.partidasPerdidas++;

    this.jugador.partidas++;
  }

  GuardarModificacionJugador()
  {
      this.juegoService.ModificarUsuario(this.jugador, this.jugador.idJugador)
      .subscribe(
        ok => {

          this.mostrarReiniciar1 = true;

          if (ok === false)
            this.MostrarMensaje("No se pudo guardar los datos del jugador", true);
        }, 
        error => 
        {
          this.mostrarReiniciar1 = true;
          this.MostrarMensaje("No se pudo guardar los datos del jugador", true);
          console.error('Error: ' + error);
        },
        () => console.log('Guardar Datos Jugador Completed!')
      );
  }

  GuardarPartida()
  {
    this.juegoService.GuardarResultados({
      idJugador : this.jugador.idJugador,
      estado : this.resultado
    })
      .subscribe(
        ok => {

          this.mostrarReiniciar2 = true;

          if (ok === false)
            this.MostrarMensaje("No se pudo guardar la partida", false);
        }, 
        error => 
        {
          this.mostrarReiniciar2 = true;
          this.MostrarMensaje("No se pudo guardar la partida", false);
          console.error('Error: ' + error);
        },
        () => console.log('Guardar Datos Partida Completed!')
      );
  }

  Reiniciar()
  {
    this.CambiarEstadoBotones(true);
    this.CambiarEstadoBotonesCPU(true);

    this.clsImagen = "animated pulse infinite";
    this.clsImagenCPU = "animated flip infinite";
    this.clsResultado = "";
    this.clsResultadoBoton = "";

    this.mostrarReiniciar1 = null;
    this.mostrarReiniciar2 = null;
    this.mostrarResultado = null;

    console.log("Nueva Partida");
  }

  MostrarMensaje(mensaje, posicionAbajo)
  {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 1000,
      position: posicionAbajo == true? 'bottom' : 'middle'
    });
    toast.present();
  }

}
