import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AccounttypeService {

  constructor( public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarTipoCuentas(){
    let url = URL_SERVICIOS + '/accountType';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.accountType;
        });
  }
  obtenerTipoCuenta( id: string ){
    let url = URL_SERVICIOS + '/accountType/' + id + '/accountType';
    return this.http.get( url )
        .map( (resp: any ) => resp.accountType );
  }


}