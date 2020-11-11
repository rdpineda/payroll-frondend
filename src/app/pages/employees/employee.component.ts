import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService} from '../../services/service.index';
import { EmployeeWorkingService} from '../../services/service.index';
import { EmployeeJobService} from '../../services/service.index';
import { EmployeePaymentService} from '../../services/service.index';
import { EmployeeSocialSecurityService} from '../../services/service.index';
import { CountryService } from '../../services/service.index';
import { StateService } from '../../services/service.index';
import { CityService } from '../../services/service.index';
import { GenderService } from '../../services/service.index';
import { EmployeeTypeService } from '../../services/service.index';
import { ContractRegimeService } from '../../services/service.index';
import { WorkingHourService } from '../../services/service.index';
import { WorkPlaceRisksService } from '../../services/service.index';
import { CostCenterService } from '../../services/service.index';
import { AreaService } from '../../services/service.index';
import { PositionService } from '../../services/service.index';
import { SubsidiaryService } from '../../services/service.index';
import { BankService } from '../../services/service.index';
import { AccounttypeService } from '../../services/service.index';
import { SocialSecurityEntityService } from '../../services/service.index';
import { ContributorTypeService } from '../../services/service.index';
import { ContributorSubTypeService } from '../../services/service.index';
import { CostCenter } from 'src/app/models/costCenter.model';

import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { SubirArhivoService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { EmployeeWorking } from '../../models/employeeWorking.model';
import { EmployeeJob } from '../../models/employeeJob.model';
import { EmployeePayment } from '../../models/employeePayment.model';
import { EmployeeSocialSecurity } from '../../models/employeeSocialSecurity.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee: any = {};
  // employeeWorking: EmployeeWorking[] = [];
  employeeWorking: any = {};
  employeeJob: EmployeeJob[] = [];
  employeePayment: EmployeePayment[] = [];
  employeeSocialSecurity: EmployeeSocialSecurity[] = [];
  paises: any = {};
  depto: any = {};
  municip: any = {};
  genero: any = {};
  employeeType: any = {};
  contractRegime: any = {};
  workingHour: any = {};
  workPlaceRisks: any = {};
  costCenter: any = {};
  area: any = {};
  position: any = {};
  subsidiary: any = {};
  bank: any = {};
  accountType: any = {};
  socialSecurityEntityHealth: any = {};
  socialSecurityEntityPension: any = {};
  socialSecurityEntitySeverance: any = {};
  contributorSubType: any = {};
  contributorType: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private _employeeService: EmployeeService,
              private _employeeWorkingService: EmployeeWorkingService,
              private _employeeJobService: EmployeeJobService,
              private _employeePaymentService: EmployeePaymentService,
              private _employeeSocialSecurityService: EmployeeSocialSecurityService,
              public _countryService: CountryService,
              public _stateService: StateService,
              public _cityService: CityService,
              public _modalUploadServices: ModalUploadService,
              public _usuarioService: UsuarioService,
              public _subirArchivoService: SubirArhivoService,
              public _genderService: GenderService,
              public _employeeTypeService: EmployeeTypeService,
              public _contractRegimeService: ContractRegimeService,
              public _workingHourService: WorkingHourService,
              public _workPlaceRisksService: WorkPlaceRisksService,
              public _costCenterService: CostCenterService,
              public _areaService: AreaService,
              public _positionService: PositionService,
              public _subsidiaryService: SubsidiaryService,
              public _bankService: BankService,
              public _accountTypeService: AccounttypeService,
              public _socialSecurityEntityService: SocialSecurityEntityService,
              public _contributorSubTypeService: ContributorSubTypeService,
              public _contributorTypeService: ContributorTypeService,
  ) { 
    this.activatedRoute.params.subscribe( params =>{
      this.cargarEmployees( params[ 'id' ]);
      this.cargarEmployeesWorking( params[ 'id' ]);
      this.cargarEmployeesJob ( params [ 'id' ]);
      this.cargarEmployeesPayment ( params [ 'id' ]);
      this.cargarEmployeesSocialSecurity ( params [ 'id' ]);
     
  });


}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
    this._modalUploadServices.notificacion
    .subscribe( () =>  this.cargarEmployees( params[ 'id' ]));
  });


    this.activatedRoute.params.subscribe( params =>{
  this._modalUploadServices.notificacion
  .subscribe( () =>  this.cargarEmployeesWorking( params[ 'id' ]));
});

    this.activatedRoute.params.subscribe( params =>{
  this._modalUploadServices.notificacion
  .subscribe( () =>  this.cargarEmployeesJob( params[ 'id' ]));
});

    this.activatedRoute.params.subscribe( params =>{
  this._modalUploadServices.notificacion
  .subscribe( () =>  this.cargarEmployeesPayment( params[ 'id' ]));
});

    this.activatedRoute.params.subscribe( params =>{
  this._modalUploadServices.notificacion
  .subscribe( () =>  this.cargarEmployeesSocialSecurity( params[ 'id' ]));
});


  }


  cargarEmployees( id: string ) {
    this._employeeService.cargarEmployees( id )
        .subscribe( employee => {
          this.employee = employee;
          this.obtenerPaises( this.employee.idCountry );
          this.obtenerDepartamento(this.employee.idState);
          this.obtenerMunicipios(this.employee.idCity);
          this.obtenerGeneros(this.employee.idGender);
        });

  }

  cargarEmployeesWorking( id: string ) {
    this._employeeWorkingService.cargarEmployeeWorking( id )
        .subscribe( employeeWorking => {
          console.log('w', employeeWorking);
          this.employeeWorking = employeeWorking;
          this.obtenerEmployeeType( this.employeeWorking.idEmployeeType );
          this.obtenerContractRegime( this.employeeWorking.idContractRegime);
          this.obtenerWorkingHour( this.employeeWorking.idWorkingHour);
          this.obtenerWorkPlaceRisks( this.employeeWorking.idWorkPlaceRisks);
        });

  }

  cargarEmployeesJob( id: string ) {
    this._employeeJobService.cargarEmployeeJob( id )
        .subscribe( employeeJob => {
        this.employeeJob = employeeJob;
        this.obtenerCostCenter( this.employeeJob[0].idCostCenter );
        this.obtenerArea( this.employeeJob[0].idArea );
        this.obtenerPosition( this.employeeJob[0].idPosition );
        this.obtenerSubsidiary( this.employeeJob[0].idSubsidiary );
         
        });

  }

  cargarEmployeesPayment( id: string ) {
    this._employeePaymentService.cargarEmployeePayment( id )
        .subscribe( employeePayment => {
        this.employeePayment = employeePayment;
        this.obtenerBank( this.employeePayment[0].idBank );
        this.obtenerAccountType( this.employeePayment[0].idAccountType );
        
         
        });

  }

  cargarEmployeesSocialSecurity( id: string ) {
    this._employeeSocialSecurityService.cargarEmployeeSocialSecurity( id )
        .subscribe( employeeSocialSecurity => {
          console.log('s', employeeSocialSecurity.length);
          this.employeeSocialSecurity = employeeSocialSecurity;
          this.obtenerSocialSecurityEntityHealth( this.employeeSocialSecurity[0].idEntityHealth );
          this.obtenerSocialSecurityEntityPension( this.employeeSocialSecurity[0].idEntityPension );
          this.obtenerSocialSecurityEntitySeverance( this.employeeSocialSecurity[0].idEntitySeverance);
          this.obtenerContributorType( this.employeeSocialSecurity[0].idContributorType);
          this.obtenerContributorSubType( this.employeeSocialSecurity[0].idContributorSubType);
         
        });

  }


  obtenerPaises( id: string)  {
    this._countryService.obtenerPaises( id )
        .subscribe( country => {
          this.paises = country;
          
  });
}

