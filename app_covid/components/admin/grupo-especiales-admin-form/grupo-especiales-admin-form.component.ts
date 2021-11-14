import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { CombolistService } from 'src/app/services/combolist.service';



@Component({
  selector: 'app-grupo-especiales-admin-form',
  templateUrl: './grupo-especiales-admin-form.component.html',
  styleUrls: ['./grupo-especiales-admin-form.component.css']
})
export class GrupoEspecialesAdminFormComponent implements OnInit {

  grupos: any = [];
  edit = false;

  createFormGroup() {
    return new FormGroup({
      grupo_especial: new FormControl('', [Validators.required]),
      codigo_grupo_especial: new FormControl('', [Validators.required]),
       
      
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
              this.comboListService.getGrupoEspecial(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.grupos = res;
                    this.Form.patchValue({
                      grupo_especial: this.grupos.grupo_especial,
                      codigo_grupo_especial: this.grupos.codigo_grupo_especial,
                
                    
                      //imagen_qr: this.vacunas.imagen_qr,
                      
                    });

                    this.edit = true;
                  
                  },
                  err => console.log(err)
                );
          }

     
      
     
    
    }


    GuardarGrupos() {
      
      this.comboListService.saveGruposEspeciales(this.Form.value).subscribe(
        res => {
              console.log(res);
              this.router.navigate(['/grupo_especial/admin/list']);
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


    ActualizarGrupos() {

      this.comboListService.updateGruposEspeciales(this.grupos.id, this.grupos)
        .subscribe(
          res => {
            console.log('actualizando', res);
            this.router.navigate(['/grupo_especial/admin/list']);
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
