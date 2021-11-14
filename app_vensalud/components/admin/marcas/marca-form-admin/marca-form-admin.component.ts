import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';

@Component({
  selector: 'app-marca-form-admin',
  templateUrl: './marca-form-admin.component.html',
  styleUrls: ['./marca-form-admin.component.css']
})
export class MarcaFormAdminComponent implements OnInit {
  marca: any = [];
  edit = false;
  guardar = false;



  createFormGroup() {
    return new FormGroup({
     marca: new FormControl('', [Validators.required]),
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
              this.comboListService.getMarca(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.marca = res;
                    this.Form.patchValue({
                      marca: this.marca.marca,

                    });

                    this.edit = true;
                  },
                  err => console.log(err)
                );
          }

        }

        VerificarMarca() {

          this.comboListService.MarcasRegistradas(this.marca.marca).subscribe(
            res => {
              if(Object.keys(res).length >= 1) {
                Swal.fire(
                  'Error!',
                  ` ${this.marca.marca}, ya se encuentra registrado. Por favor ingrese otro Equipo...`,
                  'error'
                );
                this.guardar = false;  
                this.onReset();
    
               } 

               else
               {
                Swal.fire(
                  'Exitoso!',
                  `Si puede registrar la marca: ${this.marca.marca} `,
                  'success'
                );
                this.guardar = true;
               }
                 
            },
            err => {
              console.error(err);
              alert('Error!');

            } 
          );
        }




        onReset() {
     
          this.Form.reset();
      }
    
        


        GuardarMarca() {

          // delete this.movie.id; // para excluir los campo cuando se vayan a guardar
          this.comboListService.saveMarcas(this.Form.value).subscribe(
            res => {
                  console.log(res);
                  this.router.navigate(['/marcas/admin/list']);
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

          this.comboListService.updateMarcas(this.marca.id, this.marca)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/marcas/admin/list']);
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
