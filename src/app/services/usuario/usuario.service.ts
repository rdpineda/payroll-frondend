import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';


import Swal from 'sweetalert2';
import { SubirArhivoService } from '../subirArchivo/subir-arhivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];
  empresas: any[] = [];

  constructor( public http: HttpClient,
               public _router: Router,
               public _subirArchivoService: SubirArhivoService) { 
    this.cargarStorage();
  }

  renuevaToken(){
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url )
        .map( (resp: any) =>{

          this.token = resp.token;
          localStorage.setItem( 'token', this.token );

          return true;

        })
        .catch( err => {
          this._router.navigate(['/login']);
          // tslint:disable-next-line: deprecation
          Swal.fire({
            title: 'No se pudo renovar el token',
            text: 'No fue posible renovar el token',
            icon: 'error'
          });
          return Observable.throwError( err );
        });
  }


  guardarStorage(id: string, token: string, usuario: Usuario, menu: any, empresas: any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    localStorage.setItem('empresas', JSON.stringify(empresas));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
    this.empresas = empresas;

  }

  estaLogueado(){
    return (this.token.length > 5 )? true : false;
  }

  cargarStorage(){
    if ( localStorage.getItem('token')){
          this.token = localStorage.getItem('token');
          this.usuario =  JSON.parse(localStorage.getItem('usuario'));
          this.menu =  JSON.parse(localStorage.getItem('menu'));
          this.empresas =  JSON.parse(localStorage.getItem('empresas'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
      this.empresas = [];
    }
  }


  login( usuario: Usuario, recordar: boolean = false){

    if ( recordar ){
      localStorage.setItem('email', usuario.userName);
    }else{
      localStorage.removeItem('email');
    }
  
    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
              .map( (resp: any) =>{

                this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu, resp.empresas );


                return true;
              })
              .catch( err =>{
                // tslint:disable-next-line: deprecation
                Swal.fire({
                  title: 'Error en el login',
                  text: err.error.mensaje,
                  icon: 'error'
                });
                return Observable.throwError( err );
              });


  }

  logout(){

    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('empresas');

    this._router.navigate(['/login']);

  }


crearUsuario( usuario: Usuario){
  const url = URL_SERVICIOS + '/usuario';
  return this.http.post( url, usuario)
      .map( (resp: any) =>{

        Swal.fire({
          text: 'Usuario Creado',
          icon: 'success'
        });

        return resp.usuario;

      })
      .catch( err =>{
        Swal.fire({
          text: 'El correo ya esta en uso',
          icon: 'warning'
        });
        return Observable.throwError( err );
      });

}

actualizarUsuario( usuario: Usuario ){

  let url = URL_SERVICIOS + '/usuario/' + usuario.id;
  url += '?token=' + this.token;

  return this.http.put( url, usuario)
      .map( (resp: any) =>{

        if ( usuario.id === this.usuario.id) {
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage( usuarioDB.id, this.token, usuarioDB,  this.menu, this.empresas);
        }
        Swal.fire({
          text: 'Usuario Actualizado',
          icon: 'success'
        });

        return true;

      })
      .catch( err =>{
        Swal.fire({
          title: err.error.mensaje,
          text: err.error.errors.message,
          icon: 'error'
        });
        return Observable.throwError( err );
      });

}

cambiarImagen( archivo: File, id: string ){

  this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )

    .then( (resp: any) =>{
      this.usuario.img = resp.usuario.img;
      Swal.fire({
        text: 'Imagen Actualizada',
        icon: 'success'
      });
      this.guardarStorage(id, this.token, this.usuario, this.menu, this.empresas);


    })
    .catch( resp =>{

    });
}

cargarUsuarios( desde: number = 0){

  let url = URL_SERVICIOS + '/usuario?desde=' + desde;
  return this.http.get( url );
  

}

buscarUsuarios( termino: string ) {

  let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
  return this.http.get( url )
      .map(( resp: any ) => resp.usuarios);
}

borrarUsuario( id: string ){

  let url = URL_SERVICIOS + '/usuario/' + id;
  url += '?token=' + this.token;

  return this.http.delete( url );

}


}
