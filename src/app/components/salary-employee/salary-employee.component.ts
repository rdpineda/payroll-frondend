import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import { SubirArhivoService } from '../../services/service.index';

import { SalaryType } from 'src/app/models/salaryType.model';

import { EmployeeSalary } from 'src/app/models/employeeSalary.model';

import { SalaryTypeService } from '../../services/service.index';

import { EmployeeSalaryService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';




@Component({
  selector: 'app-salary-employee',
  templateUrl: './salary-employee.component.html',
  styles: []
})
export class SalaryEmployeeComponent implements OnInit {

  forma: FormGroup;
  public date: Date = new Date();
  
  salaryType: SalaryType[] = [];
  
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  company: any;
  isActive = true;
  salary = true;
  public newEmployee: any = {};


  employeeSalary: EmployeeSalary = new EmployeeSalary('', '', true, '', '', this.date, this.date, 0, '', this.date, this.date);

  constructor( private fb: FormBuilder,
               public _router: Router,
               public activatedRoute: ActivatedRoute,
               public _modalUploadServices: ModalUploadService,
               public _subirArchivoService: SubirArhivoService,
               public _usuarioService: UsuarioService,
               public _salaryTypeService: SalaryTypeService,
               public _employeeSalaryService: EmployeeSalaryService
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

  
    this.getSalaryType();
    
  }

  
  
  get salaryTypeNoValido(){return this.forma.get('salaryType').invalid && this.forma.get('salaryType').touched}
  get salaryNoValido(){return this.forma.get('salary').invalid && this.forma.get('salary').touched}
  get initialSalaryDateNoValido(){return this.forma.get('initialSalaryDate').invalid && this.forma.get('initialSalaryDate').touched}
  get endSalaryDateNoValido(){return this.forma.get('endSalaryDate').invalid && this.forma.get('endSalaryDate').touched}

  
 
  crearFormulario(){

    this.forma = this.fb.group({
     
      salaryType       : ['', Validators.required],
      salary     : ['', Validators.required],
      initialSalaryDate:  ['', Validators.required],
      endSalaryDate    : ['', Validators.required]
     
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
        this._employeeSalaryService.actualizarEmployeeSalary( this.employeeSalary[0] )
        .subscribe( () => this.getEmployeeSalary(this.employeeSalary[0].idEmployee));
      } else {
          const employeeSalaryr = new EmployeeSalary(
         
          this.usuario,
          this.usuario,
          this.isActive,
          this.forma.value.salaryType,
          Employee,
          this.forma.value.initialSalaryDate,
          this.forma.value.endSalaryDate,
          this.forma.value.salary
          

          

      );
      
          this._employeeSalaryService.crearEmployeeSalary( employeeSalaryr )
          
          .subscribe(employeeSalary =>  {
            this.newEmployee = employeeSalary;
            this._router.navigate(['/employee', 'new', this.newEmployee.idEmployee, 'job']);
        });
      }
      
    });

  
   /*  this.forma.reset(); */
  
  }

  

  getSalaryType() {
    this._salaryTypeService.cargarTipoSalario()
    .subscribe( resp => this.salaryType = resp);
  }


  
  
  getEmployeeSalary( id: string ) {
    this._employeeSalaryService.cargarEmployeeSalary( id )
        .subscribe( employeeSalary => {
          this.employeeSalary = employeeSalary;
        });

  }

  

}
