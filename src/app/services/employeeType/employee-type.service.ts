import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {

  constructor( public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarTipoEmpleado(){
    let url = URL_SERVICIOS + '/employeeType';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.employeeType;
        });
  }
  obtenerTipoEmpleado( id: string ){
    let url = URL_SERVICIOS + '/employeeType/' + id;
    return this.http.get( url )
        .map( (resp: any ) => resp.employeeType );
  }


}