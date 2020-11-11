
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class WorkingHourService {

  constructor( public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarHorarioLaboral(){
    let url = URL_SERVICIOS + '/workingHour';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.workingHour;
        });
  }
  obtenerHorarioLaboral( id: string ){
    let url = URL_SERVICIOS + '/workingHour/' + id;
    return this.http.get( url )
        .map( (resp: any ) => resp.workingHour );
  }


}
