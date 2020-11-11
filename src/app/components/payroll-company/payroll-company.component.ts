import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyPayrollService } from '../../services/service.index';
import { CompanyService } from '../../services/service.index';
import { CompanyPayroll } from 'src/app/models/companyPayroll.model';
import { Company } from '../../models/company.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-payroll-company',
  templateUrl: './payroll-company.component.html',
  styles: []
})

export class PayrollCompanyComponent implements OnInit {

  
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  public date: Date = new Date();
  forma: FormGroup;
  company: any;
  empresaseleccionada: any = {};
  empresa: any = {};
 
  // tslint:disable-next-line: max-line-length
  companyPayroll: CompanyPayroll = new CompanyPayroll('', '', '', true, '', this.date, this.date);


  constructor(private fb: FormBuilder,
    
              public _companyPayrollService:  CompanyPayrollService,
              public _companyService: CompanyService,
              public _router: Router,
              public _activatedRoute: ActivatedRoute,
              public _usuarioService: UsuarioService,
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


      this.cargarCompanyPayroll( this.empresa.id );
      this.cargarCompanySelect( this.empresa.id );

      this.crearFormulario();
     }

    //  get frecuenciapagoNoValido(){return this.forma.get('frecuenciapago').invalid && this.forma.get('frecuenciapago').touched}
     
     

  ngOnInit(): void {

    
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



  guardar(companyPayroll: CompanyPayroll){

    if (this.forma.invalid){
  
      
  
      return Object.values (this.forma.controls).forEach( control =>{
  
        if (control instanceof FormGroup) {
          Object.values (control.controls).forEach( control => control.markAsTouched());
  
        } else{
          control.markAsTouched();
        }
        
  
      });
    }
  
    

    this._companyPayrollService.actualizarCompanyPayroll( companyPayroll )
            .subscribe( () => this.cargarCompanyPayroll(this.empresa.id));
    
    
  
    // this.forma.reset();
  
  }


  cargarCompanyPayroll( id: string ) {
    this._companyPayrollService.cargarCompanyPayroll( id )
        .subscribe( company => {
          this.companyPayroll = company;
        });

  }

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }


}

