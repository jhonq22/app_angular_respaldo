import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventarioService } from '../../../../services/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComboListService } from '../../../../services/combo.service';
import Swal from 'sweetalert2';
import { HistoricoEstatusInterface, HistoricoInventarioInterface } from '../../../../interface';
import { map } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-inventario-form-admin',
  templateUrl: './inventario-form-admin.component.html',
  styleUrls: ['./inventario-form-admin.component.css']
})
export class InventarioFormAdminComponent implements OnInit {
  marcasSeralVerificada = false;

  inventario: any = {};
  edit = false;

  usuarioGuardar: any = {};

  // COMBO LIST //
  estados: any = {};
  municipios: any = {};
  centrosalud: any = {};
  estatusequipos: any = {};
  marcas: any = {};
  equipos: any = {};

  usuarios: any = [];

  prueba = 1;


  historicoestatus: HistoricoEstatusInterface = {
   'inventario_id': 0,
   'estatu_equipo_id': 0,
   'observacion': ''
  }



  historicoinventario: HistoricoInventarioInterface = {
    'inventario_id': 0,
    'user_id': 0,

   }





  createFormGroup() {
    return new FormGroup({
      estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required]),
      centro_salud_id: new FormControl('', [Validators.required]),
      servicio_medico: new FormControl('', [Validators.required]),
      piso: new FormControl('' ),
      equipo_id: new FormControl('', [Validators.required]),
      marca_id: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      serial: new FormControl('', [Validators.required]),
      numero_bien_nacional: new FormControl('', [Validators.required]),
      proveedor: new FormControl('', [Validators.required]),
      estatu_equipo_id: new FormControl('', [Validators.required]),
      observacion: new FormControl(''),
      reparado: new FormControl('', [Validators.required]),
     // fecha_instalacion: new FormControl('', [Validators.required]),
      proveedor_servicio: new FormControl('', [Validators.required]),
      user_id: new FormControl(''),

    });
  }


  Form: FormGroup;





  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private inventarioService: InventarioService,
    private comboListService: ComboListService,
    private auth: UserService
    )
    { this.Form = this.createFormGroup(); }

    ngOnInit() {

    



     // this.Form.get('piso').setValue(this.Form.value.equipo);
      const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
      if (params.id) 
            {
              this.inventarioService.getInventario(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log('Data de inventario: ', res);
                    this.inventario = res;
                    this.Form.patchValue({
                      estado_id: this.inventario.estado_id,
                      municipio_id: this.inventario.municipio_id,
                      centro_salud_id: this.inventario.centro_salud_id,
                      servicio_medico: this.inventario.servicio_medico,
                      piso: this.inventario.piso,
                      equipo_id: this.inventario.equipo_id,
                      marca_id: this.inventario.marca_id,
                      modelo: this.inventario.modelo,
                      serial: this.inventario.serial,
                      numero_bien_nacional: this.inventario.numero_bien_nacional,
                      proveedor: this.inventario.proveedor,
                      estatu_equipo_id: this.inventario.estatu_equipo_id,
                      observacion: this.inventario.observacion,
                      reparado: this.inventario.reparado,
                      fecha_instalacion: this.inventario.fecha_instalacion,
                      proveedor_servicio: this.inventario.proveedor_servicio,
                      user_id: this.inventario.user_id
                    });
                   // this.getCentroSalud(this.inventario.centro_salud_id);
                   // this.getMunicipios(this.inventario.municipio_id);
                    this.edit = true;
                    if(this.edit = true) 
      {
                   this. EditCentroSalud();
              this.EditMunicipio();
      }
                  },
                  err => console.log(err)
                );
            }

      this.getEstados();
      this.getMarcas();


      this.getEstatusEquipos();
      this.informacionUsuario();
      this.getEquipos();


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


          informacionUsuario() {
            this.auth.profile().subscribe(
              res => {
               this.usuarios = res;
               // alert(this.usuarios.user.id);
               console.log('usuario data', res);
               this.Form.get('user_id').setValue(this.usuarios.user.id);
               this.historicoinventario.user_id = this.usuarios.user.id;
              },
             err => {
                alert('Sesion Experiada..');
                this.router.navigateByUrl('/login');
              }
            );
          }






          saveInventario() {


            this.inventarioService.saveInventario(this.Form.value).subscribe(
              res => {
                   // alert(this.Form.value.user_id);
                    console.log(res);
                    this.usuarioGuardar = res;
                    console.log('Codigo vensalud guardado:', this.usuarioGuardar.id);
                    this.historicoestatus.inventario_id = this.usuarioGuardar.id;
                    this.historicoestatus.estatu_equipo_id = this.usuarioGuardar.estatu_equipo_id;
                    this.historicoestatus.observacion = this.usuarioGuardar.observacion;



                    this.historicoinventario.inventario_id = this.usuarioGuardar.id;



                   //aqui_historico this.GuardarHistoricoInventario();


                    this.informacionUsuario();
                    this.GuardarHistoricoInventarioHistorial();

                    Swal.fire(
                      'Exitoso!',
                      'Datos guardados correctamente...!',
                      'success'
                    );


                    if(this.usuarioGuardar.estatu_equipo_id == 3 || this.usuarioGuardar.reparado == 'con fallas' ) 
                    {
                      var answer = window.confirm("Desea Agregarle repuesto al equipo?");
                      if (answer) 
                      {
                        console.log('Confirmacion:', answer);
                        alert('Redirigiendo a Repuestos...');
                        this.router.navigate(['/respuestos/detalles/asignar', this.usuarioGuardar.id]);
                        
                   



                      }
     

                    }

                    else 
                    {
                     
                      if(this.usuarios.user.rol_id === 1)
                      {
    
                        this.router.navigate(['/inventario/admin/list']);
                      }
                      else if (this.usuarios.user.rol_id === 2)
                      { 
                        this.router.navigate(['/estadal/buscar/inventario/form']);
                      }
    
                      else if (this.usuarios.user.rol_id === 3) 
                      {
                        this.router.navigate(['/inventario/general/centrosalud', this.usuarios.user.centro_salud_id]);
    
    
                      }
    
                    }

  


              },
              err => {
                console.error(err);
                Swal.fire(
                  'Error!',
                  'Error, por favor verifique el formulario...',
                  'error'
                );

              }


              


            );
          }







          updateInventario() {

            this.historicoestatus.inventario_id = this.inventario.id;
            this.historicoestatus.estatu_equipo_id = this.Form.value.estatu_equipo_id;
            this.historicoestatus.observacion = this.Form.value.observacion;

            this.inventarioService.updateInventario(this.inventario.id, this.inventario)
              .subscribe(
                res => {
                  console.log(res);
                  this.usuarioGuardar = res;
                  this.informacionUsuario();

        
             
               


               
                    if(this.usuarioGuardar.estatu_equipo_id == 3 || this.usuarioGuardar.estatu_equipo_id == 4 ) 
                    {
                      var answer = window.confirm("Desea Agregarle repuesto al equipo?");
                      if (answer) 
                      {
                        alert('Redirigiendo a Repuestos...');
                        this.router.navigate(['/respuestos/detalles/asignar', this.usuarioGuardar.id]);
                      }

                    }

                    else 
                    {
                     

                      if(this.usuarios.user.rol_id === 1)
                      {
    
                        this.router.navigate(['/inventario/admin/list']);
                      }
                      else if (this.usuarios.user.rol_id === 2)
                      { 
                        this.router.navigate(['/estadal/buscar/inventario/form']);
                      }
    
                      else if (this.usuarios.user.rol_id === 3) 
                      {
                        this.router.navigate(['/inventario/general/centrosalud', this.usuarios.user.centro_salud_id]);
    
    
                      }
    
                    }


                  Swal.fire(
                    'Exitoso!',
                    'Datos Actualizados correctamente...!',
                    'success'
                  );
                  this.GuardarHistoricoInventarioHistorial();
                  this.GuardarHistoricoInventario();
                },
                err => {
                  console.error(err);
                  Swal.fire(
                    'Error!',
                    'Error, por favor verifique el formulario...',
                    'error'
                  );

                }
              );
          }


          GuardarHistoricoInventarioHistorial() {

            // delete this.movie.id; // para excluir los campo cuando se vayan a guardar

            // this.Form.get('piso').setValue(this.Form.value.equipo);
            this.comboListService.saveHistoricoInventario(this.historicoinventario).subscribe(
              res => {
                    console.log('historico inventario:', res);

                    Swal.fire(
                      'Exitoso!',
                      'Historico Historial guardado...!',
                      'success'
                    );
              },
              err => console.error(err)
            );
          }









          GuardarHistoricoInventario() {

            // delete this.movie.id; // para excluir los campo cuando se vayan a guardar

            // this.Form.get('piso').setValue(this.Form.value.equipo);
            this.inventarioService.saveHistoricoEstatusInventario(this.historicoestatus).subscribe(
              res => {
                    console.log(res);

                    Swal.fire(
                      'Exitoso!',
                      'Historico guardado...!',
                      'success'
                    );
              },
              err => console.error(err)
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
  /*
          getMunicipios(id: any): void
          {

               this.comboListService.getMunicipios().pipe(
              map((municipios: any[]) => municipios.filter((municipio) => municipio.estado_id == id)
             )).subscribe((result) => {
              this.municipios = result;
              console.log(result);

             });

          }


       */


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


          getEquipos()
          {
            this.comboListService.getEquipos().subscribe(res => {
              this.equipos = res;
              console.log(res);
            },
            err => {
              console.log(err);
            }
           );
          }


          VerificarMarcaSerial() {

            this.inventarioService.VerificarDuplicidadMarcas(this.Form.value.marca_id, this.Form.value.serial).subscribe(res => {
             // alert(this.marcasVerificada);

              console.log('la marca es:' , res);
             // alert(Object.keys(res).length);
              if(Object.keys(res).length == 0)
              {

                Swal.fire(
                  'Exitoso!',
                  'Verificados, si estan disponibles!!',
                  'success'
                );

                  //alert('Verificados,si esta disponible');
                this.marcasSeralVerificada = true;
              }

              else if (Object.keys(res).length == 1)
              {
                Swal.fire(
                  'Error!',
                  'Ya el Serial y Marca existen, No puede Registrarlos!!!',
                  'error'
                );
               // alert('Ya el Serial y Marca existen, No puede Registrarlos!!!');
                this.marcasSeralVerificada = false;
              }

            });

           err => {
            console.log(err);
            alert('Error')
          }

          }


        }



