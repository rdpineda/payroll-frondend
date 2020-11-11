import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { Subsidiary } from 'src/app/models/subsidiary.model';
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
export class SubsidiaryService {

  subsidiary: Subsidiary;
  company: Company;
  

  constructor( public http: HttpClient, 
               public _usuarioService: UsuarioService,
               public _subirArhivoService: SubirArhivoService,
               public _companyService: CompanyService) { }

    cargarSubsidiary( id: string){

      let url = URL_SERVICIOS + '/subsidiary/' + id;
      return this.http.get( url )
          .map( (resp: any) => resp.subsidiary );
    }

    obtenerSubsidiary( id: string){

      let url = URL_SERVICIOS + '/subsidiary/' + id + '/subsidiary';
      return this.http.get( url )
          .map( (resp: any) => resp.subsidiary );
    }

    cargarSubsidiaryCompany( idcompany: string){

      let url = URL_SERVICIOS + '/subsidiary/' + idcompany;
     
      return this.http.get( url )
          .map( (resp: any) => resp.subsidiary );
    }

    cargarSubsidiaryCompanyActive( idcompany: string){

      let url = URL_SERVICIOS + '/subsidiary/' + idcompany + '/isActive';
     
      return this.http.get( url )
          .map( (resp: any) => resp.subsidiary );
    }

    buscarSubsidiary( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.subsidiary);
    }
    borrarSubsidiary( id: string ){
      let url = URL_SERVICIOS + '/subsidiary/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'Sucursal Eliminada',
              icon: 'success'
            });
              return resp;
      });
    }
    crearSubsidiary( subsidiary: Subsidiary){
      const url = URL_SERVICIOS + '/subsidiary';
      return this.http.post( url, subsidiary)
          .map( (resp: any) =>{
           /*  Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Centro de Costo Creado',
              showConfirmButton: false,
              timer: 1500
            }) */
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Creado Exitosamente'
            })
            return resp.area;
          })
          .catch( err =>{
            console.log(err)
            // tslint:disable-next-line: deprecation
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            });
            return Observable.throwError( err );
          });
    }

    actualizarSubsidiary( subsidiary: Subsidiary ){

      let url = URL_SERVICIOS + '/subsidiary/' + subsidiary.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, subsidiary)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Area Actualizado',
              icon: 'success'
            });
            return resp.subsidiary;
          });
    }

  }
