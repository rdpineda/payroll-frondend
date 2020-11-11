import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Country } from 'src/app/models/country.model';
import { State } from 'src/app/models/state.model';
import { City } from 'src/app/models/city.model';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService ) { }

    cargarMunicipios(){
      let url = URL_SERVICIOS + '/city';
      return this.http.get( url )
           .map( (resp: any) => {
            return resp.city;
          });
    }
    obtenerMunicipio( id: string ){
      let url = URL_SERVICIOS + '/city/' + id;
      return this.http.get( url )
          .map( (resp: any ) => resp.city );
    }
    obtenerMunicipioDepto( id: string ){
      let url = URL_SERVICIOS + '/city/departamento/' + id;
      return this.http.get( url )
          .map( (resp: any ) => resp.city );
    }
}


