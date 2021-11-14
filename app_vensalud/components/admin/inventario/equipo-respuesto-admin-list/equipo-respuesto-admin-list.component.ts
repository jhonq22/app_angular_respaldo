import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';


@Component({
  selector: 'app-equipo-respuesto-admin-list',
  templateUrl: './equipo-respuesto-admin-list.component.html',
  styleUrls: ['./equipo-respuesto-admin-list.component.css']
})
export class EquipoRespuestoAdminListComponent implements OnInit {

  respuestos: any = [];
  filter: '';
  paginate = 1;
  usuarios: any = [];

  constructor(private comboListService: ComboListService,
    private auth: UserService,
    private excelService: ExcelService,
    private router: Router, ) { }

  ngOnInit() {
    this.getTodosEquipoRespuestos();
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

  getTodosEquipoRespuestos()
  {
    this.comboListService.getTodosEquipoRespuestos().subscribe(res => {
      this.respuestos = res;
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
