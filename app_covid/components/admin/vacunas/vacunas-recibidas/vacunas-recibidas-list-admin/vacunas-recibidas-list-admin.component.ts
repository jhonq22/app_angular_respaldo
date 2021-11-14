import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CombolistService } from 'src/app/services/combolist.service';
import { ExcelService } from 'src/app/services/excel.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-vacunas-recibidas-list-admin',
  templateUrl: './vacunas-recibidas-list-admin.component.html',
  styleUrls: ['./vacunas-recibidas-list-admin.component.css']
})
export class VacunasRecibidasListAdminComponent implements OnInit {

  vacunas: any = [];
  filter: '';
  paginate = 1;
  usuarios: any = [];
  vacunasExcel: any = [];


  constructor(private comboListService: CombolistService,
    private auth: UserService,
    private excelService: ExcelService,
    private router: Router ) { }

  ngOnInit() {
    this.getVacunasRecibidas();
    this.informacionUsuario();
    this.getVacunadosExcel();
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.vacunasExcel, 'Vacunas_Recibidas');
  }





  getVacunadosExcel()
  {
   
    this.comboListService.getVacunasRecibidasExcel().subscribe(res => {
      this.vacunasExcel = res;
      console.log('excel:', res);
    },
    err => {
      console.log(err);
    }
   );
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

  getVacunasRecibidas()
  {
    this.comboListService.getVacunasRecibidas().subscribe(res => {
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
