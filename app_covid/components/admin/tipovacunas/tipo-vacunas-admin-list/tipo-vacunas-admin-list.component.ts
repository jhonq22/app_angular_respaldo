import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CombolistService } from 'src/app/services/combolist.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-vacunas-admin-list',
  templateUrl: './tipo-vacunas-admin-list.component.html',
  styleUrls: ['./tipo-vacunas-admin-list.component.css']
})
export class TipoVacunasAdminListComponent implements OnInit {


  vacunas: any = [];
  filter: '';
  paginate = 1;
  usuarios: any = [];


  constructor(private comboListService: CombolistService,
    private auth: UserService,
    private router: Router ) { }

  ngOnInit() {
    this.getTiposVacunas();
    this.informacionUsuario();
  }


  informacionUsuario() {
    this.auth.profile().subscribe(
      res => {
       this.usuarios = res;
       // alert(this.usuarios.user.id);
       console.log('usuario data', res);
      //alert(`centro salud: ${this.usuarios.user.centro_salud_id}`);
       //alert(`id: ${this.usuarios.user.id}`)
      // this.Form.get('user_id').setValue(this.usuarios.user.id);
      
      },
     err => {
        alert('Sesion Experiada..');
        this.router.navigateByUrl('/login');
      }
    );
  }

  getTiposVacunas()
  {
    this.comboListService.getTiposVacunas().subscribe(res => {
      this.vacunas = res;
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
