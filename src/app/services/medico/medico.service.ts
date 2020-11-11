import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedico: number = 0;

  constructor( public http: HttpClient, 
               public _usuarioService: UsuarioService) { }

cargarMedicos(){

  let url = URL_SERVICIOS + '/medico';

  return this.http.get( url )
      .map( (resp: any) =>{
        this.totalMedico = resp.total;
        return resp.medicos;

      });
}

cargarMedico( id: string){

  let url = URL_SERVICIOS + '/medico/' + id;
  return this.http.get( url )
      .map( (resp: any) => resp.medico );

}

buscarMedicos( termino: string ) {

  let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
  return this.http.get( url )
      .map(( resp: any ) => resp.medicos);
}

borrarMedicos( id: string ){

  let url = URL_SERVICIOS + '/medico/' + id;
  url += '?token=' + this._usuarioService.token;

  return this.http.delete( url )
      .map( (resp: any) => {
          Swal.fire({
          text: 'Medico Eliminado',
          icon: 'success'
        });

          return resp;
  });
}

guardarMedicos( medico: Medico ){
  let url = URL_SERVICIOS + '/medico';

  if( medico._id ){
    //actualizando
    url += '/' + medico._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, medico )
        .map( (resp:any) => {
          Swal.fire({
            text: 'Medico Actualizado:' + ' ' + medico.nombre,
            icon: 'success'
          });
          return resp.medico;
        });

  } else {
    //creando

    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, medico )
        .map( (resp: any) =>{
          Swal.fire({
            text: 'Medico Creado:' + ' ' + medico.nombre,
            icon: 'success'
          });
          return resp.medico;
        });
  }
}


}
