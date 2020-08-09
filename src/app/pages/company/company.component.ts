
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { CompanyInfo } from 'src/app/models/companyInfo.model' ;
import { HospitalService } from '../../services/service.index';
import { CompanyInfoService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styles: []
})
export class CompanyComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital ('');
  companyInfo: CompanyInfo = new CompanyInfo ('');
  
  

  constructor( public _hospitalService: HospitalService,
               public _companyInfoService: CompanyInfoService,
               public _medicoService: MedicoService,
               public _router: Router,
               public _activatedRoute: ActivatedRoute,
               public _modalUploadServices: ModalUploadService
               ) {


            


/* const id = 'fb1bd83c0-d532c-11ea-a379-ef24db4f04a8';
this.cargarCompany( id ); */


 /*  _activatedRoute.params.subscribe( params => {
    const id = params['id'];
    if ( id !== 'nuevo') {
      console.log('cargando medico constructor');
      this.cargarCompany( id );
    }
  }); */
  }

  ngOnInit(): void {
    
    /* this._companyInfoService.cargarCompanyInfo( id )
    .subscribe( company => {
      this.companyInfo = company;
    }); */

   /*  this._modalUploadServices.notificacion
        .subscribe( resp => {
            this.companyInfo.img = resp.companyInfo.img;
            console.log(resp);
        }); */
  }

  /*  cargarCompany( id: string ) {
    this._companyInfoService.cargarCompanyInfo( id )
        .subscribe( company => {
          this.companyInfo = company;
         
        });

  }  */

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
