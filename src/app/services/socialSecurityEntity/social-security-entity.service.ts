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
export class SocialSecurityEntityService {

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService ) { }

    cargarEntidadesSS(){
      let url = URL_SERVICIOS + '/socialSecurityEntity';
      return this.http.get( url )
           .map( (resp: any) => {
            return resp.socialSecurityEntity;
          });
    }

    


    obtenerEntidadSS( id: string ){
      let url = URL_SERVICIOS + '/socialSecurityEntity/' + id + '/socialSecurityEntity/';
      return this.http.get( url )
          .map( (resp: any ) => resp.socialSecurityEntity );
    }
     obtenerCajasCompensacion( id: string ){
      let url = URL_SERVICIOS + '/socialSecurityEntity/caja/' + id;
      return this.http.get( url )
          .map( (resp: any ) => resp.socialSecurityEntity );
    } 

    obtenerEntidadesRiesgo( id: string ){
      let url = URL_SERVICIOS + '/socialSecurityEntity/riesgo/' + id;
      console.log(url);
      return this.http.get( url )
          .map( (resp: any ) => resp.socialSecurityEntity );
    }

    obtenerEntidadesSalud( id: string ){
      let url = URL_SERVICIOS + '/socialSecurityEntity/salud/' + id;
      console.log(url);
      return this.http.get( url )
          .map( (resp: any ) => resp.socialSecurityEntity );
    }

    obtenerEntidadesPension( id: string ){
      let url = URL_SERVICIOS + '/socialSecurityEntity/pension/' + id;
      console.log(url);
      return this.http.get( url )
          .map( (resp: any ) => resp.socialSecurityEntity );
    }

    obtenerEntidadesCesantia( id: string ){
      let url = URL_SERVICIOS + '/socialSecurityEntity/cesantia/' + id;
      console.log(url);
      return this.http.get( url )
          .map( (resp: any ) => resp.socialSecurityEntity );
    }
    
}
