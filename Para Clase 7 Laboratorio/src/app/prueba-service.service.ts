import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PruebaServiceService {

  constructor(public http : Http) 
  { 

  }

  TraerDatos()
  {
    return this.http.get('http://www.mocky.io/v2/590a9430290000490023d843')
      .toPromise()
      .then(this.ExtraerData)
      .catch(this.LanzarError);
  }

  private ExtraerData(response : Response)
  {
    return response.json() || {}; // Si no hay nada, devuelve la otra opcion, tambien JSON.
  }

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
