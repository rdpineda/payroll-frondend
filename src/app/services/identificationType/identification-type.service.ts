import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { IdentificationType } from 'src/app/models/identificationType.model';

@Injectable({
  providedIn: 'root'
})
export class IdentificationTypeService {

  constructor( public http: HttpClient ) { }

  cargarTiposDocumentos(){
    let url = URL_SERVICIOS + '/identificationType';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.identificationType;
        });
  }

  obtenerTipoDocumentos( id: string ){
    let url = URL_SERVICIOS + '/identificationType/' + id;
    return this.http.get( url )
        .map( (resp: any ) => resp.tipod );
  }


}


