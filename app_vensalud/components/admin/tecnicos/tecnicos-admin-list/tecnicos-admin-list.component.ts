import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';

@Component({
  selector: 'app-tecnicos-admin-list',
  templateUrl: './tecnicos-admin-list.component.html',
  styleUrls: ['./tecnicos-admin-list.component.css']
})
export class TecnicosAdminListComponent implements OnInit {

  tecnicos: any = [];
  filter: '';
  paginate = 1;

  constructor(private comboListService: ComboListService ) { }

  ngOnInit() {
    this.getTecnicos();
  }


  getTecnicos()
  {
    this.comboListService.getTecnicos().subscribe(res => {
      this.tecnicos = res;
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
