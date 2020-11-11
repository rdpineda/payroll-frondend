import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { CompanyService } from '../services/service.index';
import { CompanyInfoService } from '../services/service.index';
import { CompanyPaymentService } from '../services/service.index';
import { CompanyPayrollService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Company } from '../models/company.model';
import { CompanyInfo } from '../models/companyInfo.model';
import { CompanyPayment } from '../models/companyPayment.model';
import { CompanyPayroll } from '../models/companyPayroll.model';


import Swal from 'sweetalert2';



declare function ini_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  starDemoDay: Date = new Date();
  demoDay = 50;
  createUser: any;
  updateUser: any;
  idUser: any;
  idCompany: any;
  isActive = true;
  idTenant = '51c8b7bb-11fd-4203-af7a-98ae9ca27475';
  idRol = '37188fd7-f43b-4874-bd1a-54c5cce8afee';


  
  
  // tslint:disable-next-line: variable-name
  constructor( public _usuarioService: UsuarioService,
               public _companyService: CompanyService,
               public _companyInfoService: CompanyInfoService,
               public _companyPaymentService: CompanyPaymentService,
               public _companyPayrollService: CompanyPayrollService,
               public _router: Router,
               private fb: FormBuilder ) {

      this.crearFormulario();
               }


  sonIguales( campo1: string, campo2: string){
    return ( group: FormGroup ) =>{

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2){
        return null;
      }

      return{
          sonIguales: true
        };
    };
  }

  ngOnInit(): void {

    ini_plugins();

  }

  get nombreNoValido(){return this.forma.get('nombre').invalid && this.forma.get('nombre').touched }
  get empresaNoValido(){return this.forma.get('empresa').invalid && this.forma.get('empresa').touched }
  get correoNoValido(){return this.forma.get('correo').invalid && this.forma.get('correo').touched }
  get telefonoNoValido(){return this.forma.get('telefono').invalid && this.forma.get('telefono').touched }
  get password1NoValido(){return this.forma.get('password1').invalid && this.forma.get('password1').touched }
  get password2NoValido(){return this.forma.get('password2').invalid && this.forma.get('password2').touched }


  crearFormulario(){
    this.forma = this.fb.group({
      nombre       : ['', Validators.required],
      empresa      : ['', Validators.required],
      correo       : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono     : ['', Validators.required],
      password1    : ['', Validators.required],
      password2    : [''],
      condiciones  : ['']
    }, { validators: this.sonIguales( 'password1', 'password2') });
  }


  registrarUsuario() {

    if (this.forma.invalid){

      return Object.values (this.forma.controls).forEach( control =>{
  
        if (control instanceof FormGroup) {
          Object.values (control.controls).forEach( control => control.markAsTouched());
  
        } else{
          control.markAsTouched();
        }
      });
    }

    if ( !this.forma.value.condiciones){
      Swal.fire({
        title: 'Importante',
        text: 'Debe aceptar las condiciones',
        icon: 'warning'
      });
      return;
    }



    const usuario = new Usuario(
        this.forma.value.nombre,
        this.forma.value.correo,
        this.forma.value.password1,
        this.forma.value.telefono,
        this.idRol,
        this.isActive
    );


    this._usuarioService.crearUsuario( usuario )
          .subscribe( resp => {
            this._router.navigate(['/login']);

            const company = new Company(
              this.forma.value.empresa,
              this.starDemoDay,
              this.demoDay,
              this.createUser = resp.id,
              this.updateUser = resp.id,
              this.isActive,
              this.idTenant,
              this.idUser = resp.id

          );
            this._companyService.crearCompany( company )
                .subscribe( respc => {

            const companyInfo = new CompanyInfo(
                  this.forma.value.empresa,
                  this.idCompany = respc.id,
                  this.forma.value.correo,
                  this.createUser = resp.id,
                  this.updateUser = resp.id,
                  this.isActive,
                  this.idTenant,
              );

            const companyPayment = new CompanyPayment(
                this.idCompany = respc.id,
                this.createUser = resp.id,
                this.updateUser = resp.id,
                this.isActive,
                this.idTenant,
              );

            const companyPayroll = new CompanyPayroll(
                this.idCompany = respc.id,
                this.createUser = resp.id,
                this.updateUser = resp.id,
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

                  });
          });


  }

}
