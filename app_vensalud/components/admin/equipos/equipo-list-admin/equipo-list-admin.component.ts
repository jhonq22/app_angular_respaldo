import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';


@Component({
  selector: 'app-equipo-list-admin',
  templateUrl: './equipo-list-admin.component.html',
  styleUrls: ['./equipo-list-admin.component.css']
})


export class EquipoListAdminComponent implements OnInit {

  equipos: any = {};
  filter: '';
  paginate = 1;



  constructor(private comboListService: ComboListService ) { }

  ngOnInit() {
    this.getEquipos();
  }


  getEquipos()
  {
    this.comboListService.getEquipos().subscribe(res => {
      this.equipos = res;
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
