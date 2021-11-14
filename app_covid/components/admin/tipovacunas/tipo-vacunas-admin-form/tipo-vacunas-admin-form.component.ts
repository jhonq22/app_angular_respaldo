import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { CombolistService } from 'src/app/services/combolist.service';


@Component({
  selector: 'app-tipo-vacunas-admin-form',
  templateUrl: './tipo-vacunas-admin-form.component.html',
  styleUrls: ['./tipo-vacunas-admin-form.component.css']
})
export class TipoVacunasAdminFormComponent implements OnInit {
  tipovacunas: any = [];
  edit = false;



  createFormGroup() {
    return new FormGroup({
      nombre_vacuna: new FormControl('', [Validators.required]),
        
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
              this.comboListService.getTiposVacuna(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.tipovacunas = res;
                    this.Form.patchValue({
                      nombre_vacuna: this.tipovacunas.nombre_vacuna,
                
                    
                      //imagen_qr: this.vacunas.imagen_qr,
                      
                    });

                    this.edit = true;
                  
                  },
                  err => console.log(err)
                );
          }

     
      
     
    
    }


    GuardarTipoVacunas() {
      
      this.comboListService.saveTiposVacunas(this.Form.value).subscribe(
        res => {
              console.log(res);
              this.router.navigate(['/tiposvacunas/admin/list']);
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


    ActualizarTiposVacunas() {

      this.comboListService.updateTiposVacunas(this.tipovacunas.id, this.tipovacunas)
        .subscribe(
          res => {
            console.log('actualizando', res);
            this.router.navigate(['/tiposvacunas/admin/list']);
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
