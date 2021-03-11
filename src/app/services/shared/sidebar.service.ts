import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

menu: any []= [];

  constructor( public _usuarioService: UsuarioService) {
  }

  cargarMenu(){
    this.menu = this._usuarioService.menu;
    console.log('sermenu',this.menu)
    console.log('sermenu2',this._usuarioService.menu)
  }
}
