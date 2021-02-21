import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeePaymentService } from '../../services/service.index';
import { CompanyService } from '../../services/service.index';
import { EmployeePayment } from 'src/app/models/employeePayment.model';
import { Company } from '../../models/company.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { BankService } from '../../services/service.index';
import { AccounttypeService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { Bank } from 'src/app/models/bank.model';
import { AccountType } from 'src/app/models/accountType.model';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';



@Component({
  selector: 'app-payment-employee',
  templateUrl: './payment-employee.component.html',
  
  styles: []
})
export class PaymentEmployeeComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  public date: Date = new Date();
  forma: FormGroup;
  company: any;
  usuario: any = {};
  empresaseleccionada: any = {};
  empresa: any = {};
  banks: Bank[] = [];
  accountType: AccountType[] = [];
  isActive = true;
  public newEmployee: any = {};
  // tslint:disable-next-line: max-line-length
  employeePayment: EmployeePayment = new EmployeePayment('', '', true, '', '', '', 0, '', this.date, this.date);


  constructor(private fb: FormBuilder,
              // tslint:disable-next-line: variable-name
              public _employeePaymentService: EmployeePaymentService,
              // tslint:disable-next-line: variable-name
              public _companyService: CompanyService,
              public _router: Router,
              public activatedRoute: ActivatedRoute,
               public _usuarioService: UsuarioService,
               public _bankService: BankService,
               public _accounttypeService: AccounttypeService
                ) { 

                this.company = this._usuarioService.empresas;
                this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
                this.usuario = localStorage.getItem('id');

                if ( this.empresaseleccionada ){
                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada'));
                } else {
                  if(this.company.length > 1 ) {
                    this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada'));
                  } else {
                    this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                  }
                }

                this.activatedRoute.params.subscribe( params =>{
                 
                  const id = params['id'];
                    if (id !== 'new') {this.cargarEmployeePayment( params[ 'id' ])};
                 
                  
              });

        
    this.crearFormulario();
    
  }
  
  


  ngOnInit(): void {

    this.cargarBancos();
    this.cargarTipoCuentas();
  }

  get bankNoValido(){return this.forma.get('bank').invalid && this.forma.get('bank').touched}
  get accountTypeNoValido(){return this.forma.get('accountType').invalid && this.forma.get('accountType').touched}
  get accountNumberNoValido(){return this.forma.get('accountNumber').invalid && this.forma.get('accountNumber').touched}
  
  



  

  crearFormulario(){
    this.forma = this.fb.group({
      bank           : ['', Validators.required],
      accountType       : ['', Validators.required],
      accountNumber    : ['', Validators.required],
    });

  }



  guardar(){

    if (this.forma.invalid){
  
      
  
      return Object.values (this.forma.controls).forEach( control =>{
  
        if (control instanceof FormGroup) {
          Object.values (control.controls).forEach( control => control.markAsTouched());
  
        } else{
          control.markAsTouched();
        }
        
  
      });
    }
  
    

    this.activatedRoute.params.subscribe( params => {
      const id = params['id'];
      const Employee = params['Employee'];
      if ( id !== 'new') {
        this._employeePaymentService.actualizarEmployeePayment( this.employeePayment[0] )
        .subscribe( () => this.cargarEmployeePayment(this.employeePayment[0].idEmployee));
      } else {
          const employeePaymentr = new EmployeePayment(
         
          this.usuario,
          this.usuario,
          this.isActive,
          this.forma.value.bank,
          this.forma.value.accountType,
          Employee,
          this.forma.value.accountNumber

      );

          this._employeePaymentService.crearEmployeePayment( employeePaymentr )
          .subscribe( employeePayment =>  {
          /* this._router.navigate(['/employees']); */
          this.newEmployee = employeePayment;
          this._router.navigate(['/employee', 'new', this.newEmployee.idEmployee, 'socialSecurity']);
        });
      }
    });

    
    
  
    // this.forma.reset();
  
  }

  

   cargarBancos() {
    this._bankService.cargarBancos()
    .subscribe( resp => this.banks = resp);
    
  } 

  cargarTipoCuentas() {
    this._accounttypeService.cargarTipoCuentas()
    .subscribe( resp => this.accountType = resp);
 
  }


  

  

  

  cargarEmployeePayment( id: string ) {
    this._employeePaymentService.cargarEmployeePayment( id )
        .subscribe( (employeePayment) => {
          this.employeePayment = employeePayment;
        });

  }
}

