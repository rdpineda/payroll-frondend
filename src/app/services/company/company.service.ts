import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, URL_SERVICIOS_HEROKU } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Company } from 'src/app/models/company.model';
import { Usuario } from 'src/app/models/usuario.model';
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
  companyUser: any={};
  

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService ) { }




     cargarCompanys( id: string){

      let url = URL_SERVICIOS + '/company/company/' + id;
      console.log(url);
      return this.http.get( url )
          .map( (resp: any) => resp.company );
    } 
    
    cargarCompanysUser( iduser: string){

      //let url = URL_SERVICIOS + '/company/' + iduser;
      let url = URL_SERVICIOS_HEROKU + '/users/' + iduser;
      console.log(url);
      
      return this.http.get( url )

          .map( (resp: any) => {
            console.log('servicio',resp)
            return resp
            
          });
          
          
          
          
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

    actualizarCompany( company: Company ){

      let url = URL_SERVICIOS + '/company/' + company.id;
     
    
      return this.http.put( url, company)
          .map( (resp: any) =>{
    
          })
          .catch( err =>{
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            });
            return Observable.throwError( err );
          });
    
    }

}


