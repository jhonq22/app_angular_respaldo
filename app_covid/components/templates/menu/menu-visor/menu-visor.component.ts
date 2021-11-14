import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-visor',
  templateUrl: './menu-visor.component.html',
  styleUrls: ['./menu-visor.component.css']
})
export class MenuVisorComponent implements OnInit {

  VacunasMenu: boolean = false;
  usuarios: any =[];

  constructor(private auth: UserService,) { }

  ngOnInit(): void {
    this.informacionUsuario();
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
  logout() {
    this.auth.logout();
  }

}
