import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';
import { CompanyService } from '../services/company/company.service';
import { SharedService } from '../services/shared/shared.service';
import { HeaderComponent } from '../shared/header/header.component';
import { Usuario } from '../models/usuario.model';
import { Company } from '../models/company.model';
import { Router } from '@angular/router';
import { ImagenPipe } from '../pipes/imagen.pipe';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


declare function ini_plugins();


@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.css']
})
export class CompanysComponent implements OnInit {

  companys: Company [] = [];
  usuario: Usuario;

  constructor( public _usuarioService: UsuarioService,
               public _sharedService: SharedService,
               public _companyService: CompanyService,
               public router: Router,
               public _modalUploadService: ModalUploadService ) {


 this.cargarEmpresas();
 ini_plugins();
                }

  ngOnInit(): void {
   this.cargarEmpresas();
   this.usuario = this._usuarioService.usuario;
  
  }


  cargarEmpresas(){
    this.companys = this._usuarioService.empresas;
  }

  vercompany( idx: number ){
    this.router.navigate( ['/dashboard'] );
  }

  actualizarImagen( company: Company ){
  
    this._modalUploadService.mostrarModal('companys', company.id );
  
  }

}

