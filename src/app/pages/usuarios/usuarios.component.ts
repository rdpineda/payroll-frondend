import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros:number = 0;
  cargando: boolean = true;

  constructor( public _usuarioService: UsuarioService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios());
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
        .subscribe( (resp: any) =>{
          console.log(resp);
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
        });


  }

  cambiarDesde( valor: number){

    let desde = this.desde + valor;
    if ( desde >= this.totalRegistros){
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ){

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
          .subscribe( (usuarios: Usuario[]) =>{
            this.usuarios = usuarios;
            this.cargando = false;
          });

  }

  borrarUsuario( usuario: Usuario ){

    if ( usuario.id === this._usuarioService.usuario.id ) {

      Swal.fire({
        title: 'Importante',
        text: 'No se puede eliminar el usuario logueado',
        icon: 'error'
      });
      return;
    }
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Desea Eliminar a ' + usuario.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario( usuario.id)
            .subscribe( resp =>{
              this.cargarUsuarios();
            });

        Swal.fire(
          'Eliminar!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })

  }

  guardarUsuario( usuario: Usuario ){

    this._usuarioService.actualizarUsuario ( usuario )
        .subscribe();

  }

  mostrarModal( id: string ){
    this._modalUploadService.mostrarModal( 'usuarios', id);

  }

}


