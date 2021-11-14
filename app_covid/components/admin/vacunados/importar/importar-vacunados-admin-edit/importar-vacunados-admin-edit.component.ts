import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { VacunasService } from 'src/app/services/vacunas.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { CombolistService } from 'src/app/services/combolist.service';
import { DatePipe } from '@angular/common'
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { DateValidator } from 'src/app/interfaces/date.validator';



@Component({
  selector: 'app-importar-vacunados-admin-edit',
  templateUrl: './importar-vacunados-admin-edit.component.html',
  styleUrls: ['./importar-vacunados-admin-edit.component.css']
})
export class ImportarVacunadosAdminEditComponent implements OnInit {

  vacunas: any = [];
  estatus: any = [];
  edit = false;


  createFormGroup() {
    return new FormGroup({
      estatu_convocado_id: new FormControl('', [Validators.required])
      

      
     });
  }

  Form: FormGroup;











  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private vacunasService: VacunasService,
    private comboListService: CombolistService,
    public datepipe: DatePipe,
    private auth: UserService
    ) {  this.Form = this.createFormGroup(); }

  ngOnInit(): void {
   

    const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
    if (params.id)
          {
            this.comboListService.getConvocadosPatria(params.id) // obtengo el juego con el parametro del id
              .subscribe(
                res => { // aqui tomo las respuesta
                  console.log(res);
                  this.vacunas = res;
                  this.Form.patchValue({
                    estatu_convocado_id: this.vacunas.estatu_convocado_id,
              
                     
                  });

                  this.edit = true;
                  this. getEstatus();
                
                },
                err => console.log(err)
              );
        }

      }
  

      getEstatus()
      {
        this.comboListService.getEstatusConvocados().subscribe(res => {
          this.estatus = res;
          console.log(res);
        },
        err => {
          console.log(err);
        }
       );
      }


      Actualizar() {
    
        this.comboListService.updateConvocadosPatrias(this.vacunas.id, this.vacunas)
          .subscribe(
            res => {
              console.log('actualizando', res);
             this.router.navigate(['/vacunados/importar/admin/list']);
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
