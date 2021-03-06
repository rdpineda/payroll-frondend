import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';




// Rutas
import { APP_ROUTES } from './app.routes';

// modulos

import { PagesModule } from './pages/pages.module';


// temporal

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// servicios

import { PipesModule } from './pipes/pipes.module';

import { ServiceModule } from './services/service.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CompanysComponent } from './login/companys.component';



import { RegisterComponent } from './login/register.component';

import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';




















@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    CompanysComponent,
   
    
    
    
 
    
    
  
   
  ],
  imports: [
    BrowserModule,
    //PagesModule,
   APP_ROUTES,
   FormsModule,
   ReactiveFormsModule,
   ServiceModule,
   SweetAlert2Module,
   HttpClientModule,
   SharedModule,
   PipesModule
  ],
  exports: [
    CompanysComponent
],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
