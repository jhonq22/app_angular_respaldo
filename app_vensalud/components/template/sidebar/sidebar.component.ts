import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ComboListService } from '../../../services/combo.service';
declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarios: any = [];
  ente: any = [];
  inventarioMenu: boolean = false;
  centrosaludMenu: boolean = false;
  usuarioMenu: boolean = false;
  


  constructor
 (
    private auth: UserService,
    private router: Router,
    private comboList: ComboListService,
  ) { }

  ngOnInit() {
    // $('ul').on('expanded.tree');

    this.informacionUsuario();
    }



  informacionUsuario() {

    this.auth.profile().subscribe(
      res => {
        this.usuarios = res;
        console.log(this.usuarios);
        this.comboList.getEnte(this.usuarios.user.ente_id)
          .subscribe(
                     respuesta =>
                       {
                          // console.log('ente:', respuesta);
                          this.ente = respuesta;
                        },
                   );
      },

      err => {
        alert('Sesion Experiada..');
        if (err.status === 0)
        {
          Swal.fire(
            'Error!',
            'El servidor no esta activo, no podra ver los datos...',
            'error'
          );
          this.router.navigateByUrl('/login');

        }
        

      }
    );


  }


  UsuarioMenu() {
    this.usuarioMenu = !this.usuarioMenu;
}

InventarioMenu() {
  this.inventarioMenu = !this.inventarioMenu;
}

  logout() {
    this.auth.logout();
  }
}
