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
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-importar-vacunados-admin-form',
  templateUrl: './importar-vacunados-admin-form.component.html',
  styleUrls: ['./importar-vacunados-admin-form.component.css']
})
export class ImportarVacunadosAdminFormComponent implements OnInit {

  
 // UPLOAD
 fileData: File = null;
 previewUrl: any = null;
 fileUploadProgress: string = null;
 uploadedFilePath: string = null;

 
// UPLOAD
centrosalud: any = [];
estados: any = [];
grupoespeciales: any = [];
usuarios: any = [];
municipios: any = [];
vacunas: any = [];



createFormGroup() {
  return new FormGroup({
    estado_id: new FormControl('', [Validators.required]),
    centro_salud_id: new FormControl('', [Validators.required]),
    grupo_especial_id: new FormControl('', [Validators.required]),
    municipio_id: new FormControl(''),
    user_id: new FormControl('', [Validators.required]),
   
   });
}

Form: FormGroup;























boton = true;
  constructor(
    private comboListService: CombolistService,
    private router: Router,
    private auth: UserService
    
  ) {  this.Form = this.createFormGroup(); }
  ngOnInit(): void {

    this.getEstados();
    this.informacionUsuario();
    this.getGruposEspeciales();
  }




  
  informacionUsuario() {
    this.auth.profile().subscribe(
      res => {
       this.usuarios = res;
         console.log('usuario data', res);
        //this.usuarios.user.centro_salud_id);
        //alert(this.Form.get('user_id'));
        this.Form.get('user_id').setValue(this.usuarios.user.id);
      
      },
     err => {
        alert('Sesion Experiada..');
        this.router.navigateByUrl('/login');
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

  getMunicipios(id: any): void
  {
    this.comboListService.getMunicipios().pipe(
      map((municipios: any[]) => municipios.filter((municipio) => municipio.estado_id == id)
     )).subscribe((result) => {
      this.municipios = result;
      console.log(result);


      this.comboListService.getTodosCentrosSalud().pipe(
        map((centrosalud: any[]) => centrosalud.filter((centro) => centro.estado_id == id)
       )).subscribe((result) => {
        this.centrosalud = result;
        console.log(result);
  
       });
      
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
















  resetForm() {
    this.Form.reset();
  }



                    // UPLOADS
         // AQUI ABAJO ESTA TODO EL FORM PARA SUBIR LOS ARCHIVOS




 onChange($event: any): void {
  console.log("onChange");
  // this.log += new Date() + "<br />";
}

onPaste($event: any): void {
  console.log("onPaste");
  // this.log += new Date() + "<br />";
}

                  fileProgress(fileInput: any) {
                    this.fileData = <File>fileInput.target.files[0];
                    this.preview();
                  }

                  preview() {
                  // Show preview 
                  var mimeType = this.fileData.type;
                  if (mimeType.match(/image\/*/) == null) {
                           return;
                   
                }
                

                  var reader = new FileReader();      
                  reader.readAsDataURL(this.fileData); 
                  reader.onload = (_event) => { 
                    this.previewUrl = reader.result; 
                  };
                  }


                  SubirImagen() {
                  const formData = new FormData();
                  formData.append('file', this.fileData);
                  formData.append('estado_id', this.Form.value.estado_id);
                  formData.append('centro_salud_id', this.Form.value.centro_salud_id);
                  formData.append('grupo_especial_id', this.Form.value.grupo_especial_id);
                  formData.append('user_id', this.Form.value.user_id);
                  formData.append('estatu_convocado_id', '1');
                  








                 // formData.append('password', this.Form.value.password);
                  //formData.append('ente_id', this.Form.value.ente_id);
                  // alert(this.Form.value.password);

                  this.fileUploadProgress = '0%';

                  this.comboListService.importExcelVacunadosMasiva(formData).subscribe(events => {
                  if(events.type === HttpEventType.UploadProgress) {
                    this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';

                    console.log('calculando:', this.fileUploadProgress);
                    this.boton = false;
                  } else if(events.type === HttpEventType.Response) {
                    this.fileUploadProgress = '';
                    console.log(events.body);
                   // this.router.navigate(['/usuario/list']);
                    Swal.fire(
                      'Exitoso!',
                      'Archivo Cargado Correctamente!!!',
                      'success'
                    );
                    this.resetForm();
                    this.boton = true;

                  }
                  },
                  
                  err => {
                    console.error(err);
                    if (err.status === 0)
                    {
                      Swal.fire(
                        'Error!',
                        'El servidor no esta activo, no podra ingresar al sistema por favor contactar al Administrador...',
                        'error'
                      );
                      this.router.navigateByUrl('/login');
                    }
                    else if (err.status === 500)
                    {
                      Swal.fire(
                        'Error!',
                        '!Archivo de Excel incorrecto, por Favor corregirlo...',
                        'error'
                      );
                      this.boton = true;
                    }
                  }

                  );
                  }
  formData(formData: any) {
    throw new Error("Method not implemented.");
  }








}
