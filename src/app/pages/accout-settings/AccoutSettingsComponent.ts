import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';
import { DOCUMENT } from '@angular/common';
import { BrowserStack } from 'protractor/built/driverProviders';



@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(public _settings: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(theme: string, link: any) {
        this.aplicarCheck(link);

        this._settings.aplicarTheme( theme );
  }

  aplicarCheck( link: any){

    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores){
        ref.classList.remove('working');
    }
    link.classList.add('working');

  }

  colocarCheck(){
    const selectores: any = document.getElementsByClassName('selector');
    const theme = this._settings.ajustes.theme;

    for (const ref of selectores){
      if( ref.getAttribute('data-theme') === theme){
        ref.classList.add('working');
        break;
      }
  }

  }
}
