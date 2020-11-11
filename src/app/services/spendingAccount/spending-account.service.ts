import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { SpendingAccount } from 'src/app/models/spendingAccount.model';


@Injectable({
  providedIn: 'root'
})
export class SpendingAccountService {

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService ) { }

    cargarCuentaGastos(){
      let url = URL_SERVICIOS + '/spendingAccount';
      return this.http.get( url )
           .map( (resp: any) => {
            return resp.spendingAccount;
          });
    }
    
    obtenerCuentaGastos( id: string ){
      let url = URL_SERVICIOS + '/spendingAccount/' + id;
      return this.http.get( url )
          .map( (resp: any ) => resp.spendingAccount );
    }
}
