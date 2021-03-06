import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TriviaService {

  constructor(public http: Http) {
    console.log('Hello TriviaService Provider');
  }

  BuscarUsuario(nombre)
  {
    var body =  JSON.stringify(nombre);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
      .post('http://www.romerofederico.hol.es/slimTrivia/ws/administracion.php/login', body, { headers: headers })
      .map(response => response.json());
  }

  LeerUsuarios() {
    return this.http.get('http://www.romerofederico.hol.es/slimTrivia/ws/administracion.php/usuarios')
      .map(response => response.json());
  }

  AgregarUsuario(datosAgregar)
  {
    var body =  JSON.stringify(datosAgregar);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
      .post('http://www.romerofederico.hol.es/slimTrivia/ws/administracion.php/registro', body, { headers: headers })
      .map(response => response.json());
  }

  ModificarUsuario(datosModificar, idModificar)
  {
    var body =  JSON.stringify(datosModificar);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
      .put('http://www.romerofederico.hol.es/slimTrivia/ws/administracion.php/usuario/' + idModificar, body, { headers: headers })
      .map(response => response.json());
  }

  LeerPreguntas()
  {
    return this.http.get('http://www.romerofederico.hol.es/slimTrivia/ws/administracion.php/preguntas')
      .map(response => response.json());
  }

  LeerResultados()
  {
    return this.http.get('http://www.romerofederico.hol.es/slimTrivia/ws/administracion.php/resultados')
      .map(response => response.json());
  }

  LeerUltimoResultadoJugador(idJugador)
  {
    return this.http.get('http://www.romerofederico.hol.es/slimTrivia/ws/administracion.php/resultados/' + idJugador)
      .map(response => response.json());
  }

  GuardarResultados(datosAgregar)
  {
    var body =  JSON.stringify(datosAgregar);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http
      .post('http://www.romerofederico.hol.es/slimTrivia/ws/administracion.php/resultados/agregar' , body, { headers: headers })
      .map(response => response.json());
  }
}
