import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { Position } from 'src/app/models/position.model';
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
export class PositionService {

  position: Position;
  company: Company;
  

  constructor( public http: HttpClient, 
               public _usuarioService: UsuarioService,
               public _subirArhivoService: SubirArhivoService,
               public _companyService: CompanyService) { }

    cargarPosition( id: string){

      let url = URL_SERVICIOS + '/position/' + id;
      return this.http.get( url )
          .map( (resp: any) => resp.position );
    }

    obtenerPosition( id: string){

      let url = URL_SERVICIOS + '/position/' + id + '/position';
      return this.http.get( url )
          .map( (resp: any) => resp.position );
    }

    cargarPositionCompany( idcompany: string){

      let url = URL_SERVICIOS + '/position/' + idcompany;
     
      return this.http.get( url )
          .map( (resp: any) => resp.position );
    }

    cargarPositionCompanyActive( idcompany: string){

      let url = URL_SERVICIOS + '/position/' + idcompany + '/isActive';
     
      return this.http.get( url )
          .map( (resp: any) => resp.position );
    }


    buscarPosition( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.position);
    }
    borrarPosition( id: string ){
      let url = URL_SERVICIOS + '/position/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'Cargo Eliminada',
              icon: 'success'
            });
              return resp;
      });
    }
    crearPosition( position: Position){
      const url = URL_SERVICIOS + '/position';
      return this.http.post( url, position)
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

    actualizarPosition( position: Position ){

      let url = URL_SERVICIOS + '/position/' + position.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, position)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Cargo Actualizado',
              icon: 'success'
            });
            return resp.position;
          });
    }

  }
