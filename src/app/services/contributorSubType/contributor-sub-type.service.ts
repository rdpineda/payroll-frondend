import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';




@Injectable({
  providedIn: 'root'
})
export class ContributorSubTypeService {

  constructor( public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarSubTipoCotizante(){
    let url = URL_SERVICIOS + '/contributorSubType';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.contributorSubType;
        });
  }
  obtenerSubTipoCotizante( id: string ){
    let url = URL_SERVICIOS + '/contributorSubType/' + id + '/contributorSubType';
    return this.http.get( url )
        .map( (resp: any ) => resp.contributorSubType );
  }


}