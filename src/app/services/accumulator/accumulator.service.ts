import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AccumulatorService {

  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService) { }


    cargarAcumuladores(){
      let url = URL_SERVICIOS + '/accumulator';
      return this.http.get( url )
           .map( (resp: any) => {
            return resp.accumulator;
          });
    }
    obtenerAcumuladores( id: string ){
      let url = URL_SERVICIOS + '/accumulator/' + id;
      return this.http.get( url )
          .map( (resp: any ) => resp.accumulator);
    }
}
