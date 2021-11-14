import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';

@Component({
  selector: 'app-solicitados-list-general',
  templateUrl: './solicitados-list-general.component.html',
  styleUrls: ['./solicitados-list-general.component.css']
})
export class SolicitadosListGeneralComponent implements OnInit {

  repuestos: any = {};
  filter: '';
  paginate = 1;

  constructor(private comboListService: ComboListService ) { }

  ngOnInit() {
    this.getRepuestoSolicitados();
  }


  getRepuestoSolicitados()
  {
    this.comboListService.getTodosDetallesRespuestosSolicitados().subscribe(res => {
      this.repuestos = res;
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
