import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SubsidiaryService} from '../../services/service.index';
import { CompanyService } from '../../services/service.index';
import { Subsidiary } from 'src/app/models/Subsidiary.model';
import { Company } from '../../models/company.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

declare var $: any;


@Component({
  selector: 'app-subsidiary',
  templateUrl: './subsidiary.component.html',
  styles: []
})

export class SubsidiaryComponent implements OnInit {

  // costCenter: any = {};
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  public date: Date = new Date();
  forma: FormGroup;
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  
  isActive = true;
  subsidiary: Subsidiary[] = [];

  
  // costCenter: CostCenter = new CostCenter('', '', '', '', '', '', true, this.date, this.date, '');
 

  constructor(private fb: FormBuilder,
    
              public _subsidiaryService: SubsidiaryService  ,
              public _companyService: CompanyService,
              public _router: Router,
              public _activatedRoute: ActivatedRoute,
              public _usuarioService: UsuarioService
              ) { 

      this.company = this._usuarioService.empresas;
      this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

      if ( this.empresaseleccionada ){
                  this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada'));
                } else {
                  if(this.company.length > 1 ) {
                    this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada'));
                  } else {
                    this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
                  }
                }


      this.cargarSubsidiary( this.empresa.id );
      this.cargarCompanySelect( this.empresa.id );

      this.crearFormulario();
     }

    
    get descripcionNoValido(){return this.forma.get('descripcion').invalid && this.forma.get('descripcion').touched}
    get estadoNoValido(){return this.forma.get('estado').invalid && this.forma.get('estado').touched}
    

  ngOnInit(): void {
    
  }



  crearFormulario(){
    this.forma = this.fb.group({
      descripcion: ['', Validators.required],
      estado    : ['true']
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
  
    const subsidiary = new Subsidiary(
     
      this.forma.value.descripcion,
      this.empresa.id,
      this.usuario.id,
      this.usuario.id,
      this.forma.value.estado,
  );

    this._subsidiaryService.crearSubsidiary( subsidiary )
  .subscribe( resp => {
    $('#subsidiaryModal').modal('hide');
    
    this.cargarSubsidiary( this.empresa.id );
    
  });

    this.forma.reset();
    this.crearFormulario();

  }



  cargarSubsidiary( id: string ) {
    this._subsidiaryService.cargarSubsidiary( id )
        .subscribe( subsidiary => {
          this.subsidiary = subsidiary;
        });

  }

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }

  buscarSubsidiary( termino: string){

    if ( termino.length <= 0 ){
      this.cargarSubsidiary(termino);
      return;
    }

    this._subsidiaryService.buscarSubsidiary( termino )
        .subscribe( resp => this.subsidiary = resp );
}


  guardarSubsidiary( subsidiary: Subsidiary){

    this._subsidiaryService.actualizarSubsidiary( subsidiary )
    
          .subscribe( () => this.cargarSubsidiary(this.empresa.id));
  }
  
  borrarSubsidiary( subsidiary: Subsidiary ){
  
    this._subsidiaryService.borrarSubsidiary( subsidiary.id )
          .subscribe ( () => this.cargarSubsidiary(this.empresa.id));
  
  }
  

}

