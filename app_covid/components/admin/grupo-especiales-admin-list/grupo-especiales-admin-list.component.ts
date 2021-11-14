import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CombolistService } from 'src/app/services/combolist.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-grupo-especiales-admin-list',
  templateUrl: './grupo-especiales-admin-list.component.html',
  styleUrls: ['./grupo-especiales-admin-list.component.css']
})
export class GrupoEspecialesAdminListComponent implements OnInit {

  grupo_especiales: any = [];
  filter: '';
  paginate = 1;
  usuarios: any = [];

  constructor(private comboListService: CombolistService,
    private auth: UserService,
    private router: Router ) { }

  ngOnInit() {
    this.getGruposEspeciales();
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
        this.router.navigateByUrl('/login');
      }
    );
  }

  getGruposEspeciales()
  {
    this.comboListService.getGruposEspeciales().subscribe(res => {
      this.grupo_especiales = res;
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
