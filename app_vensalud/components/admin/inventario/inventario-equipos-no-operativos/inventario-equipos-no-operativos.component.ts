import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../../services/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario-equipos-no-operativos',
  templateUrl: './inventario-equipos-no-operativos.component.html',
  styleUrls: ['./inventario-equipos-no-operativos.component.css']
})
export class InventarioEquiposNoOperativosComponent implements OnInit {
  inventarios: any = [];
  searchText: string;
  filter: '';
  paginate = 1;

  constructor(
    private inventarioService: InventarioService,
  ) { }

  ngOnInit() {
    this.getInventarios();
  }


  getInventarios()
  {
    this.inventarioService.getInventariosNoOperativo().subscribe(res => {
      this.inventarios = res;
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
