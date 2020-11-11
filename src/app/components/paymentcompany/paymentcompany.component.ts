import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyPaymentService } from '../../services/service.index';
import { CompanyService } from '../../services/service.index';
import { CompanyPayment } from 'src/app/models/companyPayment.model';
import { Company } from '../../models/company.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { PaymentFrequencyService } from '../../services/service.index';
import { PaymentMethodService } from '../../services/service.index';
import { BankService } from '../../services/service.index';
import { AccounttypeService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentFrequency } from 'src/app/models/paymentFrequency.model';
import { PaymentMethod } from 'src/app/models/paymentMethod.model';
import { Bank } from 'src/app/models/bank.model';
import { AccountType } from 'src/app/models/accountType.model';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-paymentcompany',
  templateUrl: './paymentcompany.component.html',
  
  styles: []
})
export class PaymentcompanyComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  public date: Date = new Date();
  forma: FormGroup;
  company: any;
  empresaseleccionada: any = {};
  empresa: any = {};
  paymentFrequency: PaymentFrequency[] = [];
  paymentMethod: PaymentMethod[] = [];
  banks: Bank[] = [];
  accountType: AccountType[] = [];
  // tslint:disable-next-line: max-line-length
  companyPayment: CompanyPayment = new CompanyPayment('', '', '', true, '', 0, '', '', '', '', this.date, this.date);


  constructor(private fb: FormBuilder,
              // tslint:disable-next-line: variable-name
              public _companyPaymentService: CompanyPaymentService,
              // tslint:disable-next-line: variable-name
              public _companyService: CompanyService,
              public _router: Router,
              public _activatedRoute: ActivatedRoute,
               public _usuarioService: UsuarioService,
               public _paymentFrequencyService: PaymentFrequencyService,
               public _paymentMethodService: PaymentMethodService,
               public _bankService: BankService,
               public _accounttypeService: AccounttypeService
                ) { 

                this.company = this._usuarioService.empresas;
                this.empresaseleccionada = localStorage.getItem('empresaseleccionada');

                if ( this.empresaseleccionada ){
                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada'));
                } else {
                  if(this.company.length > 1 ) {
                    this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada'));
                  } else {
                    this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                  }
                }

              
                
                /* _activatedRoute.params.subscribe( params => { */
                  /* const id = params['id']; */
                  
                  /* if ( id !== 'nuevo') { */
                
            
                this.cargarCompanyPayment( this.empresa.id );
                this.cargarCompanySelect( this.empresa.id );
               
               
                // tslint:disable-next-line: no-unused-expression
                
                
                    
                  //}
               /*  }); */
        
    this.crearFormulario();
    
  }
  
  
  get frecuenciapagoNoValido(){return this.forma.get('frecuenciapago').invalid && this.forma.get('frecuenciapago').touched}
  get metodopagoNoValido(){return this.forma.get('metodopago').invalid && this.forma.get('metodopago').touched}
  get bancoNoValido(){return this.forma.get('banco').invalid && this.forma.get('banco').touched}
  get tipocuentaNoValido(){return this.forma.get('tipocuenta').invalid && this.forma.get('tipocuenta').touched}
  get numerocuentaNoValido(){return this.forma.get('numerocuenta').invalid && this.forma.get('numerocuenta').touched}
  
  


  ngOnInit(): void {

    this.cargarFrecuenciaPago();
    this.cargarMetodoPago();
    this.cargarBancos();
    this.cargarTipoCuentas()



  }

  crearFormulario(){
    this.forma = this.fb.group({
      frecuenciapago   :['',Validators.required],
      metodopago       :['',Validators.required],
      banco            :[''],
      tipocuenta       :[''],
      numerocuenta     :[''],
    });

  }



  guardar(companyPayment: CompanyPayment){

    if (this.forma.invalid){
  
      
  
      return Object.values (this.forma.controls).forEach( control =>{
  
        if (control instanceof FormGroup) {
          Object.values (control.controls).forEach( control => control.markAsTouched());
  
        } else{
          control.markAsTouched();
        }
        
  
      });
    }
  
    

    this._companyPaymentService.actualizarCompanyPayment( companyPayment )
            .subscribe( () => this.cargarCompanyPayment(this.empresa.id));
    
    
  
    // this.forma.reset();
  
  }

  cargarFrecuenciaPago() {
    this._paymentFrequencyService.cargarFrecuenciaPago()
    .subscribe( resp => this.paymentFrequency = resp);
  }

  cargarMetodoPago() {
    this._paymentMethodService.cargarMetodoPago()
    .subscribe( resp => this.paymentMethod = resp);
  }

  

   cargarBancos() {
    this._bankService.cargarBancos()
    .subscribe( resp => this.banks = resp);
    
  } 

  cargarTipoCuentas() {
    this._accounttypeService.cargarTipoCuentas()
    .subscribe( resp => this.accountType = resp);
 
  }


  

  

  

  cargarCompanyPayment( id: string ) {
    this._companyPaymentService.cargarCompanyPayment( id )
        .subscribe( company => {
          this.companyPayment = company;
        });

  }

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }


}
