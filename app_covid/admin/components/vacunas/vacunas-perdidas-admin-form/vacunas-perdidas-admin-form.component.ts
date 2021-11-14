import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { VacunasService } from 'src/app/services/vacunas.service';
import { CombolistService } from 'src/app/services/combolist.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-vacunas-perdidas-admin-form',
  templateUrl: './vacunas-perdidas-admin-form.component.html',
  styleUrls: ['./vacunas-perdidas-admin-form.component.css']
})
export class VacunasPerdidasAdminFormComponent implements OnInit {

  vacunas: any = [];
  tipovacunas: any = [];
  edit = false;
  usuarios: any = [];


  createFormGroup() {
    return new FormGroup({
      tipo_vacuna_id: new FormControl('', [Validators.required]),
      numero_lote: new FormControl('', [Validators.required]),
      fecha_vencimiento: new FormControl('', [Validators.required]),
      numero_dosis_perdidas: new FormControl('', [Validators.required, Validators.pattern("^[1-9]*$")]),
      user_id: new FormControl('', [Validators.required]),
      causa_perdida: new FormControl('', [Validators.required]),
        
      //imagen_qr: new FormControl(''),
     });
  }

  Form: FormGroup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private vacunasService: VacunasService,
    private comboListService: CombolistService,
    private auth: UserService

  ) {  this.Form = this.createFormGroup(); }



 ngOnInit() 
    {
      //this.fechaActual=new Date();
      
      const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
      if (params.id)
            {
              this.vacunasService.getVacunaPerdida(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.vacunas = res;
                    this.Form.patchValue({
                      tipo_vacuna_id: this.vacunas.tipo_vacuna_id,
                      numero_lote: this.vacunas.numero_lote,
                      fecha_vencimiento: this.vacunas.fecha_vencimiento,
                      numero_dosis_perdidas: this.vacunas.numero_dosis_perdidas,
                      causa_perdida: this.vacunas.causa_perdida,
                
                    
                      //imagen_qr: this.vacunas.imagen_qr,
                      
                    });

                    this.edit = true;
                  
                  },
                  err => console.log(err)
                );
          }

          this.getTiposVacunas();
          this.informacionUsuario();
      
     
    
    }




    informacionUsuario() {
      this.auth.profile().subscribe(
        res => {
         this.usuarios = res;
         // alert(this.usuarios.user.id);
         console.log('usuario data', res);
        //alert(`centro salud: ${this.usuarios.user.centro_salud_id}`);
         //alert(`id: ${this.usuarios.user.id}`)
         this.Form.get('user_id').setValue(this.usuarios.user.id);
        
        },
       err => {
          alert('Sesion Experiada..');
          this.router.navigateByUrl('/login');
        }
      );
    }











    onReset() {
     
      this.Form.reset();
  }



    getTiposVacunas()
    {
      this.comboListService.getTiposVacunas().subscribe(res => {
        this.tipovacunas = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
     );
    }


    Guardar() {
      
      this.vacunasService.saveVacunasPerdidas(this.Form.value).subscribe(
        res => {
              console.log(res);
              //this.router.navigate(['/vacunas_perdidas/admin/list']);
              
              
              Swal.fire(
                'Exitoso!',
                'Datos guardados correctamente...!',
                'success'
              );
              this.onReset();
              this.ngOnInit();
        },
        err => {
          console.error(err);
          alert('Error!');

        } 
      );
    }


    Actualizar() {

      this.vacunasService.updateVacunaPerdidas(this.vacunas.id, this.vacunas)
        .subscribe(
          res => {
            console.log('actualizando', res);
           // this.router.navigate(['/vacunas_perdidas/admin/list']);
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
