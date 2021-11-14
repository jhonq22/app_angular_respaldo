import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu-general',
  templateUrl: './menu-general.component.html',
  styleUrls: ['./menu-general.component.css']
})
export class MenuGeneralComponent implements OnInit {

  usuarios: any = [];

  constructor( private auth: UserService,
    private router: Router,) { }

  ngOnInit(): void {
    this.informacionUsuario();
  }


  informacionUsuario() {

    this.auth.profile().subscribe(
      res => {
        this.usuarios = res;  
        //alert(this.usuarios.user.rol_id);
      },

  
    );


  }

}
