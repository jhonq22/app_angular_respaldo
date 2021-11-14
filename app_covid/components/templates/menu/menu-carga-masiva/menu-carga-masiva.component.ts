import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-carga-masiva',
  templateUrl: './menu-carga-masiva.component.html',
  styleUrls: ['./menu-carga-masiva.component.css']
})
export class MenuCargaMasivaComponent implements OnInit {

  VacunasMenu: boolean = false;
  VacunasMasivas: boolean = false;
  usuarios: any = [];

  constructor(
    private auth: UserService,
  ) { }

  ngOnInit(): void {
    this.informacionUsuario();
  }

  informacionUsuario() {
    this.auth.profile().subscribe(
    res => {
    this.usuarios = res;
    // alert(this.usuarios.user.centro_salud_id);
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
