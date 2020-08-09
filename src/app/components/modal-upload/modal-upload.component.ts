import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { SubirArhivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  @Input() imagenS: any;
  imagenTemp: string | ArrayBuffer;

  @Output() public imagenSelect: EventEmitter<any> =  new EventEmitter();
  


  constructor( public _subirArchivoService: SubirArhivoService,
               public _modalUploadService: ModalUploadService) { 

                this.imagenSelect = new EventEmitter();
               }

  ngOnInit(): void {
  }

  verImagen(){

    // this.router.navigate( ['/employee',this.index] );
   this.imagenSelect.emit({imagenS: this.imagenSubir});
  }
 
  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImagen( archivo: File ){

    if ( !archivo ){
        this.imagenSubir = null;
        return;
    }

    if ( archivo.type.indexOf('image') < 0 ){
      Swal.fire({
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error'
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL ( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;


  }

  subirImagen(){
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
        .then( resp =>{

          this._modalUploadService.notificacion.emit( resp );
          this.cerrarModal();
          console.log('modal', this.imagenSubir);
        
        })
        .catch(resp =>{
          console.log('error en la carga');
        });
  }



}
