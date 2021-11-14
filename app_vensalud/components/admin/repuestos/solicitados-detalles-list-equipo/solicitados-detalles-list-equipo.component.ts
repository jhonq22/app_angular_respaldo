import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';

@Component({
  selector: 'app-solicitados-detalles-list-equipo',
  templateUrl: './solicitados-detalles-list-equipo.component.html',
  styleUrls: ['./solicitados-detalles-list-equipo.component.css']
})
export class SolicitadosDetallesListEquipoComponent implements OnInit {
  repuestos: any = {};
  filter: '';
  paginate = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private comboListService: ComboListService
  ) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
 
    if (params.id)
          {

            this.comboListService.getDetallesRepuestosInventario(params.id) // obtengo el juego con el parametro del id
              .subscribe(
                res => { // aqui tomo las respuesta
                  console.log(res);
                  this.repuestos = res;
                },
                err => console.log(err)
              );
        }


  }

}
