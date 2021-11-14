import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-detalles-repuestos-pedidos',
  templateUrl: './detalles-repuestos-pedidos.component.html',
  styleUrls: ['./detalles-repuestos-pedidos.component.css']
})
export class DetallesRepuestosPedidosComponent implements OnInit {

  detalles: any = [];
  respuestolistado: any = [];
  edit = false;
  repuestos: any = [];
  paginate = 1;
  parametro_id = '';
  usuarios: any = [];

  createFormGroup() {
    return new FormGroup({
     inventario_id: new FormControl('', [Validators.required]),
     repuesto_id: new FormControl('', [Validators.required]),
     cantidad_pedido: new FormControl('', [Validators.required]),
     fecha_solicitud: new FormControl('', [Validators.required]),
     user_id: new FormControl('', [Validators.required]),
     estatu_solicitud_repuesto_id: new FormControl('', [Validators.required])
     });
  }



   // tslint:disable-next-line: member-ordering
   Form: FormGroup;


   constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private comboListService: ComboListService,
    private auth: UserService,
    )
    { this.Form = this.createFormGroup(); }

  ngOnInit() {

    const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
    this.informacionUsuario();
    this.parametro_id = params.id;
    if (params.id)
          {

          


            this.Form.get('inventario_id').setValue(params.id);
            this.Form.get('estatu_solicitud_repuesto_id').setValue('1');
                  
            this.comboListService.getDetallesRepuestosInventario(params.id) // obtengo el juego con el parametro del id
              .subscribe(
                res => { // aqui tomo las respuesta
                  console.log(res);
                  this.detalles = res;
                  this.Form.patchValue({
                    marca: this.detalles.marca,
                    equipo: this.detalles.equipo,
                    nombre_repuesto: this.detalles.nombre_repuesto,
                    cantidad_pedido: this.detalles.cantidad_pedido,
                    fecha_solicitud: this.detalles.fecha_solicitud,

                  });

                  this.edit = true;
                },
                err => console.log(err)
              );
        }

        this.getRepuestos();
        this.getListadoRespuesto();
  }


  informacionUsuario() {
    this.auth.profile().subscribe(
      res => {
       this.usuarios = res;
       // alert(this.usuarios.user.id);
       console.log('usuario data', res);
       this.Form.get('user_id').setValue(this.usuarios.user.id);
     
      },
     err => {
        alert('Sesion Experiada..');
        this.router.navigateByUrl('/login');
      }
    );
  }











  GuardarDetallesEquipos() {

    // delete this.movie.id; // para excluir los campo cuando se vayan a guardar
    this.comboListService.saveDetallesRepuestos(this.Form.value).subscribe(
      res => {
            console.log(res);
            // this.router.navigate(['/marcas/admin/list']);
            Swal.fire(
              'Exitoso!',
              'Datos guardados correctamente...!',
              'success'
            );
            this.getListadoRespuesto();
      },
      err => {
        console.error(err);
        alert('Error!');

      } 
    );
  }


  getRepuestos()
          {
            this.comboListService.getTodosEquipoRespuestos().subscribe(res => {
              this.repuestos = res;
              console.log(res);
            },
            err => {
              console.log(err);
            }
           );
          }



          getListadoRespuesto() {
            const parametro = this.activatedRoute.snapshot.params;

            this.comboListService.getDetallesRepuestosInventario(parametro.id).subscribe(res => {
              this.respuestolistado = res;
              console.log('listados de respuesto:', res);
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
