import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';






import { SettingsService, SharedService,
  SidebarService, UsuarioService,
  LoginGuardsGuard, SubirArhivoService, HospitalService, CountryService,
  StateService, IdentificationTypeService, MedicoService, AdminGuard, CityService,
  SocialSecurityEntityService, CompanyPaymentService, CompanyInfoService, PaymentFrequencyService,
  PaymentMethodService, BankService, AccounttypeService, CompanyPayrollService, SpendingAccountService,
  CostCenterService, AreaService, SubsidiaryService, PositionService, EmployeeService, GenderService,
  VerificaTokenGuard, ContractRegimeService, EmployeeTypeService, WorkPlaceRisksService, ContractTypeService,
  SalaryTypeService, EmployeeContractService, EmployeeSalaryService, EmployeeJobService, EmployeePaymentService,
  EmployeeSocialSecurityService, WorkingHourService, EmployeeWorkingService,
  ContributorSubTypeService, ContributorTypeService } from './service.index';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],

  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    HospitalService,
    CountryService,
    CompanyInfoService,
    CompanyPaymentService,
    CompanyPayrollService,
    PaymentMethodService,
    PaymentFrequencyService,
    BankService,
    AccounttypeService,
    CostCenterService,
    AreaService,
    GenderService,
    SubsidiaryService,
    PositionService,
    SpendingAccountService,
    StateService,
    CityService,
    EmployeeService,
    ContractRegimeService,
    ContractTypeService,
    SalaryTypeService,
    EmployeeTypeService,
    EmployeeWorkingService,
    EmployeeContractService,
    EmployeeSalaryService,
    EmployeeJobService,
    EmployeePaymentService,
    EmployeeSocialSecurityService,
    WorkingHourService,
    WorkPlaceRisksService,
    ContributorSubTypeService,
    ContributorTypeService,
    SocialSecurityEntityService,
    IdentificationTypeService,
    MedicoService,
    LoginGuardsGuard,
    AdminGuard,
    VerificaTokenGuard,
    SubirArhivoService,
    ModalUploadService
  ],
  declarations: [],
 
})
export class ServiceModule { }
