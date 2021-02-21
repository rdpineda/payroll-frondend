import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';
import { CompanyService } from '../services/company/company.service';
import { ConceptService } from '../services/service.index';
import { CompanyPaymentService } from '../services/service.index';
import { CompanyPayrollService } from '../services/service.index';
import { SharedService } from '../services/shared/shared.service';
import { CompanyInfoService } from '../services/service.index';
import { HeaderComponent } from '../shared/header/header.component';
import { Usuario } from '../models/usuario.model';
import { Company } from '../models/company.model';
import { CompanyInfo } from '../models/companyInfo.model';
import { Concept } from '../models/concept.model';
import { CompanyPayment } from '../models/companyPayment.model';
import { CompanyPayroll } from '../models/companyPayroll.model';
import { Router } from '@angular/router';
import { ImagenPipe } from '../pipes/imagen.pipe';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';


declare function ini_plugins();


@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.css']
})
export class CompanysComponent implements OnInit {

  starDemoDay: Date = new Date();
  demoDay = 50;
  createUser: any;
  updateUser: any;
  idUser: any;
  correo: any;
  idCompany: any;
  concept: Concept[] = [];
  isActive = true;
  idTenant = '51c8b7bb-11fd-4203-af7a-98ae9ca27475';
  idRol = '37188fd7-f43b-4874-bd1a-54c5cce8afee';

 
  companys: Company [] = [];
  companys1: Company [] = [];
  usuario: Usuario;

  constructor( public _usuarioService: UsuarioService,
               public _sharedService: SharedService,
               public _companyService: CompanyService,
               public _conceptService: ConceptService,
               public _companyPaymentService: CompanyPaymentService,
               public _companyPayrollService: CompanyPayrollService,
               public router: Router,
               public _modalUploadService: ModalUploadService,
               public _companyInfoService: CompanyInfoService ) {


  //this.cargarEmpresas();
  this.usuario = this._usuarioService.usuario;
  // this.cargarEmpresasUsuario(this.usuario.id);
  
 ini_plugins();
                }

  ngOnInit(): void {
  //  this.cargarEmpresas();
  
    this.usuario = this._usuarioService.usuario;
    this.cargarEmpresasUsuario(this.usuario.id);
    
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

  cargarEmpresasUsuario(iduser: string){
    this._companyService.cargarCompanysUser(iduser)
    .subscribe ( resp => this.companys1 = resp);
   
  }

  crearEmpresa(){
    Swal.fire({
      title: 'Ingrese el nombre de la Compañia',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if ( !value || value.length === 0) {
          return 'No ha ingresado ningun dato';
        }
        const company = new Company(
          value,
          this.starDemoDay,
          this.demoDay,
          this.createUser = this.usuario.id,
          this.updateUser = this.usuario.id,
          this.isActive,
          this.idTenant,
          this.idUser = this.usuario.id

      );
        this._companyService.crearCompany( company )
            .subscribe(respc => {

              const companyInfo = new CompanyInfo(
                value,
                this.idCompany = respc.id,
                this.correo = this.usuario.userName,
                this.createUser = this.usuario.id,
                this.updateUser = this.usuario.id,
                this.isActive,
                this.idTenant,
            );

            const companyPayment = new CompanyPayment(
              this.idCompany = respc.id,
              this.createUser = this.usuario.id,
              this.updateUser =  this.usuario.id,
              this.isActive,
              this.idTenant,
            );

          const companyPayroll = new CompanyPayroll(
              this.idCompany = respc.id,
              this.createUser =  this.usuario.id,
              this.updateUser = this.usuario.id,
              this.isActive,
              this.idTenant,
            );
              this._companyInfoService.crearCompanyInfo( companyInfo )
                  .subscribe( respci => {
                  });
                  this._companyPaymentService.crearCompanyPayment( companyPayment )
                  .subscribe( respcp => {
                  });

          this._companyPayrollService.crearCompanyPayroll( companyPayroll )
                  .subscribe( respcp => {
                  });

                  this._conceptService.crearConceptStandard(respc.id)
                  .subscribe( respc => {
                    this.cargarEmpresasUsuario(this.usuario.id);
                  });
                   
                  
            });
  }
});
}
}

