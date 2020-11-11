import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class WorkPlaceRisksService {

  constructor( public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarCentroTrabajo(){
    let url = URL_SERVICIOS + '/workPlaceRisks';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.workPlaceRisks;
        });
  }
  obtenerCentroTrabajo( id: string ){
    let url = URL_SERVICIOS + '/workPlaceRisks/' + id;
    return this.http.get( url )
        .map( (resp: any ) => resp.workPlaceRisks );
  }


}
