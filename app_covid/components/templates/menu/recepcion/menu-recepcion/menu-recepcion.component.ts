import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-recepcion',
  templateUrl: './menu-recepcion.component.html',
  styleUrls: ['./menu-recepcion.component.css']
})
export class MenuRecepcionComponent implements OnInit {

  VacunasRecibidas: boolean = false;
  usuarios: any = [];

  constructor(
    private auth: UserService,
  ) { }

  ngOnInit(): void {
    this.informacionUsuario();
  }

  logout() {
    this.auth.logout();
  }

  informacionUsuario() {
    this.auth.profile().subscribe(
    res => {
    this.usuarios = res;
    console.log('usuario data', res);
    
    },
    err => {
    alert('Sesion Experiada..');

    }
    );
    }

}
