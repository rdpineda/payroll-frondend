import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService ) { }

    cargarGeneros(){
      let url = URL_SERVICIOS + '/gender';
      return this.http.get( url )
           .map( (resp: any) => {
            return resp.gender;
          });
    }
    
    obtenerGenero( id: string ){
      let url = URL_SERVICIOS + '/gender/' + id;
      return this.http.get( url )
          .map( (resp: any ) => resp.gender );
    }
}
