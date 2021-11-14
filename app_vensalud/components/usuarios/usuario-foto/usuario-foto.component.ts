import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-usuario-foto',
  templateUrl: './usuario-foto.component.html',
  styleUrls: ['./usuario-foto.component.css']
})
export class UsuarioFotoComponent implements OnInit {

  usuario: any = {};

  // UPLOAD
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

 // UPLOAD

  createFormGroup() {
    return new FormGroup({
      image: new FormControl(''),
      nombre_img: new FormControl(''),
    });
  }


   // tslint:disable-next-line: member-ordering
   Form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService)
    { this.Form = this.createFormGroup(); }

  ngOnInit() {

    const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
    if (params.id)
          {
            this.userService.getUsuario(params.id) // obtengo el juego con el parametro del id
              .subscribe(
                res => { // aqui tomo las respuesta
                  console.log(res);
                  this.usuario = res;
                  this.Form.patchValue({
                    image: this.usuario.image,
                    nombre_img: this.usuario.password,
                  });
                },
                err => console.log(err)
              );
        }
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
                  this.fileUploadProgress = '0%';

                  this.userService.SubirFoto(this.usuario.id, formData).subscribe(events => {
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