obtenerGeneros( id: string)  {
  this._genderService.obtenerGenero( id )
      .subscribe( gender => {
        this.genero = gender;
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

obtenerEmployeeType( id: string)  {
  this._employeeTypeService.obtenerTipoEmpleado( id )
      .subscribe( employeeType => {
        this.employeeType = employeeType;
});
}

obtenerContractRegime( id: string)  {
  this._contractRegimeService.obtenerTipoRegime( id )
      .subscribe( contractRegime => {
        this.contractRegime = contractRegime;
});
}

obtenerWorkingHour( id: string)  {
  this._workingHourService.obtenerHorarioLaboral( id )
      .subscribe( workingHour => {
        this.workingHour = workingHour;
});
}

obtenerWorkPlaceRisks( id: string)  {
  this._workPlaceRisksService.obtenerCentroTrabajo( id )
      .subscribe( workPlaceRisks => {
        this.workPlaceRisks = workPlaceRisks;
});
}

obtenerCostCenter( id: string)  {
  this._costCenterService.obtenerCostCenter( id )
      .subscribe( costCenter => {
        this.costCenter = costCenter;
});
}

obtenerArea( id: string)  {
  this._areaService.obtenerArea( id )
      .subscribe( area => {
        this.area = area;
});
}

obtenerPosition( id: string)  {
  this._positionService.obtenerPosition( id )
      .subscribe( position => {
        this.position = position;
});
}

obtenerSubsidiary( id: string)  {
  this._subsidiaryService.obtenerSubsidiary( id )
      .subscribe( subsidiary => {
        this.subsidiary = subsidiary;
});
}

obtenerBank( id: string)  {
  this._bankService.obtenerBanco( id )
      .subscribe( bank => {
        this.bank = bank;
});
}

obtenerAccountType( id: string)  {
  this._accountTypeService.obtenerTipoCuenta( id )
      .subscribe( accountType => {
        this.accountType = accountType;
});
}

obtenerSocialSecurityEntityHealth( id: string)  {
  this._socialSecurityEntityService.obtenerEntidadSS( id )
      .subscribe( socialSecurityEntityHealth => {
        this.socialSecurityEntityHealth = socialSecurityEntityHealth;
});
}

obtenerSocialSecurityEntityPension( id: string)  {
  this._socialSecurityEntityService.obtenerEntidadSS( id )
      .subscribe( socialSecurityEntityPension => {
        this.socialSecurityEntityPension = socialSecurityEntityPension;
});
}

obtenerSocialSecurityEntitySeverance( id: string)  {
  this._socialSecurityEntityService.obtenerEntidadSS( id )
      .subscribe( socialSecurityEntitySeverance => {
        this.socialSecurityEntitySeverance = socialSecurityEntitySeverance;
});
}

obtenerContributorSubType( id: string)  {
  this._contributorSubTypeService.obtenerSubTipoCotizante( id )
      .subscribe( contributorSubType => {
        this.contributorSubType = contributorSubType;
});
}

obtenerContributorType( id: string)  {
  this._contributorTypeService.obtenerTipoCotizante( id )
      .subscribe( contributorType => {
        this.contributorType = contributorType;
});
}




actualizarImagen( employee: Employee ){
  
  this._modalUploadServices.mostrarModal('employee', employee.id );
  
}

}
