import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventarioService } from '../../../../services/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';




@Component({
  selector: 'app-inventario-multimedia-form',
  templateUrl: './inventario-multimedia-form.component.html',
  styleUrls: ['./inventario-multimedia-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventarioMultimediaFormComponent implements OnInit {

   // UPLOAD
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

 // UPLOAD

  inventario: any = {};
  historico: any = {};
  multimedia: any = {};
  paginate = 1;










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

                this.DatosInventario();
                this.HistoricoEstatus();
                this.GaleriaFotos();

                    }



                    GaleriaFotos()
                    {
                      const params = this.activatedRoute.snapshot.params;
                      this.inventarioService.getInventarioMultimedia(params.id).subscribe ( res => {
                        this.multimedia = res;
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
                                    console.log(this.historico);
                                  },
                                  err => console.log(err)
                                );
                            }

                    }















                    DatosInventario() {
                      const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
                      if (params.id)
                            {
                              this.Form.get('inventario_id').setValue(params.id);
  
                              this.inventarioService.getInventario(params.id) // obtengo el juego con el parametro del id
                                .subscribe(
                                  res => { // aqui tomo las respuesta
                                    console.log(res);
                                    this.inventario = res;
                                    this.ListInventario.patchValue({
                                      estado_id: this.inventario.estado_id,
                                      municipio_id: this.inventario.municipio_id,
                                      centro_salud_id: this.inventario.centro_salud_id,
                                      servicio_medico: this.inventario.servicio_medico,
                                      piso: this.inventario.piso,
                                      equipo: this.inventario.equipo,
                                      marca_id: this.inventario.marca_id,
                                      modelo: this.inventario.modelo,
                                      serial: this.inventario.serial,
                                      numero_bien_nacional: this.inventario.numero_bien_nacional,
                                      proveedor: this.inventario.proveedor,
                                      estatu_equipo_id: this.inventario.estatu_equipo_id,
                                      observacion: this.inventario.observacion,
                                      reparado: this.inventario.reparado,
                                      reparado_persona: this.inventario.reparado_persona,
                                      proveedor_servicio: this.inventario.proveedor_servicio,
                                      user_id: this.inventario.user_id
                                    });
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
                    this.ngOnInit();
                  }

                  });
                  }
  formData(formData: any) {
    throw new Error("Method not implemented.");
  }







}
