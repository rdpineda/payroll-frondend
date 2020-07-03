import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Company } from 'src/app/models/company.model';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  company: Company;
  

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService ) { }




    cargarCompanys( id: string){

      let url = URL_SERVICIOS + '/company/' + id;
      console.log(id);
      console.log(id, 'id servicio');
      return this.http.get( url )
          .map( (resp: any) => resp.company );
    }
    buscarCompanys( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.companys);
    }
    borrarCompanys( id: string ){
      let url = URL_SERVICIOS + '/company/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'Empresa Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearCompany( company: Company){
      const url = URL_SERVICIOS + '/company';
      return this.http.post( url, company)
          .map( (resp: any) =>{

           /*  Swal.fire({
              text: 'Empresa Creada',
              icon: 'success'
            }); */

            return resp.company;
          })
          .catch( err =>{
            // tslint:disable-next-line: deprecation
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            });
            return Observable.throwError( err );
          });
    }
}


