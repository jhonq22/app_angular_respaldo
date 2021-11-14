import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ComboListService } from '../../../../services/combo.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { InventarioService } from '../../../../services/inventario.service';

@Component({
  selector: 'app-import-excel-inventario',
  templateUrl: './import-excel-inventario.component.html',
  styleUrls: ['./import-excel-inventario.component.css']
})
export class ImportExcelInventarioComponent implements OnInit {


 // UPLOAD
 fileData: File = null;
 previewUrl: any = null;
 fileUploadProgress: string = null;
 uploadedFilePath: string = null;

// UPLOAD

boton = true;


  usuarios: any = [];
  estados: any = {};
  municipios: any = {};
  centrosalud: any = {};
  estatusequipos: any = {};
  marcas: any = {};


  centro_salud_id = '';
  municipio_id = '';
  estado_id = '';
  estatu_equipo_id = '';
  marca_id = '';
  user_id = '';

  createFormGroup() {
    return new FormGroup({
       estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required]),
      centro_salud_id: new FormControl('', [Validators.required]),
     // estatu_equipo_id: new FormControl('', [Validators.required]),
    //  marca_id: new FormControl('', [Validators.required]),
    });
  }

  Form: FormGroup;









  constructor(
    private auth: UserService,
    private comboListService: ComboListService,
    private router: Router,
    private inventarioService: InventarioService
  ) { this.Form = this.createFormGroup();  }

  ngOnInit() {
    this.informacionUsuario();
    this.getEstados();
    this.getEstatusEquipos();
    this.getMarcas();
  }


  informacionUsuario() {

    this.auth.profile().subscribe(
      res => {
        this.usuarios = res;
        this.user_id = this.usuarios.user.id;
        console.log(res);
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

          getEstatusEquipos()
          {
            this.comboListService.getEstatusEquipos().subscribe(res => {
              this.estatusequipos = res;
              console.log(res);
            },
            err => {
              console.log(err);
            }
           );
          }


          getMarcas()
          {
            this.comboListService.getMarcas().subscribe(res => {
              this.marcas = res;
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





               // AQUI ABAJO ESTA TODO EL FORM PARA SUBIR LOS ARCHIVOS




 onChange($event: any): void {
  console.log("onChange");
  // this.log += new Date() + "<br />";
}

onPaste($event: any): void {
  console.log("onPaste");
  // this.log += new Date() + "<br />";
}


                  // UPLOADS

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
                  formData.append('municipio_id', this.Form.value.municipio_id);
                  formData.append('centro_salud_id', this.Form.value.centro_salud_id);
                 // formData.append('marca_id', this.Form.value.marca_id);
                 // formData.append('estatu_equipo_id', this.Form.value.estatu_equipo_id);
                  formData.append('user_id', this.user_id);








                 // formData.append('password', this.Form.value.password);
                  //formData.append('ente_id', this.Form.value.ente_id);
                  // alert(this.Form.value.password);

                  this.fileUploadProgress = '0%';

                  this.inventarioService.importExcelInventarioMasiva(formData).subscribe(events => {
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
