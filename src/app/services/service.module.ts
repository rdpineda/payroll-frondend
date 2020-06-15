import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';





import { SettingsService, SharedService,
  SidebarService, UsuarioService,
  LoginGuardsGuard, SubirArhivoService, HospitalService,  MedicoService, AdminGuard,
  VerificaTokenGuard } from './service.index';




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
