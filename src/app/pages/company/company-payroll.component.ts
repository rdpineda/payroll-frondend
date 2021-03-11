import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Company } from 'src/app/models/company.model' ;
import { HospitalService } from '../../services/service.index';
import { CompanyInfoService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Country } from 'src/app/models/country.model';
import { MedicoService } from '../../services/service.index';
import { CountryService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-company-payroll',
  templateUrl: './company-payroll.component.html',
  styles: []
})
export class CompanyPayrollComponent implements OnInit {

  hospitales: Hospital[] = [];
  paises: Country[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital ('');
  company: Company = new Company ('');

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
