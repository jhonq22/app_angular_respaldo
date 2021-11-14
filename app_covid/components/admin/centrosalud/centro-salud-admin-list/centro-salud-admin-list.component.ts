import { Component, OnInit } from '@angular/core';
import { CombolistService } from 'src/app/services/combolist.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-centro-salud-admin-list',
  templateUrl: './centro-salud-admin-list.component.html',
  styleUrls: ['./centro-salud-admin-list.component.css']
})
export class CentroSaludAdminListComponent implements OnInit {

  centrosalud: any = [];
  filter: '';
  paginate = 1;


  constructor(private comboListService: CombolistService ) { }

  ngOnInit() {
    this.getCentroSalud();
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
