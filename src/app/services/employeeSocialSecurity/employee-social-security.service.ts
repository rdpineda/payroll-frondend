import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { EmployeeSocialSecurity } from 'src/app/models/employeeSocialSecurity.model';

import { Router } from '@angular/router';
import { SubirArhivoService } from '../subirArchivo/subir-arhivo.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class EmployeeSocialSecurityService  {

  employeeSocialSecurity: EmployeeSocialSecurity;
  
  

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService,
    public _subirArhivoService: SubirArhivoService,
    public _companyService: CompanyService) { }


    
 

    cargarEmployeeSocialSecurity( idEmployee: string){

      let url = URL_SERVICIOS + '/employeeSocialSecurity/' + idEmployee;
      return this.http.get( url )
          .map( (resp: any) => resp.employeeSocialSecurity );
    }
    buscarEmployeeSocialSecurity( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.employeeSocialSecurity);
    }
    borrarEmployeeSocialSecurity( id: string ){
      let url = URL_SERVICIOS + '/employeeSocialSecurity/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'informacion de seguridad social del empleado Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearEmployeeSocialSecurity( employeeSocialSecurity: EmployeeSocialSecurity){
      let url = URL_SERVICIOS + '/employeeSocialSecurity';
      url += '?token=' + this._usuarioService.token;
      console.log('hola',  employeeSocialSecurity )
      return this.http.post( url, employeeSocialSecurity)
          .map( (resp: any) =>{

            Swal.fire({
              text: 'informacion de seguridad social guardada',
              icon: 'success'
            }); 

            return resp.employeeSocialSecurity;
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

    actualizarEmployeeSocialSecurity( employeeSocialSecurity: EmployeeSocialSecurity ){

      let url = URL_SERVICIOS + '/employeeSocialSecurity/' + employeeSocialSecurity.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, employeeSocialSecurity)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion de seguridad social Actualizado',
              icon: 'success'
            });
            return resp.employeeSocialSecurity;
          });
    }

  }
