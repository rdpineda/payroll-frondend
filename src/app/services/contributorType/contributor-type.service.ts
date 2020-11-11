import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ContributorTypeService {

  constructor( public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarTipoCotizante(){
    let url = URL_SERVICIOS + '/contributorType';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.contributorType;
        });
  }
  obtenerTipoCotizante( id: string ){
    let url = URL_SERVICIOS + '/contributorType/' + id + '/contributorType';
    return this.http.get( url )
        .map( (resp: any ) => resp.contributorType );
  }


}