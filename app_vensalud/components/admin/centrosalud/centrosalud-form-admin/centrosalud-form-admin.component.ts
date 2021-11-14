import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';
import { Item } from 'pdfmake-wrapper';
import { MunicipiosInterface } from '../../../../interface';
import { map, filter } from 'rxjs/operators';// This is where I import map operator


@Component({
  selector: 'app-centrosalud-form-admin',
  templateUrl: './centrosalud-form-admin.component.html',
  styleUrls: ['./centrosalud-form-admin.component.css']
})
export class CentrosaludFormAdminComponent implements OnInit {

  centrosalud: any = {};
  edit = false;
  guardar = false;

  // Component.ts
  municipios: MunicipiosInterface[];


  estados: any = {};
  selectedEstado: any = {
    id: 0,
    estado: ''
  }


  createFormGroup() {
    return new FormGroup({
      centro_salud: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required]),
      direccion: new FormControl(''),
     // rif: new FormControl(''),
      contacto_tlf: new FormControl(''),
      contacto_email: new FormControl(''),
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
              this.comboListService.getCentroSalud(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.centrosalud = res;
                    this.Form.patchValue({
                      centro_salud: this.centrosalud.centro_salud,
                      tipo: this.centrosalud.tipo,
                      estado_id: this.centrosalud.estado_id,
                      municipio_id: this.centrosalud.municipio_id,
                      direccion: this.centrosalud.direccion,
                      // rif: this.centrosalud.rif,
                      contacto_tlf: this.centrosalud.contacto_tlf,
                      contacto_email: this.centrosalud.contacto_email,
                    });
                    this.getMunicipios();

                    this.edit = true;
                  },
                  err => console.log(err)
                );
          }

      this.getEstados();
      

        }


        VerificarCentro() {

          this.comboListService.CentrosRegistradas(this.centrosalud.centro_salud).subscribe(
            res => {
              if(Object.keys(res).length >= 1) {
                Swal.fire(
                  'Error!',
                  ` ${this.centrosalud.centro_salud}, ya se encuentra registrado. Por favor ingrese otro Centro de Salud...`,
                  'error'
                );
                this.guardar = false;  
                this.onReset();
    
               } 

               else
               {
                Swal.fire(
                  'Exitoso!',
                  `Si puede registrar el Centro de Salud: ${this.centrosalud.centro_salud} `,
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
    


          

        GuardarCentroSalud() {

          // delete this.movie.id; // para excluir los campo cuando se vayan a guardar
          this.comboListService.saveCentroSalud(this.Form.value).subscribe(
            res => {
                  console.log(res);
                  this.router.navigate(['/inicio']);
                  Swal.fire(
                    'Exitoso!',
                    'Datos Centro Salud guardados correctamente...!',
                    'success'
                  );
            },
            err => {
              console.error(err);
              alert('Error!');

            } 
          );
        }

        ActualizarCentroSalud() {

          this.comboListService.updateCentroSalud(this.centrosalud.id, this.centrosalud)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/inicio']);
                Swal.fire(
                  'Exitoso!',
                  'Datos Centro Salud actualizados correctamente...!',
                  'success'
                );
              },
              err => {
                console.error(err);
                alert('Error!');
  
              }
            );
        }

      


        onSelect(id: any) {
         // console.log('id es:', id);

         this.comboListService.getMunicipios().pipe(
          map((municipios: any[]) => municipios.filter((municipio) => municipio.estado_id == id)
         )).subscribe((result) => {
          this.municipios = result;
          console.log(result);
          
         });
        }


        getEstados()
        {
          this.comboListService.getEstados().subscribe(res => {
            this.estados = res;
            console.log(res);
          },
          err => {
            console.log(err);
          }
         );
        }

        
        getMunicipios()
        {
          this.comboListService.getMunicipios().subscribe(res => {
            this.municipios = res;
            console.log(res);
          },
        
         ) 
        }


}
