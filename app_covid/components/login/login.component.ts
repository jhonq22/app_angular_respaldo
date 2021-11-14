import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TokenPayload, UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    id: 0,
    name: '',
    email: '',
    password: '',
    image: '',
    nombre_img: '',
    ente_id: 0

  };


  constructor(private auth: UserService, private router: Router) { }

  login() {
    this.auth.login(this.credentials).subscribe(
      () =>
      {
        Swal.fire({
          icon: 'success',
          title: 'Ingresando...',
         });
        this.router.navigateByUrl('/inicio');
      },
      err => {
        console.error(err);
        if (err.status === 0)
        {
          Swal.fire(
            'Error!',
            'El servidor no esta activo, no podra ingresar al sistema por favor contactar al Administrador...',
            'error'
          );
        }
        else if (err.status === 400)
        {
          Swal.fire(
            'Error!',
            '!Datos Incorrectos...',
            'error'
          );
        }
      }
    );
  }

  ngOnInit() {
  }

}
