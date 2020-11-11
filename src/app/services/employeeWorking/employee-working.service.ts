import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { EmployeeWorking } from 'src/app/models/employeeWorking.model';

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
export class EmployeeWorkingService {

  employeeWorking: EmployeeWorking;
  
  

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService,
    public _subirArhivoService: SubirArhivoService,
    public _companyService: CompanyService) { }


    
 

    cargarEmployeeWorking( id: string){

      let url = URL_SERVICIOS + '/employeeWorking/' + id;
      return this.http.get( url )
          .map( (resp: any) => resp.employeeWorking );
    }
    buscarEmployeeWorking( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.employeeWorking);
    }
    borrarEmployeeWorking( id: string ){
      let url = URL_SERVICIOS + '/employeeWorking/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'informacion laboral empleado Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearEmployeeWorking( employeeWorking: EmployeeWorking){
      let url = URL_SERVICIOS + '/employeeWorking';
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, employeeWorking)
          .map( (resp: any) =>{

            Swal.fire({
              text: 'laboral guardada',
              icon: 'success'
            }); 

            return resp.employeeWorking;
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

    actualizarEmployeeWorking( employeeWorking: EmployeeWorking ){

      let url = URL_SERVICIOS + '/employeeWorking/' + employeeWorking.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, employeeWorking)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion laboral Actualizado',
              icon: 'success'
            });
            return resp.employeeWorking;
          });
    }

  }