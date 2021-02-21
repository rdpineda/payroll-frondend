import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { CompanyService } from '../../services/company/company.service';
import { CompanyPaymentService } from '../../services/service.index';
import { CompanyPayrollService } from '../../services/service.index';
import { CompanyInfoService } from '../../services/service.index';
import { ConceptService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Company } from '../../models/company.model';
import { CompanyInfo } from '../../models/companyInfo.model';
import { CompanyPayment } from '../../models/companyPayment.model';
import { CompanyPayroll } from '../../models/companyPayroll.model';
import { Concept } from '../../models/concept.model';
import { Router } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { CardCompanyComponent } from '../../components/card-company/card-company.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  starDemoDay: Date = new Date();
  demoDay = 50;
  createUser: any;
  updateUser: any;
  idUser: any;
  correo: any;
  idCompany: any;
  isActive = true;
  idTenant = '51c8b7bb-11fd-4203-af7a-98ae9ca27475';
  idRol = '37188fd7-f43b-4874-bd1a-54c5cce8afee';

  compa: any = {}
  companys: Company [] = [];
  usuario: Usuario;
  company: Company [] = [];
  concept: Concept[] = [];
  company1: any = {};
  company2: any = {};
  autenticado = 'n';
  

  empresa: any = {};
  empresaseleccionada: any = {};
 
  
 

  constructor( public _usuarioService: UsuarioService,
               public _companyService: CompanyService,
               public _conceptService: ConceptService,
               public _modalUploadService:ModalUploadService,
               public _companyInfoService: CompanyInfoService,
               public _companyPaymentService: CompanyPaymentService,
               public _companyPayrollService: CompanyPayrollService,
               public router: Router) {

   
               
               }

  ngOnInit(): void {

    this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
    this.usuario = this._usuarioService.usuario;
    // this.cargarEmpresasUsuario(this.usuario.id);
    this.company = this._usuarioService.empresas;
    console.log(this.empresaseleccionada);
    
    if (this.empresaseleccionada) {
     
      this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada'));
    
     
    } else {
      if(this.company.length > 1 ){
        this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada'));
       
      } else {
        this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
      
      }
    }
    

    this.cargarCompanySelect(this.empresa.id);
  
    this._modalUploadService.notificacion
    .subscribe( () => this.cargarCompanySelect(this.empresa.id));

    

  }

  

  buscar( termino: string){
      this.router.navigate(['/busqueda', termino]);
  }

  vercompany( event ){
    this.compa = JSON.stringify(event.empresa);
  }

  /* cargarEmpresasUsuario(id: string){
    this._companyService.cargarCompanysUser(id)
    .subscribe ( resp => this.companys1 = resp);
  } */

  cargarCompanySelect(id: string){
    this._companyService.cargarCompanys(id)
        .subscribe ( resp => {
          this.company1 = resp;
        });
  } 

  cargarEmpresasUsuario(iduser: string){
    this._companyService.cargarCompanysUser(iduser)
    .subscribe ( resp => this.company2 = resp);
    console.log('empresas', this.company1);
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
              this.updateUser = this.usuario.id,
              this.isActive,
              this.idTenant,
            );

            const companyPayroll = new CompanyPayroll(
              this.idCompany = respc.id,
              this.createUser = this.usuario.id,
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
                    .subscribe( respcpy => {
                    });

                    this._conceptService.crearConceptStandard(respc.id)
                    .subscribe( respc => {
                      this.cargarEmpresasUsuario(this.usuario.id);
                      this.router.navigate( ['/companies'] );
                    });

                    
                    
                  
            });
  }
  
});
    
  }
  
}

