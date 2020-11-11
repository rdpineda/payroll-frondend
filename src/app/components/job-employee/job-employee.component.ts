import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import { SubirArhivoService } from '../../services/service.index';

import { CostCenter } from 'src/app/models/CostCenter.model';
import { Area } from 'src/app/models/Area.model';
import { Subsidiary } from 'src/app/models/Subsidiary.model';
import { Position } from 'src/app/models/Position.model';

import { EmployeeJob } from 'src/app/models/employeeJob.model';

import { CostCenterService } from '../../services/service.index';
import { AreaService } from '../../services/service.index';
import { SubsidiaryService } from '../../services/service.index';
import { PositionService } from '../../services/service.index';

import { EmployeeJobService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';


@Component({
  selector: 'app-job-employee',
  templateUrl: './job-employee.component.html',
  styles: []
})
export class JobEmployeeComponent implements OnInit {

  forma: FormGroup;
  public date: Date = new Date();
  
  costCenter: CostCenter[] = [];
  area: Area[] = [];
  subsidiary: Subsidiary[] = [];
  position: Position[] = [];
  
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  company: any;
  isActive = true;
  salary = true;
  public newEmployee: any = {};


  employeeJob: EmployeeJob = new EmployeeJob('', '', true, '', '', '', '', '', this.date, this.date, '');

  constructor( private fb: FormBuilder,
               public _router: Router,
               public activatedRoute: ActivatedRoute,
               public _modalUploadServices: ModalUploadService,
               public _subirArchivoService: SubirArhivoService,
               public _usuarioService: UsuarioService,
               public _costCenterService: CostCenterService,
               public _areaService: AreaService,
               public _subsidiaryService: SubsidiaryService,
               public _positionService: PositionService,
               public _employeeJobService: EmployeeJobService
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

  
    this.getCostCenter( this.empresa.id);
    this.getArea( this.empresa.id );
    this.getPosition( this.empresa.id );
    this.getSubsidiary( this.empresa.id );
  }

  
  
  get costCenterNoValido(){return this.forma.get('costCenter').invalid && this.forma.get('costCenter').touched}
  get areaNoValido(){return this.forma.get('area').invalid && this.forma.get('area').touched}
  get subsidiaryNoValido(){return this.forma.get('subsidiary').invalid && this.forma.get('subsidiary').touched}
  get positionNoValido(){return this.forma.get('position').invalid && this.forma.get('position').touched}
  
 
  crearFormulario(){

    this.forma = this.fb.group({
     
      costCenter       : ['', Validators.required],
      area:  ['', Validators.required],
      subsidiary    : ['', Validators.required],
      position : ['', Validators.required]
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
        this._employeeJobService.actualizarEmployeeJob( this.employeeJob )
        .subscribe( () => this.getEmployeeJob(this.employeeJob.id));
      } else {
          const employeeJobr = new EmployeeJob(
         
          this.usuario,
          this.usuario,
          this.isActive,
          Employee,
          this.forma.value.costCenter,
          this.forma.value.area,
          this.forma.value.subsidiary,
          this.forma.value.position,

      );

          this._employeeJobService.crearEmployeeJob( employeeJobr )
          .subscribe(employeeJob =>  {
          /* this._router.navigate(['/employees']); */
          this.newEmployee = employeeJob;
          this._router.navigate(['/employee', 'new', this.newEmployee.idEmployee, 'payment']);
        });
      }
    });

   
  
   /*  this.forma.reset(); */
  
  }

  

  getCostCenter( id: string ) {
    this._costCenterService.cargarCostCenterCompanyActive( id )
    .subscribe( resp => this.costCenter = resp);
  }

  getArea( id: string ) {
    this._areaService.cargarAreaCompanyActive( id )
    .subscribe( resp => this.area = resp);
  }

  getSubsidiary( id: string ) {
    this._subsidiaryService.cargarSubsidiaryCompanyActive( id )
    .subscribe( resp => this.subsidiary = resp);
  }

  getPosition( id: string ) {
    this._positionService.cargarPositionCompanyActive( id )
    .subscribe( resp => this.position = resp);
  }



  
  
  getEmployeeJob( id: string ) {
    this._employeeJobService.cargarEmployeeJob( id )
        .subscribe( employeeJob => {
          this.employeeJob = employeeJob;
        });

  }

  

}
