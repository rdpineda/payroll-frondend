import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import { SubirArhivoService } from '../../services/service.index';
import { Country } from 'src/app/models/country.model';
import { State } from 'src/app/models/state.model';
import { City } from 'src/app/models/city.model';
import { Gender } from 'src/app/models/gender.model';
import { Employee } from 'src/app/models/employee.model';
import { IdentificationType } from 'src/app/models/identificationType.model';
import { CountryService } from '../../services/service.index';
import { StateService } from '../../services/service.index';
import { CityService } from '../../services/service.index';
import { GenderService } from '../../services/service.index';
import { EmployeeService } from '../../services/service.index';
import { IdentificationTypeService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';


@Component({
  selector: 'app-personal-employee',
  templateUrl: './personal-employee.component.html',
  styles: []
})
export class PersonalEmployeeComponent implements OnInit {

  forma: FormGroup;
  public date: Date = new Date();
  tiposd: IdentificationType[] = [];
  generos: Gender[] = [];
  paises: Country[] = [];
  deptos: State[] = [];
  municipios: City[] = [];
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  company: any;
  public newEmployee: any = {};
  isActive = true;

  // tslint:disable-next-line: max-line-length
  employee: Employee = new Employee('', '', '', '', this.date, '', '', '', '', true, '', '', '', '', '', '', '', '', '', this.date, this.date, '', '');

  constructor( private fb: FormBuilder,
               public _router: Router,
               public activatedRoute: ActivatedRoute,
               public _modalUploadServices: ModalUploadService,
               public _subirArchivoService: SubirArhivoService,
               public _countryService: CountryService,
               public _usuarioService: UsuarioService,
               public _identificationTypeService: IdentificationTypeService,
               public _stateService: StateService,
               public _cityService: CityService,
               public _employeeService: EmployeeService,
               public _genderService: GenderService) {

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

                this.activatedRoute.params.subscribe( params => {
                  const id = params['id'];
                   if(id !== 'new') {this.cargarEmployee( params[ 'id' ])};
              }); 
               
                
                this.cargarMunicipios();


    this.crearFormulario();

   }

  ngOnInit(): void {

    this.cargarPaises();
    this.cargarDepartamentos();
    this.cargarTiposd();
    this.cargarGeneros();
  }

  get tipodocNoValido(){return this.forma.get('tipodoc').invalid && this.forma.get('tipodoc').touched}
  
  get documentoNoValido(){return this.forma.get('documento').invalid && this.forma.get('documento').touched}
  
  get pnombreNoValido(){return this.forma.get('pnombre').invalid && this.forma.get('pnombre').touched}
  get snombreNoValido(){return this.forma.get('snombre').invalid && this.forma.get('snombre').touched}

  get papellidoNoValido(){return this.forma.get('papellido').invalid && this.forma.get('papellido').touched}
  get sapellidoNoValido(){return this.forma.get('sapellido').invalid && this.forma.get('sapellido').touched}

  get generoNoValido(){return this.forma.get('genero').invalid && this.forma.get('genero').touched}
  get fnacimientoNoValido(){return this.forma.get('fnacimiento').invalid && this.forma.get('fnacimiento').touched}
 
  get paisrNoValido(){return this.forma.get('paisr').invalid && this.forma.get('paisr').touched}
 
  get deptorNoValido(){return this.forma.get('deptor').invalid && this.forma.get('deptor').touched}
 
  get ciudadrNoValido(){return this.forma.get('ciudadr').invalid && this.forma.get('ciudadr').touched}
 
  get direccionNoValido(){return this.forma.get('direccion').invalid && this.forma.get('direccion').touched}

  get telefonoNoValido(){return this.forma.get('telefono').invalid && this.forma.get('telefono').touched}

  get celularNoValido(){return this.forma.get('celular').invalid && this.forma.get('celular').touched}

  get correoNoValido(){return this.forma.get('email').invalid && this.forma.get('email').touched}
 
  crearFormulario(){

    this.forma = this.fb.group({
     tipodoc     :['',Validators.required],
     documento   :['',Validators.required],
     pnombre     :['',Validators.required],
     snombre     :[''],
     papellido   :['',Validators.required],
     sapellido   :[''],
     genero      :['',Validators.required],
     fnacimiento :[''],
     paisr       :['',Validators.required],
     deptor      :['',Validators.required],
     ciudadr     :['',Validators.required],
     direccion   :['',Validators.required],
     telefono    :[''],
     celular     :[''],
     email       :['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]]     
      
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
      if ( id !== 'new') {
        this._employeeService.actualizarEmployee( this.employee )
        .subscribe( () => this.cargarEmployee(this.employee.id));
       
      } else {

        const employeer = new Employee(
          this.forma.value.pnombre,
          this.forma.value.snombre,
          this.forma.value.papellido,
          this.forma.value.sapellido,
          this.forma.value.fnacimiento,
          this.empresa.id,
          this.forma.value.email,
          this.usuario,
          this.usuario,
          this.isActive,
          this.forma.value.documento,
          this.forma.value.ciudadr,
          this.forma.value.genero,
          this.forma.value.direccion,
          this.forma.value.telefono,
          this.forma.value.celular,
          this.forma.value.deptor,
          this.forma.value.paisr,
          this.forma.value.tipodoc

      );

        this._employeeService.crearEmployee( employeer )
            .subscribe( employee =>  {

              this.newEmployee = employee;
             
              this._router.navigate(['/employee', 'new', this.newEmployee.id, 'working']);
              if(this.newEmployee.id) {this.cargarEmployee(this.newEmployee.id)};
              
        });
      }
    });

   
  
   /*  this.forma.reset(); */
  
  }

  cargarPaises() {
    this._countryService.cargarPaises()
    .subscribe( resp => this.paises = resp);
  }

  cargarDepartamentos() {
    this._stateService.cargarDepartamentos()
    .subscribe( resp => this.deptos = resp);
  }

  cargarMunicipiosDeptos(id: string) {
    this._cityService.obtenerMunicipioDepto(id)
    .subscribe( resp => this.municipios = resp);
  }

  cargarMunicipios() {
    this._cityService.cargarMunicipios()
    .subscribe( resp => this.municipios = resp);
  }

  cargarTiposd() {
    this._identificationTypeService.cargarTiposDocumentos()
    .subscribe( resp => this.tiposd = resp);
   
  }

  cargarGeneros() {
    this._genderService.cargarGeneros()
    .subscribe( resp => this.generos = resp);
   
  }

  cargarEmployee( id: string ) {
    this._employeeService.cargarEmployees( id )
        .subscribe( employee => {
          this.employee = employee;
        });

  }

  onSelect(id: string): void {
    this.cargarMunicipiosDeptos(id);
    
  }

}
