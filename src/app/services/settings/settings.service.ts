import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

ajustes: Ajustes = {
  themeUrl: 'assets/css/colors/default.css',
  theme: 'default'
};

  // tslint:disable-next-line: variable-name
  constructor(@Inject(DOCUMENT) private _document) { 

    this.cargarAjustes();
  }

  guardarAjustes(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTheme(this.ajustes.theme);
    }else{
      this.aplicarTheme(this.ajustes.theme);
    }
  }

  aplicarTheme(theme: string){
    let url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.ajustes.theme = theme;
    this.ajustes.themeUrl = url;

    this.guardarAjustes();

  }
}

interface Ajustes {
  themeUrl: string;
  theme: string;
}
