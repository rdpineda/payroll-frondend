import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-employee',
  templateUrl: './card-employee.component.html',
  styles: []
})
export class CardEmployeeComponent implements OnInit {

  @Input() employee: any ={};
  @Input() index: number;

  @Output() employeeSelect: EventEmitter<number>;

  constructor( private router: Router ) { 

   

    this.employeeSelect = new EventEmitter();
  }

  ngOnInit(): void {
  }

  viewEmployee(){

    // this.router.navigate( ['/employee',this.index] );
   this.employeeSelect.emit(this.index);
   
  }

}
