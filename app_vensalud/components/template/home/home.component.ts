import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarios: any = [];

  constructor(
    private auth: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
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

}
