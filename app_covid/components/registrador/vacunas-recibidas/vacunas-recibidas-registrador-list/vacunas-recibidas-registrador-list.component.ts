import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CombolistService } from 'src/app/services/combolist.service';
import { ExcelService } from 'src/app/services/excel.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacunas-recibidas-registrador-list',
  templateUrl: './vacunas-recibidas-registrador-list.component.html',
  styleUrls: ['./vacunas-recibidas-registrador-list.component.css']
})
export class VacunasRecibidasRegistradorListComponent implements OnInit {

  vacunas: any = [];
  filter: '';
  paginate = 1;
  usuarios: any = [];
  vacunasExcel: any = [];
  estado_id = '';


  constructor(private comboListService: CombolistService,
    private auth: UserService,
    private excelService: ExcelService,
    private activatedRoute: ActivatedRoute,
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

    const params = this.activatedRoute.snapshot.params;
    this.comboListService.getVacunasRecibidasCentroSalud(params.id).subscribe(res => {
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
