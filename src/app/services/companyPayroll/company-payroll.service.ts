import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { CompanyPayroll } from 'src/app/models/companyPayroll.model';
import { Company } from 'src/app/models/company.model';
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
export class CompanyPayrollService {

  companyPayroll: CompanyPayroll;
  company: Company;
  

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService,
    public _subirArhivoService: SubirArhivoService,
    public _companyService: CompanyService) { }

    cargarCompanyPayroll( id: string){

      let url = URL_SERVICIOS + '/companyPayroll/' + id;
      return this.http.get( url )
          .map( (resp: any) => resp.companyPayroll );
    }
    buscarCompanyPayroll( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.companyPayroll);
    }
    borrarCompanyPayroll( id: string ){
      let url = URL_SERVICIOS + '/companyPayroll/' + id;
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
    crearCompanyPayroll( companyPayroll: CompanyPayroll){
      const url = URL_SERVICIOS + '/companyPayroll';
      return this.http.post( url, companyPayroll)
          .map( (resp: any) =>{

           /*  Swal.fire({
              text: 'Empresa Creada',
              icon: 'success'
            }); */

            return resp.companyPayroll;
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

    actualizarCompanyPayroll( companyPayroll: CompanyPayroll ){

      let url = URL_SERVICIOS + '/companyPayroll/' + companyPayroll.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, companyPayroll)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion de Nomina Actualizado',
              icon: 'success'
            });
            return resp.companyPayroll;
          });
    }

  }
