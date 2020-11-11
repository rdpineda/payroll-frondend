import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class PaymentFrequencyService {

  constructor( public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarFrecuenciaPago(){
    let url = URL_SERVICIOS + '/paymentFrequency';
    return this.http.get( url )
         .map( (resp: any) => {
          return resp.paymentFrequency;
        });
  }
  obtenerFrecuenciaPago( id: string ){
    let url = URL_SERVICIOS + '/paymentFrequency/' + id;
    return this.http.get( url )
        .map( (resp: any ) => resp.paymentFrequency );
  }


}

