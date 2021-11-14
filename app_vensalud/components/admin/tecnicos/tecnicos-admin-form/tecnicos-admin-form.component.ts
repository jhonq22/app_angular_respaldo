import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';

@Component({
  selector: 'app-tecnicos-admin-form',
  templateUrl: './tecnicos-admin-form.component.html',
  styleUrls: ['./tecnicos-admin-form.component.css']
})
export class TecnicosAdminFormComponent implements OnInit {

  tecnico: any = [];
  edit = false;


  createFormGroup() {
    return new FormGroup({
     cedula: new FormControl('', [Validators.required]),
     nombres: new FormControl('', [Validators.required]),
     apellidos: new FormControl('', [Validators.required]),
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
              this.comboListService.getTecnico(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.tecnico = res;
                    this.Form.patchValue({
                      cedula: this.tecnico.cedula,
                      nombres: this.tecnico.nombres,
                      apellidos: this.tecnico.apellidos,

                    });

                    this.edit = true;
                  },
                  err => console.log(err)
                );
          }

        }



        Guardar() {

          // delete this.movie.id; // para excluir los campo cuando se vayan a guardar
          this.comboListService.saveTecnicos(this.Form.value).subscribe(
            res => {
                  console.log(res);
                  this.router.navigate(['/tecnicos/admin/list']);
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


        Actualizar() {

          this.comboListService.updateTecnicos(this.tecnico.id, this.tecnico)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/tecnicos/admin/list']);
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

}
