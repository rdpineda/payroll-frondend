import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PositionService} from '../../services/service.index';
import { CompanyService } from '../../services/service.index';
import { Position } from 'src/app/models/position.model';
import { Company } from '../../models/company.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

declare var $: any;



@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styles: []
})

export class PositionComponent implements OnInit {

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
  position: Position[] = [];

  
  // costCenter: CostCenter = new CostCenter('', '', '', '', '', '', true, this.date, this.date, '');
 

  constructor(private fb: FormBuilder,
    
              public _positionService: PositionService  ,
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


      this.cargarPosition( this.empresa.id );
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
  
    const position = new Position(
     
      this.forma.value.descripcion,
      this.empresa.id,
      this.usuario.id,
      this.usuario.id,
      this.forma.value.estado,
  );

    this._positionService.crearPosition( position )
  .subscribe( resp => {
    $('#positionModal').modal('hide');
    
    this.cargarPosition( this.empresa.id );
    
  });

    this.forma.reset();
    this.crearFormulario();

  }



  cargarPosition( id: string ) {
    this._positionService.cargarPosition( id )
        .subscribe( position => {
          this.position = position;
        });

  }

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }

  buscarPosition( termino: string){

    if ( termino.length <= 0 ){
      this.cargarPosition(termino);
      return;
    }

    this._positionService.buscarPosition( termino )
        .subscribe( resp => this.position = resp );
}


  guardarPosition( position: Position){

    this._positionService.actualizarPosition( position )
    
          .subscribe( () => this.cargarPosition(this.empresa.id));
  }
  
  borrarPosition( position: Position ){
  
    this._positionService.borrarPosition( position.id )
          .subscribe ( () => this.cargarPosition(this.empresa.id));
  
  }
  

}

