import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConceptService} from '../../services/service.index';
import { AccumulatorService} from '../../services/service.index';
import { ConceptCategoryService} from '../../services/service.index';
import { CompanyService } from '../../services/service.index';
import { Concept } from 'src/app/models/concept.model';
import { Accumulator } from 'src/app/models/accumulator.model';
import { ConceptCategory } from 'src/app/models/conceptCategory.model';
import { Company } from '../../models/company.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

declare var $: any;
@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styles: []
})
export class ConceptComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  public date: Date = new Date();
  forma: FormGroup;
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  categoria: ConceptCategory[] = [];
  isActive = true;
  concept: Concept[] = [];
  accumulator: Accumulator[] = [];
  tipo = '0f91a6e0-8192-4a2e-8022-989257fc2896';
  categoriaId = 'd4a2e32b-d8a1-49ec-a027-fd11187937d1';

  constructor(
    private fb: FormBuilder,
    
              public _conceptService: ConceptService  ,
              public _accumulatorService: AccumulatorService  ,
              public _companyService: CompanyService,
              public _router: Router,
              public _activatedRoute: ActivatedRoute,
              public _usuarioService: UsuarioService,
              public _conceptCategory: ConceptCategoryService
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

                this.cargarConceptSalary(this.empresa.id);
                this.cargarAccumulator();
                this.cargarCompanySelect( this.empresa.id );
                this.crearFormulario();
              }
         
             get codigoNoValido(){return this.forma.get('codigo').invalid && this.forma.get('codigo').touched}
             get descripcionNoValido(){return this.forma.get('descripcion').invalid && this.forma.get('descripcion').touched}
             get cuentaNoValido(){return this.forma.get('cuenta').invalid && this.forma.get('cuenta').touched}
             get contrapartidaNoValido(){return this.forma.get('contrapartida').invalid && this.forma.get('contrapartida').touched}
             get categoriaNoValido(){return this.forma.get('categoria').invalid && this.forma.get('categoria').touched}
             get tipoNoValido(){return this.forma.get('tipo').invalid && this.forma.get('tipo').touched}
             get estadoNoValido(){return this.forma.get('estado').invalid && this.forma.get('estado').touched}
            //  get codeNoValido(){return this.forma.get('code').invalid && this.forma.get('code').touched}

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.fb.group({
      codigo     : ['', Validators.required],
      descripcion: ['', Validators.required],
      cuenta: [''],
      contrapartida: [''],
      // code   : ['', Validators.required],
      /* categoria: ['', Validators.required],
      tipo: ['', Validators.required], */
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
  
    const concepto = new Concept(
      this.forma.value.codigo,
      this.forma.value.descripcion,
      this.empresa.id,
      this.forma.value.cuenta,
      this.forma.value.contrapartida,
      this.tipo,
      this.categoriaId,
      this.usuario.id,
      this.usuario.id,
      this.forma.value.estado,
      this.forma.value.code,
  );

  
  console.log('concepto',concepto)
  this._conceptService.crearConcept( concepto )
  .subscribe( resp => {
    console.log('concepto',resp)
    $('#conceptoModal').modal('hide');
   
    
    /* this.cargarConceptSalary( this.empresa.id ); */

    this.cargarConceptSalary(this.empresa.id);
    // $('#acumuladorModal').modal('show');
  
  });

    this.forma.reset();
    this.crearFormulario();

  } 

  cargarConceptSalary(id: string) {
    this._conceptService.obtenerConceptSalary(id)
        .subscribe( concept => {
        
          this.concept = concept;
        });

  }

  cargarAccumulator() {
    this._accumulatorService.cargarAcumuladores()
        .subscribe( accumulator => {
          
          this.accumulator = accumulator;
          console.log('accumulator',this.accumulator )
        });

  }


  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }

  guardarConcept( concepto: Concept ){

    this._conceptService.actualizarConcept( concepto )
    
          .subscribe( () => this.cargarConceptSalary(this.empresa.id));
  
  
  }

  crearConcept(){
  
    
  }


}
