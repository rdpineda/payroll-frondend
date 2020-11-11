import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Country } from 'src/app/models/country.model';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor( public http: HttpClient,
    public _usuarioService: UsuarioService ) { }

    cargarPaises(){
      let url = URL_SERVICIOS + '/country';
      return this.http.get( url )
           .map( (resp: any) => {
            return resp.country;
          });
    }
    
    obtenerPaises( id: string ){
      let url = URL_SERVICIOS + '/country/' + id;
      return this.http.get( url )
          .map( (resp: any ) => resp.country );
    }
}
