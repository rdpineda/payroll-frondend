import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { EmployeeSalary } from 'src/app/models/employeeSalary.model';

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
export class EmployeeSalaryService  {

  employeeSalary: EmployeeSalary;
  
  

  constructor( public http: HttpClient, 
               public _usuarioService: UsuarioService,
               public _subirArhivoService: SubirArhivoService,
               public _companyService: CompanyService) { }


    
 

    cargarEmployeeSalary( idEmployee: string){

      let url = URL_SERVICIOS + '/employeeSalary/' + idEmployee;
      return this.http.get( url )
          .map( (resp: any) => resp.employeeSalary );
    }
    buscarEmployeeSalary( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.employeeSalary);
    }
    borrarEmployeeSalary( id: string ){
      let url = URL_SERVICIOS + '/employeeSalary/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'informacion de salario empleado Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearEmployeeSalary( employeeSalary: EmployeeSalary){
      let url = URL_SERVICIOS + '/employeeSalary';
      url += '?token=' + this._usuarioService.token;
      console.log('hola', employeeSalary )
      return this.http.post( url, employeeSalary)
      
          .map( (resp: any) =>{

            Swal.fire({
              text: 'salario guardada',
              icon: 'success'
            }); 

            return resp.employeeSalary;
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

    actualizarEmployeeSalary( employeeSalary: EmployeeSalary ){

      let url = URL_SERVICIOS + '/employeeSalary/' + employeeSalary.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, employeeSalary)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion de Salario Actualizado',
              icon: 'success'
            });
            return resp.employeeSalary;
          });
    }

  }

