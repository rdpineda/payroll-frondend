import { Component, OnInit, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor( @inject(DOCUMENT) private _document) { }

  ngOnInit(): void {
  }

  cambiarColor(theme: string){


    let url = `assets/css/colors/${theme}.css`;
        this._document.getElementById('theme').setAttribute('href', url)

  }


}
