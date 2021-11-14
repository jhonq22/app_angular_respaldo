import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-equipo-respuesto-admin-form',
  templateUrl: './equipo-respuesto-admin-form.component.html',
  styleUrls: ['./equipo-respuesto-admin-form.component.css']
})
export class EquipoRespuestoAdminFormComponent implements OnInit {

  respuesto: any = {};
  edit = false;
  // public marcas: Observable<any[]>;
  equipos: any = {};
  marcas : any= {};
  marcap : any= {};

  keyword = "marca";
 

  createFormGroup() {
    return new FormGroup({
      marca_id: new FormControl('', [Validators.required]),
      equipo_id: new FormControl('', [Validators.required]),
      nombre_repuesto: new FormControl('', [Validators.required]),
      existencia: new FormControl('', [Validators.required]),
      referencia: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),

     });
  }



   // tslint:disable-next-line: member-ordering
   Form: FormGroup;


   constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private comboListService: ComboListService)
    { this.Form = this.createFormGroup(); }

    ngOnInit()
    {

      const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
      if (params.id)
            {
              this.comboListService.getEquipoRespuesto(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.respuesto = res;
                    this.Form.patchValue({
                      marca_id: this.respuesto.marca_id,
                      equipo_id: this.respuesto.equipo_id,
                      nombre_repuesto: this.respuesto.nombre_repuesto,
                      existencia: this.respuesto.existencia,
                      referencia: this.respuesto.referencia,
                      descripcion: this.respuesto.descripcion,

                    });

                    this.edit = true;
                  },
                  err => console.log(err)
                );
          }


      this.getMarcas();
      this.getEquipos();

        }



        GuardarMarca() {

          // delete this.movie.id; // para excluir los campo cuando se vayan a guardar
          this.comboListService.saveEquipoRespuesto(this.Form.value).subscribe(
            res => {
                  console.log(res);
                  this.router.navigate(['/respuestos/admin/list']);
                  Swal.fire(
                    'Exitoso!',
                    'Datos guardados correctamente...!',
                    'success'
                  );
            },
            err => {
              console.error(err);
              alert('Error!');

            } 
          );
        }


        ActualizarMarcas() {

          this.comboListService.updateEquipoRespuesto(this.respuesto.id, this.respuesto)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/respuestos/admin/list']);
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



/*
       getMarcas(): void {
        this.marcas = this.comboListService.getMarcas1();
        console.log('Probando marcas:', this.marcas);
      }


      */

       getMarcas(): void 
       {
         this.comboListService.getMarcas1().subscribe(res => {
           this.marcas = res;
           this.marcap = res;
           
           
           console.log(res);
         },
         err => {
           console.log(err);
         }
        );
       }

       


       getEquipos()
       {
         this.comboListService.getEquipos().subscribe(res => {
           this.equipos = res;
           console.log(res);
         },
         err => {
           console.log(err);
         }
        );
       }



       selectEvent(item) {
        // do something with selected item
      }
    
      onChangeSearch(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
      }
    
      onFocused(e) {
        // do something
      }

}
