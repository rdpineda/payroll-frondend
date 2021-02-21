import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CostCenterService} from '../../services/service.index';
import { SpendingAccountService} from '../../services/service.index';
import { CompanyService } from '../../services/service.index';
import { CostCenter } from 'src/app/models/costCenter.model';
import { SpendingAccount } from 'src/app/models/spendingAccount.model';
import { Company } from '../../models/company.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

declare var $: any;



@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styles: []
})

export class CostCenterComponent implements OnInit {

  // costCenter: any = {};
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  public date: Date = new Date();
  forma: FormGroup;
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  cuentagasto: SpendingAccount[] = [];
  isActive = true;
  costCenter: CostCenter[] = [];

  
  // costCenter: CostCenter = new CostCenter('', '', '', '', '', '', true, this.date, this.date, '');
 

  constructor(private fb: FormBuilder,
    
              public _costCenterService: CostCenterService  ,
              public _companyService: CompanyService,
              public _router: Router,
              public _activatedRoute: ActivatedRoute,
              public _usuarioService: UsuarioService,
              public _spendingAccountService: SpendingAccountService
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


      this.cargarCostCenter( this.empresa.id );
      this.cargarCompanySelect( this.empresa.id );

      this.crearFormulario();
     }

    get codigoNoValido(){return this.forma.get('codigo').invalid && this.forma.get('codigo').touched}
    get descripcionNoValido(){return this.forma.get('descripcion').invalid && this.forma.get('descripcion').touched}
    get cuentagastoNoValido(){return this.forma.get('cuentagasto').invalid && this.forma.get('cuentagasto').touched}
    get estadoNoValido(){return this.forma.get('estado').invalid && this.forma.get('estado').touched}
    

  ngOnInit(): void {

    this.cargarCuentaGasto();
    console.log(this.cargarCuentaGasto());
    
  }



  crearFormulario(){
    this.forma = this.fb.group({
      codigo     : ['', Validators.required],
      descripcion: ['', Validators.required],
      cuentagasto: ['' , Validators.required],
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
  
    const centroCosto = new CostCenter(
      this.forma.value.codigo,
      this.forma.value.descripcion,
      this.forma.value.cuentagasto,
      this.empresa.id,
      this.usuario.id,
      this.usuario.id,
      this.forma.value.estado,
  );

    this._costCenterService.crearCostCenter( centroCosto )
  .subscribe( resp => {
    console.log(centroCosto)
    $('#cecoModal').modal('hide');
    
    this.cargarCostCenter( this.empresa.id );
    
  });

    this.forma.reset();
    this.crearFormulario();

  }



  cargarCostCenter( id: string ) {
    this._costCenterService.cargarCostCenter( id )
        .subscribe( costCenter => {
          this.costCenter = costCenter;
        });

  }

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }

  buscarCentroCosto( termino: string){

    if ( termino.length <= 0 ){
      this.cargarCostCenter(termino);
      return;
    }

    this._costCenterService.buscarCostCenter( termino )
        .subscribe( resp => this.costCenter = resp );
}

  cargarCuentaGasto() {
    this._spendingAccountService.cargarCuentaGastos()
    .subscribe( resp => this.cuentagasto = resp);
    
 
  }

  guardarCentroCostos( centroCosto: CostCenter ){

    this._costCenterService.actualizarCostCenter( centroCosto )
    
          .subscribe( () => this.cargarCostCenter(this.empresa.id));
    console.log(centroCosto);
  
  }
  
  borrarCentroCostos( centroCosto: CostCenter ){
  
    this._costCenterService.borrarCostCenter( centroCosto.id )
          .subscribe ( () => this.cargarCostCenter(this.empresa.id));
  
  }
  
 crearCentroCostos(){
  
    
  }


}