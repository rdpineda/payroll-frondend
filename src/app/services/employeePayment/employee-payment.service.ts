import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { EmployeePayment } from 'src/app/models/employeePayment.model';

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
export class EmployeePaymentService  {

  employeePayment: EmployeePayment;
  
  

  constructor( public http: HttpClient, 
               public _usuarioService: UsuarioService,
               public _subirArhivoService: SubirArhivoService,
               public _companyService: CompanyService) { }


    
 

    cargarEmployeePayment( idEmployee: string){

      let url = URL_SERVICIOS + '/employeePayment/' + idEmployee;
      return this.http.get( url )
          .map( (resp: any) => resp.employeePayment );
    }
    buscarEmployeePayment( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.employeePayment);
    }
    borrarEmployeePayment( id: string ){
      let url = URL_SERVICIOS + '/employeePayment/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'informacion de pago empleado Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearEmployeePayment( employeePayment: EmployeePayment){
      let url = URL_SERVICIOS + '/employeePayment';
      url += '?token=' + this._usuarioService.token;
      console.log('hola', employeePayment )
      return this.http.post( url, employeePayment)
      
          .map( (resp: any) =>{

            Swal.fire({
              text: 'datos de pago guardada',
              icon: 'success'
            }); 

            return resp.employeePayment;
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

    actualizarEmployeePayment( employeePayment: EmployeePayment ){

      let url = URL_SERVICIOS + '/employeePayment/' + employeePayment.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, employeePayment)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion de Pago Actualizado',
              icon: 'success'
            });
            return resp.employeePayment;
          });
    }

  }