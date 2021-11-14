import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-registrador-estadal',
  templateUrl: './menu-registrador-estadal.component.html',
  styleUrls: ['./menu-registrador-estadal.component.css']
})
export class MenuRegistradorEstadalComponent implements OnInit {

  usuarios: any = [];

  VacunasMenu: boolean = false;

  constructor(private auth: UserService,) { }

  ngOnInit(): void {
  }


  
  informacionUsuario() {
    this.auth.profile().subscribe(
      res => {
       this.usuarios = res;
       // alert(this.usuarios.user.id);
       console.log('usuario data', res);
 
      
      
      }
     
    );
  }


  logout() {
    this.auth.logout();
  }

}
