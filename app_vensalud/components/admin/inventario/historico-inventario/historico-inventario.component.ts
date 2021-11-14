import { Component, OnInit } from '@angular/core';
import { ComboListService } from '../../../../services/combo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-historico-inventario',
  templateUrl: './historico-inventario.component.html',
  styleUrls: ['./historico-inventario.component.css']
})
export class HistoricoInventarioComponent implements OnInit {

  historico: any = {};
  filter: '';
  paginate = 1;

  constructor(private comboListService: ComboListService ) { }

  ngOnInit() {
    this.getHistorico();
  }


  getHistorico()
  {
    this.comboListService.getTodosHistoricoInventario().subscribe(res => {
      this.historico = res;
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
