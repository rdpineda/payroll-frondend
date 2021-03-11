import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { Area } from 'src/app/models/area.model';
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
export class AreaService {

  area: Area;
  company: Company;
  

  constructor( public http: HttpClient, 
               public _usuarioService: UsuarioService,
               public _subirArhivoService: SubirArhivoService,
               public _companyService: CompanyService) { }

    cargarArea( id: string){

      let url = URL_SERVICIOS + '/area/' + id;
      return this.http.get( url )
          .map( (resp: any) => resp.area );
    }

    obtenerArea( id: string){

      let url = URL_SERVICIOS + '/area/' + id + '/area';
      return this.http.get( url )
          .map( (resp: any) => resp.area );
    }

    cargarAreaCompany( idcompany: string){

      let url = URL_SERVICIOS + '/area/' + idcompany;
     
      return this.http.get( url )
          .map( (resp: any) => resp.area );
    }

    cargarAreaCompanyActive( idcompany: string){

      let url = URL_SERVICIOS + '/area/' + idcompany + '/isActive';
     
      return this.http.get( url )
          .map( (resp: any) => resp.area );
    }


    buscarArea( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.area);
    }
    borrarArea( id: string ){
      let url = URL_SERVICIOS + '/area/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'Area Eliminada',
              icon: 'success'
            });
              return resp;
      });
    }
    crearArea( area: Area){
      const url = URL_SERVICIOS + '/area';
      return this.http.post( url, area)
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
           /*  Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            }); */
            return Observable.throwError( err );
          });
    }

    actualizarArea( area: Area ){

      let url = URL_SERVICIOS + '/area/' + area.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, area)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Area Actualizado',
              icon: 'success'
            });
            return resp.area;
          });
    }

  }