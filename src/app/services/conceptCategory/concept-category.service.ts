import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ConceptCategoryService {

  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService) { }

    cargarConceptCategoria(){
      let url = URL_SERVICIOS + '/conceptCategory';
      return this.http.get( url )
           .map( (resp: any) => {
            return resp.conceptCategory;
          });
    }
    obtenerConceptCategoria( id: string ){
      let url = URL_SERVICIOS + '/conceptCategory/' + id;
      
      return this.http.get( url )
      
          .map( (resp: any ) => resp.conceptCategory );
      
  
    }



}
