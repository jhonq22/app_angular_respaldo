import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-registrador',
  templateUrl: './menu-registrador.component.html',
  styleUrls: ['./menu-registrador.component.css']
})
export class MenuRegistradorComponent implements OnInit {
  VacunasMenu: boolean = false;
  VacunasPerdidas: boolean = false;
  CentroSaludMenu: boolean = false;
  VacunasRecibidasMenu: boolean = false;

  usuarios: any =[];

  constructor(private auth: UserService) { }

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
