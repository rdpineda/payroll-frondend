import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Country } from 'src/app/models/country.model';
import { State } from 'src/app/models/state.model';



@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService ) { }

    cargarDepartamentos(){
      let url = URL_SERVICIOS + '/state';
      return this.http.get( url )
           .map( (resp: any) => {
            return resp.state;
          });
    }
    obtenerDepartamento( id: string ){
      let url = URL_SERVICIOS + '/state/' + id;
      return this.http.get( url )
          .map( (resp: any ) => resp.state );
    }
}

