import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService,
               public router: Router ){}


  canActivate() {

    if ( this._usuarioService.usuario.idRol === '37188fd7-f43b-4874-bd1a-54c5cce8afee' ){
      return true;
    } else {
      this._usuarioService.logout();
      return false;

    }


    
  }
  
}
