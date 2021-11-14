import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-menu-visor-general',
  templateUrl: './menu-visor-general.component.html',
  styleUrls: ['./menu-visor-general.component.css']
})
export class MenuVisorGeneralComponent implements OnInit {

  inventarioMenu: boolean = false;
  centrosaludMenu: boolean = false;
  usuarioMenu: boolean = false;
  marcaMenu: boolean = false;
  equipoMenu: boolean = false;
  respuestoMenu: boolean = false;
  bibliotecaMenu: boolean = false;
 tecnicoMenu: boolean = false;
  constructor(
    private auth: UserService,
  ) { }

  ngOnInit() {
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
