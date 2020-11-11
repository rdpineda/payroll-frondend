
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor( public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarMetodoPago(){
    let url = URL_SERVICIOS + '/paymentMethod';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.paymentMethod;
        });
  }
  obtenerMetodoPago( id: string ){
    let url = URL_SERVICIOS + '/paymentMethod/' + id;
    return this.http.get( url )
        .map( (resp: any ) => resp.paymentMethod );
  }


}