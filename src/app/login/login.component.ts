import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function ini_plugins();


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;

  constructor( public _router: Router,
               public _usuarioService: UsuarioService) { }

  ngOnInit(): void {

    ini_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1){
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm ){
  
  if (forma.invalid){
    return;
  }

  let usuario = new Usuario(null, forma.value.email, forma.value.password);

  this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(correcto => {

        if (this._usuarioService.empresas.length > 1) {
          this._router.navigate(['/companys']);
        } else {
            this._router.navigate(['/dashboard']);
          }
      });
  }

}
