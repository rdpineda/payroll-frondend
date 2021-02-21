import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { EmployeeContract } from 'src/app/models/employeeContract.model';

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
export class EmployeeContractService  {

  employeeContract: EmployeeContract;
  
  

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService,
    public _subirArhivoService: SubirArhivoService,
    public _companyService: CompanyService) { }


    
 

    cargarEmployeeContract( idEmployee: string){

      let url = URL_SERVICIOS + '/employeeContract/' + idEmployee;
      return this.http.get( url )
          .map( (resp: any) => resp.employeeContract );
    }
    buscarEmployeeContract( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.employeeContract);
    }
    borrarEmployeeContract( id: string ){
      let url = URL_SERVICIOS + '/employeeContract/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'informacion de contrato empleado Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearEmployeeContract( employeeContract: EmployeeContract){
      let url = URL_SERVICIOS + '/employeeContract';
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, employeeContract)
          .map( (resp: any) =>{

            Swal.fire({
              text: 'contrato guardada',
              icon: 'success'
            }); 

            return resp.employeeContract;
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

    actualizarEmployeeContract( employeeContract: EmployeeContract ){

      let url = URL_SERVICIOS + '/employeeContract/' + employeeContract.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, employeeContract)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion de Contrato Actualizado',
              icon: 'success'
            });
            return resp.employeeContract;
          });
    }

  }
