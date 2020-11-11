import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class SalaryTypeService {

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService) { }

  cargarTipoSalario(){
    let url = URL_SERVICIOS + '/salaryType';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.salaryType;
        });
  }
  obtenerTipoSalario( id: string ){
    let url = URL_SERVICIOS + '/salaryType/' + id;
    return this.http.get( url )
        .map( (resp: any ) => resp.salaryType );
  }


}