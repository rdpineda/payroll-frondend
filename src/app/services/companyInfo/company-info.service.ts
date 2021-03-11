
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { Company } from 'src/app/models/company.model';
import { Companyold } from 'src/app/models/companyold.model';
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

  company: Company;
  companyold: Companyold;
  

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService,
    public _subirArhivoService: SubirArhivoService,
    public _companyService: CompanyService) { }


    
 

    cargarCompanyInfo( id: string){

      let url = URL_SERVICIOS + '/company/' + id;
      return this.http.get( url )
          .map( (resp: any) => resp.companyInfo );
    }
    buscarCompanyInfo( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.companyInfo);
    }
    borrarCompanyInfo( id: string ){
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
    crearCompanyInfo( company: Company){
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

    actualizarCompanyInfo( companyInfo: Company ){

      let url = URL_SERVICIOS + '/company/' + companyInfo.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, companyInfo)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Informacion básica Actualizado' + '' +  companyInfo.name,
              icon: 'success'
            });
            return resp.companyInfo;
          });
    }


    cambiarImagen( archivo: File, id: string ){

      this._subirArhivoService.subirArchivo( archivo, 'company', id )
    
        .then( (resp: any) =>{
          this.company.img = resp.companyInfo.img;
          Swal.fire({
            text: 'Imagen Actualizada',
            icon: 'success'
          });
         
    
    
        })
        .catch( resp =>{
    
        });
    }
}
