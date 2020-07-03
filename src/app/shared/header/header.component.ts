import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { CompanyService } from '../../services/company/company.service';
import { Usuario } from '../../models/usuario.model';
import { Company } from '../../models/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  company: Company;

  constructor( public _usuarioService: UsuarioService,
               public _companyService: CompanyService,
               public router: Router) {}

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
    this.company = this._companyService.company;
    console.log(this.company);
  }

  

  buscar( termino: string){
      this.router.navigate(['/busqueda', termino]);
  }
}

