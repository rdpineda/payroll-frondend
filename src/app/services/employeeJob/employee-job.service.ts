import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { EmployeeJob } from 'src/app/models/employeeJob.model';

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
export class EmployeeJobService  {

  employeeJob: EmployeeJob;
  
  

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService,
    public _subirArhivoService: SubirArhivoService,
    public _companyService: CompanyService) { }


    
 

    cargarEmployeeJob( idEmployee: string){

      let url = URL_SERVICIOS + '/employeeJob/' + idEmployee;
      return this.http.get( url )
      
          .map( (resp: any) => resp.employeeJob );
          
    }
    buscarEmployeeJob( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.employeeJob);
    }
    borrarEmployeeJob( id: string ){
      let url = URL_SERVICIOS + '/employeeJob/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'informacion del puesto del empleado Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearEmployeeJob( employeeJob: EmployeeJob){
      let url = URL_SERVICIOS + '/employeeJob';
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, employeeJob)
          .map( (resp: any) =>{

            Swal.fire({
              text: 'informacion del puesto guardada',
              icon: 'success'
            }); 

            return resp.employeeJob;
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

    actualizarEmployeeJob( employeeJob: EmployeeJob ){

      let url = URL_SERVICIOS + '/employeeJob/' + employeeJob.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, employeeJob)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion del puesto Actualizado',
              icon: 'success'
            });
            return resp.employeeJob;
          });
    }

  }

