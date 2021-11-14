import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';

@Component({
  selector: 'app-biblioteca-virtual-admin-list',
  templateUrl: './biblioteca-virtual-admin-list.component.html',
  styleUrls: ['./biblioteca-virtual-admin-list.component.css']
})
export class BibliotecaVirtualAdminListComponent implements OnInit {

  biblioteca: any = [];
  filter: '';
  paginate = 1;

  constructor(private comboListService: ComboListService ) { }

  ngOnInit() {
    this.getBibliotecas();
  }


  getBibliotecas()
  {
    this.comboListService.getBibliotecas().subscribe(res => {
      this.biblioteca = res;
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
