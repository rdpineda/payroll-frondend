import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor( public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarBancos(){
    let url = URL_SERVICIOS + '/bank';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.bank;
        });
  }
  obtenerBanco( id: string ){
    let url = URL_SERVICIOS + '/bank/' + id + '/bank';
    return this.http.get( url )
        .map( (resp: any ) => resp.bank );
  }


}
