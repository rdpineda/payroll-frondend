import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { Concept } from 'src/app/models/concept.model';
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
export class ConceptService {

  concept: Concept;
  company: Company;

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService,
    public _subirArhivoService: SubirArhivoService,
    public _companyService: CompanyService) { }

    cargarConcept(){
      
      let url = URL_SERVICIOS + '/concept/';
      return this.http.get( url )
          .map( (resp: any) => resp.concept );
    }

    obtenerConcept( id: string){
      
      let url = URL_SERVICIOS + '/concept/' + id;
      return this.http.get( url )
          .map( (resp: any) => resp.concept );
    }

    obtenerConceptSalary(idcompany: string){
      
      let url = URL_SERVICIOS + '/concept/category/salar/' + idcompany ;
      return this.http.get( url )
          .map( (resp: any) => resp.concept );
    }

    cargarConceptCompany( idcompany: string){

      let url = URL_SERVICIOS + '/concept/' + idcompany;
     
      return this.http.get( url )
          .map( (resp: any) => resp.concept );
    }

    cargarConceptCompanyActive( idcompany: string){

      let url = URL_SERVICIOS + '/concept/' + idcompany + '/isActive';
     
      return this.http.get( url )
          .map( (resp: any) => resp.concept );
    }


    buscarConcept( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/companys/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.companyPayroll);
    }


    /* borrarCostCenter( id: string ){
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
    }*/


    crearConcept( concept: Concept){
      const url = URL_SERVICIOS + '/concept';
      return this.http.post( url, concept)
          .map( (resp: any) =>{
          console.log('servicio', resp )
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
            return resp.concept;
          })
          .catch( err =>{
            console.log(err)
           
            Swal.fire({
              title: err.error.mensaje,
              text: err.error.errors.message,
              icon: 'error'
            });
            return Observable.throwError( err );
          });
    }


    crearConceptStandard(  id: string){
      const url = URL_SERVICIOS + '/concept/estandar/' + id;
      return this.http.post( url, id )
          .map( (resp: any) => resp.concept);
    }


 
    actualizarConcept( concept: Concept ){

      let url = URL_SERVICIOS + '/concept/' + concept.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, concept)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'concepto Actualizado',
              icon: 'success'
            });
            return resp.concept;
          });
    }
}
