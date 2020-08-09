import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { NgModule } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  
  usuario: Usuario;
  company: Company [] = [];
  empresaseleccionada: any = {};
  id: any = {};

  // tslint:disable-next-line: variable-name
  constructor( public _sidebar: SidebarService,
               public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
    this.company = this._usuarioService.empresas;
    this._sidebar.cargarMenu();
    
    this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
if (this.empresaseleccionada) {
  this.id =  JSON.parse(localStorage.getItem('empresaseleccionada'));
} else {
  if(this.company.length > 1 ){
    this.id =  JSON.parse(localStorage.getItem('empresaseleccionada'));
   
  } else {
    this.id =  JSON.parse(JSON.stringify(this.company[0]));
  }
}

    
  }

}

