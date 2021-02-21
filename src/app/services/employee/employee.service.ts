import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { CompanyService } from '../company/company.service';
import Swal from 'sweetalert2';
import { Employee} from 'src/app/models/employee.model';
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
export class EmployeeService {

  employee: Employee;
  company: Company;
  

  constructor( public http: HttpClient, 
    public _usuarioService: UsuarioService,
    public _subirArhivoService: SubirArhivoService,
    public _companyService: CompanyService) { }


    
 

    cargarEmployees( id: string){

      let url = URL_SERVICIOS + '/employee/employee/' + id;
      return this.http.get( url )
          .map( (resp: any) => resp.employee );
    }

    cargarEmployeeCompany( idcompany: string, desde: number = 0){

      let url = URL_SERVICIOS + '/employee/' + idcompany + '?desde=' + desde;
     
      return this.http.get( url );
          // .map( (resp: any) => resp.employee );
    }

    buscarEmployees( termino: string ) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/employee/' + termino;
      return this.http.get( url )
          .map(( resp: any ) => resp.employee);


    }
    borrarEmployees( id: string ){
      let url = URL_SERVICIOS + '/employee/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete( url )
          .map( (resp: any) => {
              Swal.fire({
              text: 'Empleado Eliminado',
              icon: 'success'
            });
              return resp;
      });
    }
    crearEmployee( employee: Employee){
      console.log('entro');
      const url = URL_SERVICIOS + '/employee';
      return this.http.post( url, employee)
          .map( (resp: any) =>{

            Swal.fire({
              text: 'Empleado Creado' + '' +  employee.firstname,
              icon: 'success'
            });
            return resp.employee;
             
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

    actualizarEmployee( employee: Employee ){

      let url = URL_SERVICIOS + '/employee/' + employee.id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, employee)
          .map( (resp: any) =>{
            Swal.fire({
              text: 'Empleado Actualizado' + '' +  employee.firstname,
              icon: 'success'
            });
            return resp.employee;
          });
    }


    cambiarImagen( archivo: File, id: string ){

      this._subirArhivoService.subirArchivo( archivo, 'employee', id )
    
        .then( (resp: any) =>{
          this.employee.img = resp.employee.img;
          Swal.fire({
            text: 'Imagen Actualizada',
            icon: 'success'
          });
         
    
    
        })
        .catch( resp =>{
    
        });
    }
}
