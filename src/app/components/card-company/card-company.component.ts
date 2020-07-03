import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

@Component({
  selector: 'app-card-company',
  templateUrl: './card-company.component.html'
})
export class CardCompanyComponent implements OnInit {

  @Input() company: any = {};
  @Input() index: number;

  @Output() companySelect: EventEmitter<number>;

  constructor( private router: Router,
               public _modalUploadService: ModalUploadService ) { 

    this.companySelect = new EventEmitter();
  }

  ngOnInit(): void {
  }

  verCompany(){

    // this.router.navigate( ['/employee',this.index] );
   this.companySelect.emit(this.index);
  }

   ingresar(){
       this.companySelect.emit(this.index);
    }

}
