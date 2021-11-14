import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ComboListService } from '../../../../services/combo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-local',
  templateUrl: './menu-local.component.html',
  styleUrls: ['./menu-local.component.css']
})
export class MenuLocalComponent implements OnInit {

  usuarios: any = [];

  inventarioMenu: boolean = false;
  centrosaludMenu: boolean = false;
  usuarioMenu: boolean = false;
  constructor(
    private auth: UserService,
    private comboList: ComboListService,
    private router: Router
  ) { }

  ngOnInit() {
    // $('ul').on('expanded.tree');

    this.informacionUsuario();
    }



  informacionUsuario() {

    this.auth.profile().subscribe(
      res => {
        this.usuarios = res;

      },

      err => {
        alert('Sesion Experiada..');
        this.router.navigateByUrl('/login');

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
