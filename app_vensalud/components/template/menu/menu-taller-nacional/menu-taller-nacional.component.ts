import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-menu-taller-nacional',
  templateUrl: './menu-taller-nacional.component.html',
  styleUrls: ['./menu-taller-nacional.component.css']
})
export class MenuTallerNacionalComponent implements OnInit {

  inventarioMenu: boolean = false;
  centrosaludMenu: boolean = false;
  usuarioMenu: boolean = false;
  marcaMenu: boolean = false;
  equipoMenu: boolean = false;
  respuestoMenu: boolean = false;
  bibliotecaMenu: boolean = false;

  constructor( private auth: UserService,) { }

  ngOnInit() {
    alert('probando');
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
