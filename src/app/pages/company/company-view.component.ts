import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyInfoService } from '../../services/service.index';
import { CompanyService } from '../../services/service.index';
import { CompanyInfo } from 'src/app/models/companyInfo.model';
import { Country } from 'src/app/models/country.model';
import { State } from 'src/app/models/state.model';
import { City } from 'src/app/models/city.model';
import { CountryService } from '../../services/service.index';
import { StateService } from '../../services/service.index';
import { CityService } from '../../services/service.index';
import { SocialSecurityEntityService } from '../../services/service.index';
import { Company } from '../../models/company.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { SubirArhivoService } from '../../services/service.index';
import { PaymentFrequencyService } from '../../services/service.index';
import { PaymentMethodService } from '../../services/service.index';
import { BankService } from '../../services/service.index';
import { AccounttypeService } from '../../services/service.index';
import { CompanyPaymentService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.css']
})
export class CompanyViewComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  public date: Date = new Date();
  forma: FormGroup;
  company: any = {};
  public companyInfo: any = {};
  public companyPayment: any = {};
  empresaseleccionada: any = {};
  empresa: any = {};
  paises: any = {};
  depto: any = {};
  municip: any = {};
  caja: any = {};
  riesgo: any = {};
  paymentFrequency: any = {};
  paymentMethod: any = {};
  banks: any = {};
  accountType: any = {};
  

  constructor(
    public _companyInfoService: CompanyInfoService,
    public _companyService: CompanyService,
     public _router: Router,
     public _activatedRoute: ActivatedRoute,
     public _modalUploadServices: ModalUploadService,
     public _usuarioService: UsuarioService,
     public _subirArchivoService: SubirArhivoService,
     public _countryService: CountryService,
     public _stateService: StateService,
     public _cityService: CityService,
     public _socialSecurityEntityService: SocialSecurityEntityService,
     public _companyPaymentService: CompanyPaymentService,
     public _paymentFrequencyService: PaymentFrequencyService,
     public _paymentMethodService: PaymentMethodService,
     public _bankService: BankService,
     public _accounttypeService: AccounttypeService

  ) { 

    this.company = this._usuarioService.empresas;
    this.empresaseleccionada = localStorage.getItem('empresaseleccionada');
    

    if ( this.empresaseleccionada ){
      this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada'));
     
      
    } else {
      if(this.company.length > 1 ) {
        this.empresa =  JSON.parse(localStorage.getItem('empresaseleccionada'));
      } else {
        this.empresa =  JSON.parse(JSON.stringify(this.company[0]));
      }
    }

    this.cargarCompanyInfo( this.empresa.id );
    this.cargarCompanyPayment(this.empresa.id);
    this.cargarCompanySelect( this.empresa.id );
    
  }

  ngOnInit(): void {
    
    

    this._modalUploadServices.notificacion
    .subscribe( () => this.cargarCompanyInfo(this.empresa.id));
    
    this._modalUploadServices.notificacion
    .subscribe( () => this.cargarCompanySelect(this.empresa.id));
  }


  cargarCompanyInfo( id: string ) {
    this._companyInfoService.cargarCompanyInfo( id )
        .subscribe( company => {
          console.log('ec',  company );
          this.companyInfo = company;
          this.obtenerPaises( this.companyInfo.idCountry );
          this.obtenerDepartamento(this.companyInfo.idState);
          this.obtenerMunicipios(this.companyInfo.idCity);
          this.obtenerCajasCompensacion(this.companyInfo.idCompensationFund);
          this.obtenerEntidadRiesgos(this.companyInfo.idEntityRisks);
         
         /*  this.companyInfo.idCountry = company.idCountry.id; */
         
        });

  }

  cargarCompanyPayment( id: string ) {
    this._companyPaymentService.cargarCompanyPayment( id )
        .subscribe( company => {
          this.companyPayment = company;
          this.obtenerFrecuenciaPago( this.companyPayment.idPaymentFrequency );
          this.obtenerMetodoPago( this.companyPayment.idPaymentMethod );
          this.obtenerBancos( this.companyPayment.idBank );
          this.obtenerTipoCuentas( this.companyPayment.idAccountType);
        });

  }

  obtenerPaises( id: string)  {
    this._countryService.obtenerPaises( id )
        .subscribe( country => {
          this.paises = country;
          
  });
}

obtenerDepartamento( id: string)  {
  this._stateService.obtenerDepartamento( id )
      .subscribe( state => {
        this.depto = state;
});
}

obtenerMunicipios( id: string)  {
  this._cityService.obtenerMunicipio( id )
      .subscribe( city => {
        this.municip = city;
});
}

 obtenerCajasCompensacion( id: string)  {
  this._socialSecurityEntityService.obtenerEntidadSS( id )
      .subscribe( socialSecurityEntity => {
        this.caja = socialSecurityEntity;
});
} 

obtenerEntidadRiesgos( id: string)  {
  this._socialSecurityEntityService.obtenerEntidadSS( id )
      .subscribe( socialSecurityEntity => {
        console.log('c', socialSecurityEntity)
        this.riesgo = socialSecurityEntity;
});
}


obtenerFrecuenciaPago( id: string ) {
  this._paymentFrequencyService.obtenerFrecuenciaPago( id )
  .subscribe( resp => this.paymentFrequency = resp);
}

obtenerMetodoPago( id: string ) {
  this._paymentMethodService.obtenerMetodoPago( id )
  .subscribe( resp => this.paymentMethod = resp);
}

 obtenerBancos( id: string) {
  this._bankService.obtenerBanco( id )
  .subscribe( resp => this.banks = resp);
  
} 

obtenerTipoCuentas( id: string ) {
  this._accounttypeService.obtenerTipoCuenta( id )
  .subscribe( resp => this.accountType = resp);

}

  cargarCompanySelect( id: string ) {
    this._companyService.cargarCompanys( id )
        .subscribe( company => {
          this.company = company;
        });

  }

  actualizarImagen( companyInfo: CompanyInfo ){
  
    this._modalUploadServices.mostrarModal('companys', companyInfo.id );
    
  }


}
