import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-centro-salud-estados',
  templateUrl: './list-centro-salud-estados.component.html',
  styleUrls: ['./list-centro-salud-estados.component.css']
})
export class ListCentroSaludEstadosComponent implements OnInit {
  
  centrosalud: any = {};
  filter: '';
  paginate = 1;

  constructor(
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private comboListService: ComboListService) { }

  ngOnInit() {

    const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
    if (params.id)
          {
            this.comboListService.getCentroSaludEstados(params.id) // obtengo el juego con el parametro del id
              .subscribe(
                res => { // aqui tomo las respuesta
                  console.log(res);
                  this.centrosalud = res;
                },
                err => console.log(err)
              );
        }
      }


  }




