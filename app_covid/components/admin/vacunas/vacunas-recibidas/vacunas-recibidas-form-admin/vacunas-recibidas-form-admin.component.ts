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
  selector: 'app-vacunas-recibidas-form-admin',
  templateUrl: './vacunas-recibidas-form-admin.component.html',
  styleUrls: ['./vacunas-recibidas-form-admin.component.css']
})
export class VacunasRecibidasFormAdminComponent implements OnInit {

  vacunas: any = [];
  estados: any = [];
  municipios: any = [];
  centrosalud: any = [];
  tipovacunas: any = [];
  usuarios: any = [];
  grupoespeciales: any = [];

  currentDate = moment().format("YYYY-MM-DD");

  edit = false;

 createFormGroup() {
    return new FormGroup({
      
      tipo_vacuna_id: new FormControl('', [Validators.required]),
      numero_lote: new FormControl('', [Validators.required]),
      fecha_vencimiento: new FormControl('', [Validators.required]),
      componentes: new FormControl('', [Validators.required]),
      user_id: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      cantidad_recibida: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      observacion: new FormControl(''),
      estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl(''),
      centro_salud_id: new FormControl('', [Validators.required]),
      grupo_especial_id: new FormControl('', [Validators.required]),
      
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

    ngOnInit() 
    {
      this.getEstados();
      this.getTiposVacunas();
      this.informacionUsuario();
      this.getGruposEspeciales();
      
      const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
      if (params.id)
            {
              this.comboListService.getVacunasRecibida(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.vacunas = res;
                    this.Form.patchValue({
                      tipo_vacuna_id: this.vacunas.tipo_vacuna_id,
                      numero_lote: this.vacunas.numero_lote,
                      fecha_vencimiento: this.vacunas.fecha_vencimiento,
                      componentes: this.vacunas.componentes,
                      user_id: this.vacunas.user_id,
                      cantidad: this.vacunas.cantidad,
                      cantidad_recibida: this.vacunas.cantidad_recibida,
                      observacion: this.vacunas.observacion,
                      estado_id: this.vacunas.estado_id,
                      municipio_id: this.vacunas.municipio_id,
                      centro_salud_id: this.vacunas.centro_salud_id,
                      grupo_especial_id: this.vacunas.grupo_especial_id,
                       
                    });

                    this.edit = true;
                    this.EditMunicipio();
                    this.EditCentroSalud();
                  
                  },
                  err => console.log(err)
                );
          }

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
    



        Guardar() {
      
          this.comboListService.saveVacunasRecibidas(this.Form.value).subscribe(
            res => {
                  console.log(res);
                  //this.router.navigate(['/tiposvacunas/admin/list']);
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
    
          this.comboListService.updateVacunasRecibidas(this.vacunas.id, this.vacunas)
            .subscribe(
              res => {
                console.log('actualizando', res);
               this.router.navigate(['/vacunas_recibidas/admin/list']);
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


        onReset() {
     
          this.Form.reset();
      }




 // COMBO DEPENDIENTE //


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



    this.comboListService.getTodosCentrosSalud().pipe(
      map((centrosalud: any[]) => centrosalud.filter((centro) => centro.estado_id == id)
     )).subscribe((result) => {
      this.centrosalud = result;
      console.log(result);

     });

    

 }


 getCentroSalud(id: any): void
   {

     

     this.comboListService.getTodosCentrosSalud().pipe(
       map((centrosalud: any[]) => centrosalud.filter((centro) => centro.municipio_id == id)
      )).subscribe((result) => {
       this.centrosalud = result;
       console.log(result);

      });
   }


   EditCentroSalud() {
     this.comboListService.getTodosCentrosSalud().subscribe(res => {
       this.centrosalud = res;
       console.log(res);
     },
     err => {
       console.log(err);
     }
    );
   }


   getGruposEspeciales()
   {
     this.comboListService.getGruposEspeciales().subscribe(res => {
       this.grupoespeciales = res;
       console.log(res);
     },
     err => {
       console.log(err);
     }
    );
   }


}
