import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { CostCenter } from 'src/app/models/costCenter.model';
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
export class CostCenterService {

  costCenter: CostCenter;
  company: Company;
  

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService,
    public _subirArhivoService: SubirArhivoService,
    public _companyService: CompanyService) { }

    cargarCostCenter( id: string){
      
      let url = URL_SERVICIOS + '/costCenter/' + id;
      return this.http.get( url )
          .map( (resp: any) => resp.costCenter );
    }

    obtenerCostCenter( id: string){
      
      let url = URL_SERVICIOS + '/costCenter/' + id + '/cecos';
      return this.http.get( url )
          .map( (resp: any) => resp.costCenter );
    }

    cargarCostCenterCompany( idcompany: string){

      let url = URL_SERVICIOS + '/costCenter/' + idcompany;
     
      return this.http.get( url )
          .map( (resp: any) => resp.costCenter );
    }

    cargarCostCenterCompanyActive( idcompany: string){

      let url = URL_SERVICIOS + '/costCenter/' + idcompany + '/isActive';
     
      return this.http.get( url )
          .map( (resp: any) => resp.costCenter );
    }


    buscarCostCenter( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.companyPayroll);
    }
    borrarCostCenter( id: string ){
      let url = URL_SERVICIOS + '/costCenter/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'Centro de costo Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearCostCenter( costCenter: CostCenter){
      const url = URL_SERVICIOS + '/costCenter';
      return this.http.post( url, costCenter)
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
            return resp.costCenter;
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

    actualizarCostCenter( costCenter: CostCenter ){

      let url = URL_SERVICIOS + '/costCenter/' + costCenter.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, costCenter)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Centro de costo Actualizado',
              icon: 'success'
            });
            return resp.costCenter;
          });
    }

  }