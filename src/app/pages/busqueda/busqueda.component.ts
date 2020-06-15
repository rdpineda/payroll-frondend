import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor( public ActivatedRoute: ActivatedRoute,
               public http: HttpClient) {

    ActivatedRoute.params
      .subscribe( params => {
        let termino = params['termino'];
        this.buscar( termino );

      });
   }

  ngOnInit(): void {
  }

buscar( termino: string ){

let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

this.http.get( url )
  .subscribe( (resp: any) =>{

    this.usuarios = resp.usuarios;
    this.medicos = resp.medicos;
    this.hospitales = resp.hospitales;

  });

}
}
