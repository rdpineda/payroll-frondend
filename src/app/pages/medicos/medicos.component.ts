import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  // tslint:disable-next-line: variable-name
  constructor( public _medicoService: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this._medicoService.cargarMedicos()
      .subscribe( medicos => this.medicos = medicos);

  }

  buscarMedico( termino: string ){

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos( termino )
          .subscribe( medicos => this.medicos = medicos);

  }

    borrarMedico(medico: Medico){

    this._medicoService.borrarMedicos( medico._id )
        .subscribe( () => this.cargarMedicos());

  }

}
