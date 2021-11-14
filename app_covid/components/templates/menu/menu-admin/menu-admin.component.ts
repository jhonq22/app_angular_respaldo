import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  VacunasMenu: boolean = false;
  UsuariosMenu: boolean = false;
  CentroSaludMenu: boolean = false;
  TipoVacuna: boolean = false;
  VacunasPerdidas: boolean = false;
  VacunasRecibidas: boolean = false;
  GruposEspeciales: boolean = false;
  VacunasMasivas: boolean = false;


  


  constructor(
    private auth: UserService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

  

}
