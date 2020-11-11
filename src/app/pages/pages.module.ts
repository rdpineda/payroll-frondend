import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//ng2-charts
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

import { PAGES_ROUTES } from './pages.routes';



import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/AccoutSettingsComponent';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CompanyComponent } from './company/company.component';
import { InfoCompanyComponent } from '../components/info-company/info-company.component';
import { PersonalEmployeeComponent } from '../components/personal-employee/personal-employee.component';
import { WorkingEmployeeComponent } from '../components/working-employee/working-employee.component';
import { ContractEmployeeComponent } from '../components/contract-employee/contract-employee.component';
import { SalaryEmployeeComponent } from '../components/salary-employee/salary-employee.component';
import { PaymentEmployeeComponent } from '../components/payment-employee/payment-employee.component';
import { JobEmployeeComponent } from '../components/job-employee/job-employee.component';
import { SocialSecurityEmployeeComponent } from '../components/social-security-employee/social-security-employee.component';
import { PaymentcompanyComponent } from '../components/paymentcompany/paymentcompany.component';
import { PayrollCompanyComponent } from '../components/payroll-company/payroll-company.component';
import { CompanyViewComponent } from './company/company-view.component';
import { CompanyPaymentComponent } from './company/company-payment.component';
import { CompanyPayrollComponent } from './company/company-payroll.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { AreaComponent } from './area/area.component';
import { SubsidiaryComponent } from './subsidiary/subsidiary.component';
import { PositionComponent } from './position/position.component';
import { ConceptComponent } from './concept/concept.component';
import { EmployeesComponent } from './employees/employees.component';
import { CardEmployeeComponent } from '../components/card-employee/card-employee.component';
import { EmployeeComponent } from './employees/employee.component';

import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { EditEmployeeWorkingComponent } from './employees/edit-employee/edit-employee-working.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { EditEmployeeContractComponent } from './employees/edit-employee/edit-employee-contract.component';
import { EditEmployeeSalaryComponent } from './employees/edit-employee/edit-employee-salary.component';

import { EditEmployeeJobComponent } from './employees/edit-employee/edit-employee-job.component';
import { EditEmployeePaymentComponent } from './employees/edit-employee/edit-employee-payment.component';
import { EditEmployeeSocialSecurityComponent } from './employees/edit-employee/edit-employee-social-security.component';





@NgModule({
    declarations: [
        //PagesComponent,
        DashboardComponent,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        //ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent,
        CompanyComponent,
        InfoCompanyComponent,
        PaymentcompanyComponent,
        CardEmployeeComponent,
        PayrollCompanyComponent,
        CompanyViewComponent,
        CompanyPaymentComponent,
        CompanyPayrollComponent,
        PersonalEmployeeComponent,
        WorkingEmployeeComponent,
        ContractEmployeeComponent,
        SalaryEmployeeComponent,
        JobEmployeeComponent,
        SocialSecurityEmployeeComponent,
        PaymentEmployeeComponent,
        CostCenterComponent,
        AreaComponent,
        SubsidiaryComponent,
        PositionComponent,
        ConceptComponent,
        EmployeesComponent,
        EmployeeComponent,
        EditEmployeeComponent,
        EditEmployeeWorkingComponent,
        NewEmployeeComponent,
        EditEmployeeContractComponent,
        EditEmployeeSalaryComponent,
        EditEmployeeJobComponent,
        EditEmployeePaymentComponent,
        EditEmployeeSocialSecurityComponent
       
    ],

    exports: [
        DashboardComponent,
        ProgressComponent
        
    ],

    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        PipesModule,
        CommonModule,
    ]


})

export class PagesModule { }
