import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../../services/service.index';
import { Employee } from 'src/app/models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styles: []
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  busqueda = '';
  company: any;
  empresaseleccionada: any = {};
  usuario: any = {};
  empresa: any = {};
  desde = 0;
  totalRegistros = 0;

  constructor( public _employeeService:EmployeeService,
               public router: Router,
               public activateRoute: ActivatedRoute,
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

                          
                          this.cargarEmployees( this.empresa.id );

               }



  ngOnInit(){
    
    
    
   // this.employees = this._employeesService.searchemployee('termino');

    /* this.activateRoute.params.subscribe( params =>{
    this.employees = this._employeesService.searchemployee( params['termino']); 
  });*/
    
     }

  veremployee( idx: number ){
  
    this.router.navigate( ['/employee', idx] );
    
  }

  searchemployee( termino: string ) {

    
    // console.log(termino);
    //this.router.navigate( ['/searchemployee',termino] );
  }

  cargarEmployees( id: string ) {
    this._employeeService.cargarEmployeeCompany( id, this.desde )
        .subscribe( (employee: any) => {
          this.totalRegistros = employee.total;
          this.employees = employee.employee;
         
        });

  }

  newemployee(){
    // console.log(termino);
    this.router.navigate( ['/newemployee'] );
  }


  buscarEmployees( termino: string){

    if ( termino.length <= 0 ){
      this.cargarEmployees( this.empresa.id);
      return;
    }

    this._employeeService.buscarEmployees( termino )
        .subscribe( resp => this.employees = resp );
}

cambiarDesde( valor: number){

  let desde = this.desde + valor;
  if ( desde >= this.totalRegistros){
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarEmployees( this.empresa.id);
}

}