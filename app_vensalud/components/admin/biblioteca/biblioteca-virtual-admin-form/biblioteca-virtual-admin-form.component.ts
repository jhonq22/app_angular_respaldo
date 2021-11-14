import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { ComboListService } from '../../../../services/combo.service';
import { HttpClient, HttpEventType } from '@angular/common/http';



@Component({
  selector: 'app-biblioteca-virtual-admin-form',
  templateUrl: './biblioteca-virtual-admin-form.component.html',
  styleUrls: ['./biblioteca-virtual-admin-form.component.css']
})
export class BibliotecaVirtualAdminFormComponent implements OnInit {

  biblioteca: any = [];
  edit = false;

    // UPLOAD
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;


  createFormGroup() {
    return new FormGroup({
      tipo_bibloteca: new FormControl('', [Validators.required]),
      equipo: new FormControl(''),
      marca: new FormControl(''),
      modelo: new FormControl(''),
      url_archivo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    
     });
  }



   // tslint:disable-next-line: member-ordering
   Form: FormGroup;


   constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private comboListService: ComboListService)
    { this.Form = this.createFormGroup(); }

    ngOnInit()
    {

      const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
      if (params.id)
            {
              this.comboListService.getBiblioteca(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.biblioteca = res;
                    this.Form.patchValue({
                      tipo_bibloteca: this.biblioteca.tipo_bibloteca,
                      equipo: this.biblioteca.equipo,
                      marca: this.biblioteca.marca,
                      modelo: this.biblioteca.modelo,
                      url_archivo: this.biblioteca.url_archivo,
                      descripcion: this.biblioteca.descripcion,

                    });

                    this.edit = true;
                  },
                  err => console.log(err)
                );
          }

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
  formData.append('url_archivo', this.fileData);
  formData.append('tipo_bibloteca', this.Form.value.tipo_bibloteca);
  formData.append('equipo', this.Form.value.equipo);
  formData.append('marca', this.Form.value.marca);
  formData.append('modelo', this.Form.value.modelo);
  formData.append('descripcion', this.Form.value.descripcion);



  this.fileUploadProgress = '0%';

  this.comboListService.guardarArchivoBiblioteca(formData).subscribe(events => {
  if(events.type === HttpEventType.UploadProgress) {
    this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
    console.log(this.fileUploadProgress);
  } else if(events.type === HttpEventType.Response) {
    this.fileUploadProgress = '';
    console.log(events.body);
    alert('Imagen Guardada !!');
    
  }

  });
  }
formData(formData: any) {
throw new Error("Method not implemented.");
}




































        GuardarMarca() {

          // delete this.movie.id; // para excluir los campo cuando se vayan a guardar
          this.comboListService.saveBibliotecas(this.Form.value).subscribe(
            res => {
                  console.log(res);
                  this.router.navigate(['/biblioteca/admin/list']);
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


        ActualizarMarcas() {

          this.comboListService.updateBibliotecas(this.biblioteca.id, this.biblioteca)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/biblioteca/admin/list']);
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
