import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DatosService {

  constructor(public http : Http)
  { 

  }

  TraerDatos()
  {
    //promise -> then (funciona), catch(no funciona)
    return this.http.get('http://www.romerofederico.hol.es/slimTrivia/ws/administracion.php/usuarios')
      .toPromise()
      .then(this.ExtraerData)
      .catch(this.LanzarError);
  }

  SubirDatos(nombre)
  {
    var body =  JSON.stringify(nombre);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json'); 

    return this.http.post('http://www.romerofederico.hol.es/slimTrivia/ws/administracion.php/registro', body, { headers: headers })
      .toPromise()
      .then(this.ExtraerData)
      .catch(this.LanzarError);
  }

  private ExtraerData(response : Response)
  {
    return response.json() || {}; // Si no hay nada, devuelve la otra opcion, tambien JSON.
  }

  // private LanzarError(error : Response)
  // {
  //   return error;
  // }

  private LanzarError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Promise.reject(errMsg);
  }
}
