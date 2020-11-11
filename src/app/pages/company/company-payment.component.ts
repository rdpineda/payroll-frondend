import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { CompanyInfo } from 'src/app/models/companyInfo.model' ;
import { HospitalService } from '../../services/service.index';
import { CompanyInfoService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Country } from 'src/app/models/country.model';
import { MedicoService } from '../../services/service.index';
import { CountryService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-company-payment',
  templateUrl: './company-payment.component.html',
  styles: []
})
export class CompanyPaymentComponent implements OnInit {

  hospitales: Hospital[] = [];
  paises: Country[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital ('');
  companyInfo: CompanyInfo = new CompanyInfo ('');

  constructor( public _hospitalService: HospitalService,
    public _companyInfoService: CompanyInfoService,
    public _medicoService: MedicoService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute,
    public _modalUploadServices: ModalUploadService,
    public _countryService: CountryService
    ) {

}

  ngOnInit(): void {
  }

}
