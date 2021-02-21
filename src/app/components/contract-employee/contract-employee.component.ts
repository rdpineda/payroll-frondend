import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import { SubirArhivoService } from '../../services/service.index';

import { ContractType } from 'src/app/models/contractType.model';

import { EmployeeContract } from 'src/app/models/employeeContract.model';

import { ContractTypeService } from '../../services/service.index';

import { EmployeeContractService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';


@Component({
  selector: 'app-contract-employee',
  templateUrl: './contract-employee.component.html',
  styles: []
})
export class ContractEmployeeComponent implements OnInit {

  forma: FormGroup;
  public date: Date = new Date();
  
  contractType: ContractType[] = [];
  
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  company: any;
  isActive = true;
  salary = true;
  public newEmployee: any = {};


  employeeContract: EmployeeContract = new EmployeeContract('', '', true, '', '', this.date, this.date, this.date, this.date, '');

  constructor( private fb: FormBuilder,
               public _router: Router,
               public activatedRoute: ActivatedRoute,
               public _modalUploadServices: ModalUploadService,
               public _subirArchivoService: SubirArhivoService,
               public _usuarioService: UsuarioService,
               public _contractTypeService: ContractTypeService,
               public _employeeContractService: EmployeeContractService
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

               /*  this.activatedRoute.params.subscribe( params =>{
                  this.getEmployeeWorking( params[ 'id' ]);
              }); */


    this.crearFormulario();

   }

  ngOnInit(): void {

  
    this.getContractType();
    
  }

  
  
  get contractTypeNoValido(){return this.forma.get('contractType').invalid && this.forma.get('contractType').touched}
  get initialContractDateNoValido(){return this.forma.get('initialContractDate').invalid && this.forma.get('initialContractDate').touched}
  get endContractDateNoValido(){return this.forma.get('endContractDate').invalid && this.forma.get('endContractDate').touched}

  
 
  crearFormulario(){

    this.forma = this.fb.group({
     
      contractType       : ['', Validators.required],
      initialContractDate:  ['', Validators.required],
      endContractDate    : ['', Validators.required]
     
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
  
    //aca se utiliza un servicio para guardar informacion en la base de datos

    this.activatedRoute.params.subscribe( params => {
      const id = params['id'];
      const Employee = params['Employee'];
      if ( id !== 'new') {
        this._employeeContractService.actualizarEmployeeContract( this.employeeContract[0] )
        .subscribe( () => this.getEmployeeContract(this.employeeContract[0].idEmployee));
      } else {
          const employeeContractr = new EmployeeContract(
         
          this.usuario,
          this.usuario,
          this.isActive,
          this.forma.value.contractType,
          Employee,
          this.forma.value.initialContractDate,
          this.forma.value.endContractDate

      );

          this._employeeContractService.crearEmployeeContract( employeeContractr )
          .subscribe(employeeContract =>  {
          /* this._router.navigate(['/employees']); */
          this.newEmployee = employeeContract;
          this._router.navigate(['/employee', 'new', this.newEmployee.idEmployee, 'salary']);
        });
      }
    });

   
  
   /*  this.forma.reset(); */
  
  }

  

  getContractType() {
    this._contractTypeService.cargarTipoContrato()
    .subscribe( resp => this.contractType = resp);
  }


  
  
  getEmployeeContract( id: string ) {
    this._employeeContractService.cargarEmployeeContract( id )
        .subscribe( employeeContract => {
          this.employeeContract = employeeContract;
        });

  }

  

}

