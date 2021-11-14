import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComboListService } from 'src/app/services/combo.service';
import { ExcelService } from 'src/app/services/excel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centrosalud-list-admin',
  templateUrl: './centrosalud-list-admin.component.html',
  styleUrls: ['./centrosalud-list-admin.component.css']
})
export class CentrosaludListAdminComponent implements OnInit {
  centrosalud: any = [];
  filter: '';
  paginate = 1;
  usuarios: any = [];

  constructor(private comboListService: ComboListService,
    private auth: UserService,
    private excelService: ExcelService,
    private router: Router, ) { }

  ngOnInit() {
    this.getCentroSalud();
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


  getCentroSalud()
  {
    this.comboListService.getTodosCentroSalud().subscribe(res => {
      this.centrosalud = res;
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
