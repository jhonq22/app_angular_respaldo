import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { CombolistService } from 'src/app/services/combolist.service';
@Component({
  selector: 'app-centro-salud-admin-form',
  templateUrl: './centro-salud-admin-form.component.html',
  styleUrls: ['./centro-salud-admin-form.component.css']
})
export class CentroSaludAdminFormComponent implements OnInit {
  centrosalud: any = [];
  estados: any = [];
  municipios: any = [];
  edit = false;


  createFormGroup() {
    return new FormGroup({
      centro_salud: new FormControl('', [Validators.required]),
      contacto_tlf: new FormControl(''),
      estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required]),
      codigo_sicm: new FormControl('', [Validators.required]),
      direccion: new FormControl(''),
    
      //imagen_qr: new FormControl(''),
     });
  }

  Form: FormGroup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private comboListService: CombolistService,

  ) {  this.Form = this.createFormGroup(); }



 ngOnInit() 
    {
      //this.fechaActual=new Date();
      
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
                      estado_id: this.centrosalud.estado_id,
                      municipio_id: this.centrosalud.municipio_id,
                      direccion: this.centrosalud.direccion,
                      contacto_tlf: this.centrosalud.contacto_tlf,
                      codigo_sicm: this.centrosalud.codigo_sicm
                    
                      //imagen_qr: this.vacunas.imagen_qr,
                      
                    });

                    this.edit = true;
                    this.EditMunicipio();
                  },
                  err => console.log(err)
                );
          }

     
      this.getEstados();
     
    
    }


    GuardarCentroSalud() {
      
      this.comboListService.saveCentroSalud(this.Form.value).subscribe(
        res => {
              console.log(res);
              this.router.navigate(['/centrosalud/admin/list']);
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


    ActualizarCentroSalud() {

      this.comboListService.updateCentroSalud(this.centrosalud.id, this.centrosalud)
        .subscribe(
          res => {
            console.log('actualizando', res);
            this.router.navigate(['/centrosalud/admin/list']);
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


     // COMBO DEPENDIENTE //

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

 EditMunicipio() {
   this.comboListService.getMunicipios().subscribe(res => {
     this.municipios = res;
     console.log(res);
   },
   err => {
     console.log(err);
   }
  );
 }


     getMunicipios(id: any): void
     {

       this.comboListService.getMunicipios().pipe(
         map((municipios: any[]) => municipios.filter((municipio) => municipio.estado_id == id)
        )).subscribe((result) => {
         this.municipios = result;
         console.log(result);

        });


     }

}
