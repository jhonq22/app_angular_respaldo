import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComboListService } from 'src/app/services/combo.service';


@Component({
  selector: 'app-detalles-repuestos-actualizar',
  templateUrl: './detalles-repuestos-actualizar.component.html',
  styleUrls: ['./detalles-repuestos-actualizar.component.css']
})
export class DetallesRepuestosActualizarComponent implements OnInit {
  estatus: any = [];
  solicitudes: any = [];
  edit = false;

  createFormGroup() {
    return new FormGroup({
      estatu_solicitud_repuesto_id: new FormControl('', [Validators.required]),
     });
  }


  Form: FormGroup;


  constructor(
   private activatedRoute: ActivatedRoute,
   private router: Router,
   private comboListService: ComboListService)
   { this.Form = this.createFormGroup(); }

   ngOnInit()
    {
      this.EstatusSolicitudRepuestos();

      const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
      if (params.id)
            {
              this.comboListService.getDetallesRepuestos(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.estatus = res;
                    this.Form.patchValue({
                      inventario_id: this.estatus.inventario_id,
                      repuesto_id: this.estatus.repuesto_id,
                      cantidad_pedido: this.estatus.cantidad_pedido,
                      fecha_solicitud: this.estatus.fecha_solicitud,
                      estatu_solicitud_repuesto_id: this.estatus.estatu_solicitud_repuesto_id,
                     

                    });

                    this.edit = true;
                  },
                  err => console.log(err)
                );
          }

        }

        ActualizarMarcas() {

          this.comboListService.updateDetallesRepuestos(this.estatus.id, this.estatus)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/repuestos/solicitados/detalles', this.estatus.inventario_id]);
                Swal.fire(
                  'Exitoso!',
                  'Datos actualizados correctamente...!',
                  'success'
                );
              },
              err => {
                console.error(err);
                alert('Error!');
  
              }
            );
        }


        EstatusSolicitudRepuestos(){
          this.comboListService.getSolicitudEstatusRepuestos() // obtengo el juego con el parametro del id
              .subscribe(
                res => { // aqui tomo las respuesta
                  console.log(res);
                  this.solicitudes = res;
                },
                err => console.log(err)
              );
        }

}
