import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-configuracion-list',
  templateUrl: './usuarios-configuracion-list.component.html',
  styleUrls: ['./usuarios-configuracion-list.component.css']
})
export class UsuariosConfiguracionListComponent implements OnInit {
  usuarios: any = [];
  filter: '';
  paginate = 1;

  constructor(private userService: UserService ) { }

  ngOnInit() {
    this.getUsuarios();
  }


  getUsuarios()
  {
    this.userService.getUsuariosConfiguracion().subscribe(res => {
      this.usuarios = res;
      console.log(res);
    },
    err => {
      console.log(err);
      if (err.status === 0)
      {
        Swal.fire(
          'Error!',
          'El servidor no esta activo, no podra ver los datos...',
          'error'
        );
      }
    }
   );
  }


}
