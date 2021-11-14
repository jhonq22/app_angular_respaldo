import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { ComboListService } from '../../../services/combo.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuario: any = {};
  edit = false;
  paginate: 1;
  entes: any = {};

  estados: any = {};
  municipios: any = {};
  centrosalud: any = {};


  // UPLOAD
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

 // UPLOAD

  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      ente_id: new FormControl('', [Validators.required]),
      rol_id: new FormControl('', [Validators.required]),
      centro_salud_id: new FormControl('', [Validators.required]),
      estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      nombre_img: new FormControl(''),
    });
  }


   // tslint:disable-next-line: member-ordering
   Form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private comboListService: ComboListService)
    { this.Form = this.createFormGroup(); }


        ngOnInit() 
          {

            const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
            if (params.id)
                  {
                    this.userService.getUsuario(params.id) // obtengo el juego con el parametro del id
                      .subscribe(
                        res => { // aqui tomo las respuesta
                          console.log(res);
                          this.usuario = res;
                          this.Form.patchValue({
                            name: this.usuario.name,
                            email: this.usuario.email,
                            password: this.usuario.password,
                            ente_id: this.usuario.ente_id,
                            rol_id: this.usuario.rol_id,
                            centro_salud_id: this.usuario.centro_salud_id,
                            estado_id: this.usuario.estado_id,
                            image: this.usuario.image,
                            nombre_img: this.usuario.password,
                          });

                          this.edit = true;
                        },
                        err => console.log(err)
                      );
                }

            this.getEntes();
            this.getEstados();
            // this.getCentroSalud();
          }



          GuardarUsuario() {

            // delete this.movie.id; // para excluir los campo cuando se vayan a guardar
            this.userService.register(this.Form.value).subscribe(
              res => {
                    console.log(res);
                    this.router.navigate(['/usuario/list']);
                    Swal.fire(
                      'Exitoso!',
                      'Datos guardados correctamente...!',
                      'success'
                    );
              },
              err => console.error(err)
            );
          }

          ActualizarUsuario() {

            this.userService.updateUsuario(this.usuario.id, this.usuario)
              .subscribe(
                res => {
                  console.log(res);
                  this.router.navigate(['/usuario/list']);
                  Swal.fire(
                    'Exitoso!',
                    'Datos actualizados correctamente...!',
                    'success'
                  );
                },
                err => console.error(err)
              );
          }



          getEntes()
          {
            this.comboListService.getEntes().subscribe(res => {
              this.entes = res;
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
                  formData.append('image', this.fileData);
                  formData.append('name', this.Form.value.name);
                  formData.append('email', this.Form.value.email);
                  formData.append('password', this.Form.value.password);
                  formData.append('ente_id', this.Form.value.ente_id);
                  alert(this.Form.value.password);

                  this.fileUploadProgress = '0%';

                  this.userService.saveUsuarioMultimedia(formData).subscribe(events => {
                  if(events.type === HttpEventType.UploadProgress) {
                    this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
                    console.log(this.fileUploadProgress);
                  } else if(events.type === HttpEventType.Response) {
                    this.fileUploadProgress = '';
                    console.log(events.body);
                    this.router.navigate(['/usuario/list']);
                    Swal.fire(
                      'Exitoso!',
                      'Datos actualizados correctamente...!',
                      'success'
                    );
                  }

                  
                  });
                  }
  formData(formData: any) {
    throw new Error("Method not implemented.");
  }
          

        }