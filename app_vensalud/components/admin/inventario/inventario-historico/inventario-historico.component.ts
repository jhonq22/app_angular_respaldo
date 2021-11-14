import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { InventarioService } from '../../../../services/inventario.service';



@Component({
  selector: 'app-inventario-historico',
  templateUrl: './inventario-historico.component.html',
  styleUrls: ['./inventario-historico.component.css']
})
export class InventarioHistoricoComponent implements OnInit {

  inventario: any = [];
  historico: any = [];
  galeria: any = [];
  paginate = 1;

    // UPLOAD
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;

    createFormGroup() {
      return new FormGroup({
        imagen: new FormControl('', [Validators.required]),
        nombre_archivo: new FormControl('', [Validators.required]),
        inventario_id: new FormControl('', [Validators.required]),

      });
    }


    ListadoInventario() {
      return new FormGroup({
        estado_id: new FormControl('', [Validators.required]),
        municipio_id: new FormControl('', [Validators.required]),
        centro_salud_id: new FormControl('', [Validators.required]),
        servicio_medico: new FormControl('', [Validators.required]),
        piso: new FormControl('' ),
        equipo: new FormControl('', [Validators.required]),
        marca_id: new FormControl('', [Validators.required]),
        modelo: new FormControl('', [Validators.required]),
        serial: new FormControl('', [Validators.required]),
        numero_bien_nacional: new FormControl('', [Validators.required]),
        proveedor: new FormControl('', [Validators.required]),
        estatu_equipo_id: new FormControl('', [Validators.required]),
        observacion: new FormControl(''),
        reparado: new FormControl('', [Validators.required]),
        reparado_persona: new FormControl('', ),
        proveedor_servicio: new FormControl('', [Validators.required]),
        user_id: new FormControl('1', [Validators.required]),

      });
    }


    Form: FormGroup;

    ListInventario: FormGroup;

    showModal: boolean;

    constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private inventarioService: InventarioService,
    ) {
        this.Form = this.createFormGroup();
        this.ListInventario = this.ListadoInventario();
      }

      ngOnInit() {

        const urlID = this.activatedRoute.snapshot.params;
        if (urlID.id)
        {
          this.Form.get('inventario_id').setValue(urlID.id);
        }

        this.GaleriaFotos();
        this.HistoricoEstatus();
        this.DatosInventario();
      } 

      GaleriaFotos()
      {
        const params = this.activatedRoute.snapshot.params;
        this.inventarioService.getInventarioMultimedia(params.id).subscribe ( res => {
          this.galeria = res;
          console.log('galeria:', res);

        },

        err => console.log(err)

        );
      }

      HistoricoEstatus() {
        const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
        if (params.id)
              {
               this.inventarioService.getHistoricoEstatusInventarioEquipo(params.id)
                  .subscribe(
                    res => { // aqui tomo las respuesta
                      console.log(res);
                      this.historico = res;
                      console.log('historico:', this.historico);
                    },
                    err => console.log(err)
                  );
              }
      }


      DatosInventario() {
        const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
        if (params.id)
              {
                // this.Form.get('inventario_id').setValue(params.id);

                this.inventarioService.getInventarioDetallado(params.id) // obtengo el juego con el parametro del id
                  .subscribe(
                    res => { // aqui tomo las respuesta
                      console.log('inventario detallado:', res);
                      this.inventario = res;
                    },
                    err => console.log(err)
                  );
              }

      }


    



      EliminarFotoGaleria(id)
      {
        Swal.fire({
          title: 'Estas Seguro?',
          text: "Eliminar Foto",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Quiero Eliminar',
          cancelButtonText: 'Cancelar.'
        }).then((result) => {
          if (result.value) {
  
            this.inventarioService.deleteInventarioMultimedia(id).subscribe( (data) => {
             
            
              this.GaleriaFotos(); 

            }, (error)=> {

            });
            Swal.fire(
              'Foto Eliminada!',
              'Eliminada de la Galeria',
              'success'
            )
          }
        })
  
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
          formData.append('imagen', this.fileData);
          formData.append('nombre_archivo', this.Form.value.nombre_archivo);
          formData.append('inventario_id', this.Form.value.inventario_id);


          this.fileUploadProgress = '0%';

          this.inventarioService.guardarGaleriaInventario(formData).subscribe(events => {
          if(events.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
            console.log(this.fileUploadProgress);
          } else if(events.type === HttpEventType.Response) {
            this.fileUploadProgress = '';
            console.log(events.body);
            alert('Imagen Guardada !!');
            this.GaleriaFotos();
          }

          });
          }
formData(formData: any) {
throw new Error("Method not implemented.");
}



}
