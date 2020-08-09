
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { CompanyInfo } from 'src/app/models/companyInfo.model';
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
export class CompanyInfoService {

  companyInfo: CompanyInfo;
  company: Company;
  

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService,
    public _subirArhivoService: SubirArhivoService,
    public _companyService: CompanyService) { }


    
 

    cargarCompanyInfo( id: string){

      let url = URL_SERVICIOS + '/companyInfo/' + id;
      return this.http.get( url )
          .map( (resp: any) => resp.companyInfo );
    }
    buscarCompanyInfo( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.companyInfo);
    }
    borrarCompanyInfo( id: string ){
      let url = URL_SERVICIOS + '/companyInfo/' + id;
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
    crearCompanyInfo( companyInfo: CompanyInfo){
      const url = URL_SERVICIOS + '/companyInfo';
      return this.http.post( url, companyInfo)
          .map( (resp: any) =>{

           /*  Swal.fire({
              text: 'Empresa Creada',
              icon: 'success'
            }); */

            return resp.companyInfo;
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

    cambiarImagen( archivo: File, id: string ){

      this._subirArhivoService.subirArchivo( archivo, 'companyInfo', id )
    
        .then( (resp: any) =>{
          this.companyInfo.img = resp.companyInfo.img;
          Swal.fire({
            text: 'Imagen Actualizada',
            icon: 'success'
          });
         
    
    
        })
        .catch( resp =>{
    
        });
    }
}
