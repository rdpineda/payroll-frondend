import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import { SubirArhivoService } from '../../services/service.index';
import { ContractRegime } from 'src/app/models/contractRegime.model';
import { EmployeeType } from 'src/app/models/employeeType.model';
import { WorkPlaceRisks } from 'src/app/models/workPlaceRisks.model';
import { WorkingHour } from 'src/app/models/workingHour.model';
import { EmployeeWorking } from 'src/app/models/employeeWorking.model';
import { ContractRegimeService } from '../../services/service.index';
import { EmployeeTypeService } from '../../services/service.index';
import { WorkPlaceRisksService } from '../../services/service.index';
import { WorkingHourService } from '../../services/service.index';
import { EmployeeWorkingService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';


@Component({
  selector: 'app-working-employee',
  templateUrl: './working-employee.component.html',
  styles: []
})
export class WorkingEmployeeComponent implements OnInit {

  forma: FormGroup;
  public date: Date = new Date();
  contractRegime: ContractRegime[] = [];
  employeeType: EmployeeType[] = [];
  workPlaceRisks: WorkPlaceRisks[] = [];
  workingHour: WorkingHour[] = [];
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  company: any;
  isActive = true;
  salary = true;
  public newEmployee: any = {};


  employeeWorking: EmployeeWorking = new EmployeeWorking('', '', true, '', '', '', '', '', true, true, this.date, this.date);

  constructor( private fb: FormBuilder,
               public _router: Router,
               public activatedRoute: ActivatedRoute,
               public _modalUploadServices: ModalUploadService,
               public _subirArchivoService: SubirArhivoService,
               public _contractRegimeService: ContractRegimeService,
               public _usuarioService: UsuarioService,
               public _employeeTypeService: EmployeeTypeService,
               public _workPlaceRisksService: WorkPlaceRisksService,
               public _workingHourService: WorkingHourService,
               public _employeeWorkingService: EmployeeWorkingService
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
                   if (id !== 'new') {this.getEmployeeWorking( params[ 'id' ])};
                 
                  
              });

                

              


    this.crearFormulario();

   }

  ngOnInit(): void {

    

    this.getContractRegime();
    this.getEmployeeType();
    this.getWorkPlaceRisks();
    this.getWorkingHour();
  }

  get contractRegimeNoValido(){return this.forma.get('contractRegime').invalid && this.forma.get('contractRegime').touched}
  
  get employeeTypeNoValido(){return this.forma.get('employeeType').invalid && this.forma.get('employeeType').touched}
  
  get workPlaceRisksNoValido(){return this.forma.get('workPlaceRisks').invalid && this.forma.get('workPlaceRisks').touched}
  get workingHourNoValido(){return this.forma.get('workingHour').invalid && this.forma.get('workingHour').touched}

  get transportAssistenceNoValido(){return this.forma.get('transportAssistence').invalid && this.forma.get('transportAssistence').touched}
  get variableSalaryNoValido(){return this.forma.get('variableSalary').invalid && this.forma.get('variableSalary').touched}

  
 
  crearFormulario(){

    this.forma = this.fb.group({
      contractRegime     : ['', Validators.required],
      employeeType   : ['', Validators.required],
      workPlaceRisks     : ['', Validators.required],
      workingHour     : ['', Validators.required],
      transportAssistence   : ['', Validators.required],
      variableSalary   : ['', Validators.required]
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
        this._employeeWorkingService.actualizarEmployeeWorking( this.employeeWorking[0] )
        .subscribe( () => this.getEmployeeWorking(this.employeeWorking[0].idEmployee));
        
      } else {
        
         const employeeWorkingr = new EmployeeWorking(
         
          this.usuario,
          this.usuario,
          this.isActive,
          Employee,
          this.forma.value.contractRegime,
          this.forma.value.employeeType,
          this.forma.value.workingHour,
          this.forma.value.workPlaceRisks,
          this.forma.value.transportAssistence,
          this.forma.value.variableSalary

      );

         this._employeeWorkingService.crearEmployeeWorking( employeeWorkingr )
          .subscribe(employeeWorking =>  {
          /* this._router.navigate(['/employees']); */
          this.newEmployee = employeeWorking;
          this._router.navigate(['/employee', 'new', this.newEmployee.idEmployee, 'contract']);
        });
        
      }
    });

   
  
   /*  this.forma.reset(); */
  
  }

  getContractRegime() {
    this._contractRegimeService.cargarTipoRegimen()
    .subscribe( resp => this.contractRegime = resp);
  }

  getEmployeeType() {
    this._employeeTypeService.cargarTipoEmpleado()
    .subscribe( resp => this.employeeType = resp);
  }


  getWorkPlaceRisks() {
    this._workPlaceRisksService.cargarCentroTrabajo()
    .subscribe( resp => this.workPlaceRisks = resp);
  }

  getWorkingHour() {
    this._workingHourService.cargarHorarioLaboral()
    .subscribe( resp => this.workingHour = resp);
   
  }

  
  getEmployeeWorking( id: string ) {
    this._employeeWorkingService.cargarEmployeeWorking( id )
    
        .subscribe( (employeeWorking)  => {
          this.employeeWorking = employeeWorking;
       
        });

  }

  

}
