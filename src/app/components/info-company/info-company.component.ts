import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyInfoService } from '../../services/service.index';
import { CompanyService } from '../../services/service.index';
import { Company } from 'src/app/models/company.model';
import { Companyold } from '../../models/companyold.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import { SubirArhivoService } from '../../services/service.index';
import { Country } from 'src/app/models/country.model';
import { State } from 'src/app/models/state.model';
import { City } from 'src/app/models/city.model';
import { SocialSecurityEntity } from 'src/app/models/socialSecurityEntity.model';
import { IdentificationType } from 'src/app/models/identificationType.model';
import { CountryService } from '../../services/service.index';
import { StateService } from '../../services/service.index';
import { CityService } from '../../services/service.index';
import { SocialSecurityEntityService } from '../../services/service.index';
import { IdentificationTypeService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-info-company',
  templateUrl: './info-company.component.html',
  
  styles: []
})
export class InfoCompanyComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  public date: Date = new Date();
  forma: FormGroup;
  company: any;
  paises: Country[] = [];
  deptos: State[] = [];
  municipios: City[] = [];
  socialss: SocialSecurityEntity[] = [];
  cajas: SocialSecurityEntity[] = [];
  riesgos: SocialSecurityEntity[] = [];
  tiposd: IdentificationType[] = [];
  empresaseleccionada: any = {};
  empresa: any = {};
  idcaja = '85c0ad60-034f-48d5-b798-fd55ad0e92fd';
  idriesgo = 'a9bd6d67-7578-497a-b1b9-118c897e9db3';
  // tslint:disable-next-line: max-line-length
  companyInfo: Company = new Company('', this.date, 0,'', '', '','', true, '', '', '', '','', '', '', this.date, '', '', '', this.date, this.date, '', '', '', '','');


  constructor(private fb: FormBuilder,
              public _companyInfoService: CompanyInfoService,
              public _companyService: CompanyService,
               public _router: Router,
               public _activatedRoute: ActivatedRoute,
               public _modalUploadServices: ModalUploadService,
               public _usuarioService: UsuarioService,
               public _subirArchivoService: SubirArhivoService,
               public _countryService: CountryService,
               public _identificationTypeService: IdentificationTypeService,
               public _stateService: StateService,
               public _cityService: CityService,
               public _socialSecurityEntityService: SocialSecurityEntityService ) { 

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
                
            
                this.cargarCompanyInfo( this.empresa.id );
                this.cargarCompanySelect( this.empresa.id );
                this.cargarMunicipios();
               
                // tslint:disable-next-line: no-unused-expression
                
                
                    
                  //}
               /*  }); */
        
    this.crearFormulario();
    
  }
  
  get nameNoValido(){return this.forma.get('name').invalid && this.forma.get('name').touched}
  get tidentificacionNoValido(){return this.forma.get('tidentificacion').invalid && this.forma.get('tidentificacion').touched}
  get nitNoValido(){return this.forma.get('nit').invalid && this.forma.get('nit').touched}
  get digitovNoValido(){return this.forma.get('digitov').invalid && this.forma.get('digitov').touched}
  get paisNoValido(){return this.forma.get('pais').invalid && this.forma.get('pais').touched}
  get deptoNoValido(){return this.forma.get('depto').invalid && this.forma.get('depto').touched}
  get ciudadNoValido(){return this.forma.get('ciudad').invalid && this.forma.get('ciudad').touched}
  get direccionNoValido(){return this.forma.get('direccion').invalid && this.forma.get('direccion').touched}
  get telefonoNoValido(){return this.forma.get('telefono').invalid && this.forma.get('telefono').touched}
  get celularNoValido(){return this.forma.get('celular').invalid && this.forma.get('celular').touched}
  get correoNoValido(){return this.forma.get('email').invalid && this.forma.get('email').touched}
  get rlegalNoValido(){return this.forma.get('rlegal').invalid && this.forma.get('rlegal').touched}
  get ffundacionNoValido(){return this.forma.get('ffundacion').invalid && this.forma.get('ffundacion').touched}
  get riesgoeNoValido(){return this.forma.get('riesgoe').invalid && this.forma.get('riesgoe').touched}
  get cajaNoValido(){return this.forma.get('caja').invalid && this.forma.get('caja').touched}

  
  


  ngOnInit(): void {

    this.cargarPaises();
    this.cargarDepartamentos();
    this.cargarTiposd();
    this.cargarEntidadesRiegos();
    this.cargarCajasCompensacion();
    
    
    
   
     

    this._modalUploadServices.notificacion
    .subscribe( () => this.cargarCompanyInfo(this.empresa.id));
    
    this._modalUploadServices.notificacion
    .subscribe( () => this.cargarCompanySelect(this.empresa.id));

    

  }




  crearFormulario(){
    this.forma = this.fb.group({
      name           :['',Validators.required],
      tidentificacion  :['',Validators.required],
      nit             :['',Validators.required],
      digitov        :['',Validators.required],
      pais           :['',Validators.required],
      depto          :['',Validators.required],
      ciudad         :['',Validators.required],
      direccion   :['',Validators.required],
      telefono    :[''],
      celular     :[''],
      email       :['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      rlegal      :[''],
      ffundacion  :[''],
      riesgoe     :['',Validators.required],
      caja        :['',Validators.required]

    });

  }



  guardar(company: Company){

    if (this.forma.invalid){
  
      
  
      return Object.values (this.forma.controls).forEach( control =>{
  
        if (control instanceof FormGroup) {
          Object.values (control.controls).forEach( control => control.markAsTouched());
  
        } else{
          control.markAsTouched();
        }
        
  
      });
    }
  
    

    this._companyInfoService.actualizarCompanyInfo( company )
            .subscribe( () => this.cargarCompanyInfo(this.empresa.id));
    
    
  
    // this.forma.reset();
  
  }

  cargarPaises() {
    this._countryService.cargarPaises()
    .subscribe( resp => this.paises = resp);
  }

  cargarDepartamentos() {
    this._stateService.cargarDepartamentos()
    .subscribe( resp => this.deptos = resp);
  }

  

   cargarCajasCompensacion() {
    this._socialSecurityEntityService.obtenerCajasCompensacion()
    .subscribe( resp => this.cajas = resp);
    
  } 

  cargarEntidadesRiegos() {
    this._socialSecurityEntityService.obtenerEntidadesRiesgo()
    .subscribe( resp => this.riesgos = resp);
 
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
    console.log(this.tiposd);
  }

  

  cargarCompanyInfo( id: string ) {
    this._companyInfoService.cargarCompanyInfo( id )
        .subscribe( company => {
          this.company = company;
        });

  }

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }

 

 

  actualizarImagen( companyInfo: Company ){
  
    this._modalUploadServices.mostrarModal('companys', companyInfo.id );
    
  }

onSelect(id: string): void {
  this.cargarMunicipiosDeptos(id);
  
}

}
