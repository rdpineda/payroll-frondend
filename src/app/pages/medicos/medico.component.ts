import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital ('');

  constructor( public _hospitalService: HospitalService,
               public _medicoService: MedicoService,
               public _router: Router,
               public _activatedRoute: ActivatedRoute,
               public _modalUploadServices: ModalUploadService) {

  _activatedRoute.params.subscribe( params => {
    const id = params['id'];
    if ( id !== 'nuevo') {
      console.log('cargando medico constructor');
      this.cargarMedico( id );
    }
  });
  }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales);

    this._modalUploadServices.notificacion
        .subscribe( resp => {
            this.medico.img = resp.medico.img;
        });
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id )
        .subscribe( medico => {
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambioHospital( this.medico.hospital );
        });

  }

  guardarMedico( f: NgForm ) {

    if ( f.invalid) {
      return;
    }

    this._medicoService.guardarMedicos( this.medico )
        .subscribe( medico => {
         this.medico._id = medico._id;
         this._router.navigate(['/medico', medico._id]);
        });

  }

  cambioHospital( id: string ) {
     this._hospitalService.obtenerHospital( id )
        .subscribe( hospital => this.hospital = hospital);
  }

  cambiarFoto(){
    this._modalUploadServices.mostrarModal( 'medicos', this.medico._id )
  }

}
