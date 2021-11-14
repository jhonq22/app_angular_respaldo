import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-estadal',
  templateUrl: './menu-estadal.component.html',
  styleUrls: ['./menu-estadal.component.css']
})
export class MenuEstadalComponent implements OnInit {

  usuarios: any = {};
  idusuario = '';
  estadalusuario = '';
  inventarioMenu: boolean = false;
  centrosaludMenu: boolean = false;
  usuarioMenu: boolean = false;
  bibliotecaMenu: boolean = false;
  constructor(
    private auth: UserService,
    private router: Router
  ) { }



  ngOnInit() {

    this.auth.profile().subscribe(
      res => {
        this.usuarios = res;
        this.idusuario = this.usuarios.user.id;
        this.estadalusuario = this.usuarios.user.estado_id;


      },
    );
    
      err => {
        alert('Sesion Experiada..');
        this.router.navigateByUrl('/login');

      }
    
    
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
