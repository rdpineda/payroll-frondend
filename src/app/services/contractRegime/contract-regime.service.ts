import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ContractRegimeService {

  constructor( public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarTipoRegimen(){
    let url = URL_SERVICIOS + '/contractRegime';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.contractRegime;
        });
  }
  obtenerTipoRegime( id: string ){
    let url = URL_SERVICIOS + '/contractRegime/' + id;
    return this.http.get( url )
        .map( (resp: any ) => resp.contractRegime );
  }


}