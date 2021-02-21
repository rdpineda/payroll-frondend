import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styles: []
})
export class EditEmployeeComponent implements OnInit {

  boton: any = false;
  constructor(
    public activatedRoute: ActivatedRoute,
  ) { 
    
    this.activatedRoute.params.subscribe( params => {
      const id = params['id'];
      
      if ( id !== 'new') {
       this.boton = true;
       console.log('boton', this.boton);
        
      } else {
        this.boton = false;
        console.log('boton', this.boton);
      }
    });
  }

  ngOnInit(): void {
  }



  

}



