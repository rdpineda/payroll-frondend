import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor( public _hospitalService: HospitalService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe( () => this.cargarHospitales());
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
        .subscribe( resp => this.hospitales = resp );
      
  }

  buscarHospital( termino: string){

    if ( termino.length <= 0 ){
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino )
        .subscribe( resp => this.hospitales = resp );
}

guardarHospital( hospital: Hospital ){

  this._hospitalService.actualizarHospital( hospital )
        .subscribe( ()=> this.cargarHospitales());

}

borrarHospital( hospital: Hospital ){

  this._hospitalService.borrarHospital( hospital._id )
        .subscribe ( () => this.cargarHospitales());

}

crearHospital(){

   Swal.fire({
    title: 'Ingrese el nombre del Hospital',
    input: 'text',
    showCancelButton: true,
    inputValidator: (value) => {
      if ( !value || value.length === 0) {
        return 'No ha ingresado ningun dato';
      }
      this._hospitalService.crearHospital( value )
          .subscribe( () => this.cargarHospitales());
    }
  });

}

actualizarImagen( hospital: Hospital ){
  
  this._modalUploadService.mostrarModal('hospitales', hospital._id );

}

}

