import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';

@Component({
  selector: 'app-marca-list-admin',
  templateUrl: './marca-list-admin.component.html',
  styleUrls: ['./marca-list-admin.component.css']
})
export class MarcaListAdminComponent implements OnInit {

  marcas: any = [];
  filter: '';
  paginate = 1;

  constructor(private comboListService: ComboListService ) { }

  ngOnInit() {
    this.getMarcas();
  }


  getMarcas()
  {
    this.comboListService.getMarcas().subscribe(res => {
      this.marcas = res;
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
