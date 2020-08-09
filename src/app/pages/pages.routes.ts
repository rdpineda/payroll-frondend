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
import { CompanyComponent } from './company/company.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/service.index';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';



const pagesRoutes: Routes = [
        {     path: 'dashboard',
            component: DashboardComponent,
            canActivate: [ VerificaTokenGuard ],
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
        { path: 'company/:id', component: CompanyComponent, data: { titulo: 'Company' }},
        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' }},
        { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medicos' }},
        { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
