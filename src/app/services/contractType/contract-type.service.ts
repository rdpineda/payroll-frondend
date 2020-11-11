import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ContractTypeService {

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService) { }

  cargarTipoContrato(){
    let url = URL_SERVICIOS + '/contractType';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.contractType;
        });
  }
  obtenerTipoContrato( id: string ){
    let url = URL_SERVICIOS + '/contractType/' + id;
    return this.http.get( url )
        .map( (resp: any ) => resp.contractType );
  }


}