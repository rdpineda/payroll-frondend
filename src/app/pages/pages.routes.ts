import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';

import { AccoutSettingsComponent } from './accout-settings/AccoutSettingsComponent';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardsGuard } from '../services/guards/login-guards.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { EmployeesComponent } from './employees/employees.component';
import { CompanyComponent } from './company/company.component';
import { CompanyPaymentComponent } from './company/company-payment.component';
import { CompanyPayrollComponent } from './company/company-payroll.component';
import { CompanyViewComponent } from './company/company-view.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { EditEmployeeWorkingComponent } from './employees/edit-employee/edit-employee-working.component';
import { EditEmployeeContractComponent } from './employees/edit-employee/edit-employee-contract.component';
import { EditEmployeeSalaryComponent } from './employees/edit-employee/edit-employee-salary.component';
import { EditEmployeeJobComponent } from './employees/edit-employee/edit-employee-job.component';
import { EditEmployeePaymentComponent } from './employees/edit-employee/edit-employee-payment.component';
import { EditEmployeeSocialSecurityComponent } from './employees/edit-employee/edit-employee-social-security.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { MedicoComponent } from './medicos/medico.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { AreaComponent } from './area/area.component';
import { SubsidiaryComponent } from './subsidiary/subsidiary.component';
import { PositionComponent } from './position/position.component';
import { ConceptComponent } from './concept/concept.component';
import { EmployeeComponent } from './employees/employee.component';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/service.index';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';



const pagesRoutes: Routes = [
        {     path: 'dashboard',
            component: DashboardComponent,
            // canActivate: [ VerificaTokenGuard ],
            data: { titulo: 'Dashboard' }
        },
        { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }},
      
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
        { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXjs' }},
        { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajuste del Tema' }},
        { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' }},
        { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' }},

        //Mantenimientos
        { path: 'usuarios',
            component: UsuariosComponent,
             canActivate: [ AdminGuard ],
            data: { titulo: 'Usuarios' }
        },
        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' }},
        { path: 'companyCeco/:id/centroCostos', component: CostCenterComponent, data: { titulo: 'Centro de Costos' }},
        { path: 'companyArea/:id/area', component: AreaComponent, data: { titulo: 'Areas' }},
        { path: 'companySubsidiary/:id/Subsidiary', component: SubsidiaryComponent, data: { titulo: 'Sucursales' }},
        { path: 'companyPosition/:id/Position', component: PositionComponent, data: { titulo: 'Cargos' }},
        { path: 'companyConcept/:id/Concept', component: ConceptComponent, data: { titulo: 'Conceptos' }},
        { path: 'company/:id/Edit', component: CompanyComponent, data: { titulo: 'Company' }},
        { path: 'company/:id', component: CompanyViewComponent, data: { titulo: 'Company' }},
        { path: 'companyPayment/:id/Edit', component: CompanyPaymentComponent, data: { titulo: 'Company' }},
        { path: 'companyPayroll/:id/Edit', component: CompanyPayrollComponent, data: { titulo: 'Company' }},
        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' }},
        { path: 'employees', component: EmployeesComponent, data: { titulo: 'Empleados' }},
        { path: 'employee/:id', component: EmployeeComponent, data: { titulo: 'Actualizar Empleados' }},
        // { path: 'employeeWorking/:id/Edit', component: EditEmployeeWorkingComponent, data: { titulo: 'Actualizar Empleados' }},
       /*  { path: 'employees/:new', component: NewEmployeeComponent, data: { titulo: 'Nuevo Empleado' }}, */
        { path: 'employee/:id/Personal', component: EditEmployeeComponent, data: { titulo: 'Nuevo Empleados' }},
        { path: 'employee/:id/Edit', component: EditEmployeeComponent, data: { titulo: 'Actualizar Empleados' }},
        { path: 'employeeWorking/:id/Edit', component: EditEmployeeWorkingComponent, data: { titulo: 'Actualizar Empleados' }},
        { path: 'employeeJob/:id/Edit', component: EditEmployeeJobComponent, data: { titulo: 'Actualizar Empleados' }},
        { path: 'employeePayment/:id/Edit', component: EditEmployeePaymentComponent, data: { titulo: 'Actualizar Empleados' }},
        { path: 'employeeSocialSecurity/:id/Edit', component: EditEmployeeSocialSecurityComponent, data: { titulo: 'Actualizar Empleados' }},
        { path: 'employee/:id/:Employee/working', component: EditEmployeeWorkingComponent, data: { titulo: 'Nuevo Empleados' }},
        { path: 'employee/:id/:Employee/contract', component: EditEmployeeContractComponent, data: { titulo: 'Nuevo Empleados' }},
        { path: 'employee/:id/:Employee/salary', component: EditEmployeeSalaryComponent, data: { titulo: 'Nuevo Empleados' }},
        { path: 'employee/:id/:Employee/job', component: EditEmployeeJobComponent, data: { titulo: 'Nuevo Empleados' }},
        { path: 'employee/:id/:Employee/payment', component: EditEmployeePaymentComponent, data: { titulo: 'Nuevo Empleados' }},
    { path: 'employee/:id/:Employee/socialSecurity', component:  EditEmployeeSocialSecurityComponent, data: { titulo: 'Nuevo Empleados' }},
        { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medicos' }},
        { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
