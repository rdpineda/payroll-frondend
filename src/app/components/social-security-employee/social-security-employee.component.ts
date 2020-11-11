import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import { SubirArhivoService } from '../../services/service.index';

import { ContributorType } from 'src/app/models/contributorType.model';
import { ContributorSubType } from 'src/app/models/ContributorSubType.model';
import { SocialSecurityEntity } from 'src/app/models/SocialSecurityEntity.model';


import { EmployeeSocialSecurity } from 'src/app/models/employeeSocialSecurity.model';

import { ContributorTypeService } from '../../services/service.index';
import { ContributorSubTypeService } from '../../services/service.index';
import { SocialSecurityEntityService } from '../../services/service.index';


import { EmployeeSocialSecurityService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';


@Component({
  selector: 'app-social-security-employee',
  templateUrl: './social-security-employee.component.html',
  styles: []
})
export class SocialSecurityEmployeeComponent implements OnInit {

  forma: FormGroup;
  public date: Date = new Date();
  
  contributorType: ContributorType[] = [];
  contributorSubType: ContributorSubType[] = [];
  entityPension: SocialSecurityEntity[] = [];
  entityHealth: SocialSecurityEntity[] = [];
  entitySeverance: SocialSecurityEntity[] = [];
  idEntityHealth = 'aff13277-d855-44dc-a7b2-55fb0d24d806';
  idEntityPension = 'c4c1704c-bed3-428b-92b7-98641dcf75a9';
  idEntitySeverance = '835d136e-a19a-4061-8a06-3388f233877e';
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  company: any;
  isActive = true;
  public newEmployee: any = {};


employeeSocialSecurity: EmployeeSocialSecurity = new EmployeeSocialSecurity('', '', true, '', '', '', '', '', '', this.date, this.date, '');

  constructor( private fb: FormBuilder,
               public _router: Router,
               public activatedRoute: ActivatedRoute,
               public _modalUploadServices: ModalUploadService,
               public _subirArchivoService: SubirArhivoService,
               public _usuarioService: UsuarioService,
               public _contributorTypeService: ContributorTypeService,
               public _contributorSubTypeService: ContributorSubTypeService,
               public _socialSecurityEntityService: SocialSecurityEntityService,
               public _employeeSocialSecurityService: EmployeeSocialSecurityService
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

  
    this.getContributorType();
    this.getContributorSubType();
    this.getEntityHealt( this.idEntityHealth );
    this.getEntityPension( this.idEntityPension );
    this.getEntitySeverance( this.idEntitySeverance );
  }

  
  
  get contributorTypeNoValido(){return this.forma.get('contributorType').invalid && this.forma.get('contributorType').touched}
  get contributorSubTypeNoValido(){return this.forma.get('contributorSubType').invalid && this.forma.get('contributorSubType').touched}
  get entityHealthNoValido(){return this.forma.get('entityHealth').invalid && this.forma.get('entityHealth').touched}
  get entityPensionNoValido(){return this.forma.get('entityPension').invalid && this.forma.get('entityPension').touched}
  get entitySeveranceNoValido(){return this.forma.get('entitySeverance').invalid && this.forma.get('entitySeverance').touched}
 
  crearFormulario(){

    this.forma = this.fb.group({
     
      contributorType       : ['', Validators.required],
      contributorSubType:  ['', Validators.required],
      entityHealth    : ['', Validators.required],
      entityPension : ['', Validators.required],
      entitySeverance : ['', Validators.required]
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
        this._employeeSocialSecurityService.actualizarEmployeeSocialSecurity( this.employeeSocialSecurity )
        .subscribe( () => this.getEmployeeSocialSecurity(this.employeeSocialSecurity.id));
      } else {
          const employeeSocialSecurityr = new EmployeeSocialSecurity(
         
          this.usuario,
          this.usuario,
          this.isActive,
          Employee,
          this.forma.value.contributorType,
          this.forma.value.contributorSubType,
          this.forma.value.entityHealth,
          this.forma.value.entityPension,
          this.forma.value.entitySeverance

      );

          this._employeeSocialSecurityService.crearEmployeeSocialSecurity( employeeSocialSecurityr )
          .subscribe(employeeSocialSecurity =>  {
          /* this._router.navigate(['/employees']); */
          this.newEmployee = employeeSocialSecurity;
          this._router.navigate(['/employee', 'new', this.newEmployee.idEmployee, 'recurrent']);
        });
      }
    });

   
  
   /*  this.forma.reset(); */
  
  }

  

  getContributorType() {
    this._contributorTypeService.cargarTipoCotizante()
    .subscribe( resp => this.contributorType = resp);
  }


  getContributorSubType() {
    this._contributorSubTypeService.cargarSubTipoCotizante()
    .subscribe( resp => this.contributorSubType = resp);
  }

  getEntityHealt( id: string ) {
    this._socialSecurityEntityService.obtenerEntidadesSalud( id )
    .subscribe( resp => this.entityHealth = resp);
  }

  getEntityPension( id: string ) {
    this._socialSecurityEntityService.obtenerEntidadesPension( id )
    .subscribe( resp => this.entityPension = resp);
  }
 
  getEntitySeverance( id: string ) {
    this._socialSecurityEntityService.obtenerEntidadesCesantia( id )
    .subscribe( resp => this.entitySeverance = resp);
  }

  getEmployeeSocialSecurity( id: string ) {
    this._employeeSocialSecurityService.cargarEmployeeSocialSecurity( id )
        .subscribe( employeeSocialSecurity => {
          this.employeeSocialSecurity = employeeSocialSecurity;
        });

  }

  

}
