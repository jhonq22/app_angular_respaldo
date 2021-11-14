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
  selector: 'app-vacunados-master-patria-admin-form',
  templateUrl: './vacunados-master-patria-admin-form.component.html',
  styleUrls: ['./vacunados-master-patria-admin-form.component.css']
})
export class VacunadosMasterPatriaAdminFormComponent implements OnInit {

  today: Date = new Date();
  currentDate = moment().format("YYYY-MM-DD");
  isToday = (this.today.toDateString())


  // esta es la fecha de la dosis 1 convertida
  fechaHoyDate: Date    


  fecha_actual = `${this.today.getFullYear()}-${this.today.getMonth()+1}-${this.today.getDate()}`;

  date: Date;
  formDosis2 = false;
  ocultarActualizar = false;
  desercion2 = false;
  centroSalud = '';

  // QR
  
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  //value = 'https://www.techiediaries.com/';

estatusDosis2 = false;

  estatusForm = false;
  EstDosis2 = false;


  convocadosPatria : any = [];















  
  covid: any = {
    cedula1 :'000000',
  };
  //


  



  cedulados: any = [];
  vacunas: any = [];
  centrosalud: any = [];
  parroquias: any = [];
  vacunasng: any = [];
  estados: any = [];
  municipios: any = [];
  etnias: any = [];
  tipovacunas: any = [];
  grupoespeciales: any = [];
  puebloindigenas: any = [];
  usuarios: any = [];
  

  edit = false;
  vacunasCedula: any = [];
  

  createFormGroup() {
    return new FormGroup({
      tipo_identificacion: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required,  Validators.minLength(5)]),
      nombres: new FormControl('', [Validators.required,  /*Validators.pattern("^[a-zA-Z ]*$")*/]),
      apellidos: new FormControl('', [Validators.required, /*Validators.pattern("^[a-zA-Z ]*$")*/]),
      sexo: new FormControl('', [Validators.required]),
      fecha_nacimiento: new FormControl('', [Validators.required, DateValidator.dateVaidator]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(11) , Validators.pattern("^[0-9]*$")]),
      estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required]),
      parroquia_id: new FormControl('', [Validators.required]),
      centro_salud_id: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ]),
      dosis1: new FormControl('', [Validators.required]),
      fecha_dosis1: new FormControl('', [Validators.required]),
      dosis2: new FormControl(''),
      fecha_dosis2: new FormControl(''),
      tipo_vacuna_id: new FormControl('', [Validators.required]),
      lote1: new FormControl('', [Validators.required]),
      lote2: new FormControl(''),
      establecimiento_laboral: new FormControl(''),
      pueblo_indigena_id: new FormControl('', [Validators.required]),
      etnia_id: new FormControl('', [Validators.required]),
      grupo_especial_id: new FormControl('', [Validators.required]),
      user_id: new FormControl('', [Validators.required]),
      motivo_desercion: new FormControl(''),
      //imagen_qr: new FormControl(''),
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

      Swal.fire(
        'Atentos!!',
        `Bienvenido a Formulario de Vacunados. Por favor revisar la fecha de la primera dosis que este correctamente..`,
        'warning'
      );


      const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
      if (params.id)
            {
              this.vacunasService.getVacuna(params.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.vacunas = res;
                    this.Form.patchValue({
                      tipo_identificacion: this.vacunas.tipo_identificacion,
                      cedula: this.vacunas.cedula,
                      nombres: this.vacunas.nombres,
                      apellidos: this.vacunas.apellidos,
                      fecha_nacimiento: this.vacunas.fecha_nacimiento,
                      telefono: this.vacunas.telefono,
                      estado_id: this.vacunas.estado_id,
                      municipio_id: this.vacunas.municipio_id,
                      centro_salud_id: this.vacunas.centro_salud_id,
                      parroquia_id: this.vacunas.parroquia_id,
                      sexo: this.vacunas.sexo,
                      direccion: this.vacunas.direccion,
                      email: this.vacunas.email,
                      dosis1: this.vacunas.dosis1,
                      fecha_dosis1: this.vacunas.fecha_dosis1,
                      dosis2: this.vacunas.dosis2,
                      fecha_dosis2: this.vacunas.fecha_dosis2,
                      tipo_vacuna_id: this.vacunas.tipo_vacuna_id,
                      lote1: this.vacunas.lote1,
                      lote2: this.vacunas.lote2,
                      establecimiento_laboral: this.vacunas.establecimiento_laboral,
                      pueblo_indigena_id: this.vacunas.pueblo_indigena_id,
                      etnia_id: this.vacunas.etnia_id,
                      grupo_especial_id: this.vacunas.grupo_especial_id,
                      user_id: this.vacunas.user_id,
                      motivo_desercion: this.vacunas.motivo_desercion,

                      

                      //imagen_qr: this.vacunas.imagen_qr,
                      
                    });

             
                         
                
                 // let dosis1Day = new Date(this.Form.value.fecha_dosis1)
                   this.date = new Date(this.Form.value.fecha_dosis1);
                   this.date.setDate(this.date.getDate() + 15);
                    


                   this.fechaHoyDate = new Date();
                   this.fechaHoyDate.setDate(this.fechaHoyDate.getDate());
                 
                         
                  if (this.fechaHoyDate >= this.date) 
                  {
                                        
                    this.EstDosis2 = true;

                    // alert(this.EstDosis2);
                    Swal.fire(
                      'Exitoso!',
                      `La persona con cédula: ${this.vacunas.cedula}, ya se le aplicó la 1era dosis, por favor verifique sus datos y proceda a cargar los datos de la 2da dosis`,
                      'success'
                    );
                  }

                  else {
                    this.EstDosis2 = false;
                                   
                  }

                 
                
                    


                    this.edit = true;
                    this.EditMunicipio();
                    this.EditCentroSalud();
                    this.EditParroquias();
                  },
                  err => console.log(err)
                );
          }

     
      this.getEstados();
      this.getEtnias();
      this.getGruposEspeciales();
      this.getPueblosIndigenas();
      this.getTiposVacunas();
      this.informacionUsuario();
     
    
    }


    ConvertToLower(evt) {
      this.vacunas.email = evt.toLowerCase();
  }


    informacionUsuario() {
      this.auth.profile().subscribe(
        res => {
         this.usuarios = res;
         // alert(this.usuarios.user.id);
         console.log('usuario data', res);
         this.Form.get('centro_salud_id').setValue(this.usuarios.user.centro_salud_id);
         this.Form.get('user_id').setValue(this.usuarios.user.id);
         this.centroSalud = this.usuarios.user.centro_salud_id;
        
        },
       err => {
          alert('Sesion Experiada..');
          this.router.navigateByUrl('/login');
        }
      );
    }

    
    validarFechadosis2() 
    {
      if(Object.keys(this.vacunas.dosis2).length >= 1) 
      {
      
      /*  Swal.fire(
          'Atencion!!',
          `Es Obligatorio llenar el campo de Fecha dosis 2 y Lote 2. No Aparecerá el boton de Actualizar...`,
          'warning'
        );
        */
       

        if(Object.keys(this.vacunas.fecha_dosis2).length >= 1 && Object.keys(this.vacunas.lote2).length >= 1 )
        {
          this.formDosis2 = true;
          this.ocultarActualizar = true;
          Swal.fire(
            'Exito!!',
            `Datos completados, ahora podra guardar la Dosis 2 del vacunado.`,
            'success'
          );
        }

      else {
        alert('Por favor faltan fecha dosis 2 y lote 2 por llenar...');

        }


      }


    }


    onBlurMethod() {
      
     
      if(Object.keys(this.vacunas.cedula).length >= 6 && this.edit==false && Object.keys(this.vacunas.tipo_identificacion).length >= 1) 
       {


    

















        this.vacunasService.getVacunaCedula(this.vacunas.cedula, this.vacunas.tipo_identificacion).subscribe(res => 
        {
        if(Object.keys(res).length >= 1)
         {

          Swal.fire(
            'Exitoso!',
            `El Usuario con la cedula: ${this.vacunas.cedula}, ya se encuentra registrado. Sus datos se llenaran automaticamente!!!`,
            'success'
          );

       
          this.vacunasng = res;
          
          this.estatusForm = true;
          console.log(res);
          
                  //foreach
                        this.vacunasng.forEach(element => {
                        element.tipo_identificacion = this.vacunas.tipo_identificacion
                        element.cedula = this.vacunas.cedula
                      
                        this.vacunas.id = element.id,
                        this.vacunas.nombres = element.nombres,
                        this.vacunas.apellidos = element.apellidos,
                        this.vacunas.fecha_nacimiento = element.fecha_nacimiento,
                        this.vacunas.telefono = element.telefono,
                        this.vacunas.estado_id =  element.estado_id,
                        this.vacunas.municipio_id = element.municipio_id,
                        this.vacunas.parroquia_id = element.parroquia_id,
                        this.vacunas.centro_salud_id = element.centro_salud_id,
                        this.vacunas.sexo = element.sexo,
                        this.vacunas.direccion = element.direccion,
                        this.vacunas.email =  element.email,
                        this.vacunas.dosis1 = element.dosis1,
                        this.vacunas.fecha_dosis1 = element.fecha_dosis1,
                        this.vacunas.dosis2 = element.dosis2,
                        this.vacunas.fecha_dosis2 = element.fecha_dosis2,
                        this.vacunas.tipo_vacuna_id = element.tipo_vacuna_id, 
                        this.vacunas.lote1 = element.lote1,
                        this.vacunas.lote2 = element.lote2,
                        this.vacunas.establecimiento_laboral = element.establecimiento_laboral, 
                        this.vacunas.pueblo_indigena_id = element.pueblo_indigena_id, 
                        this.vacunas.etnia_id = element.etnia_id,  
                        this.vacunas.grupo_especial_id = element.grupo_especial_id,
                        this.vacunas.motivo_desercion = element.motivo_desercion
                        
                        


                        this.vacunasService.getVacuna(this.vacunas.id) // obtengo el juego con el parametro del id
                .subscribe(
                  res => { // aqui tomo las respuesta
                    console.log(res);
                    this.vacunas = res;
                    this.Form.patchValue({
                      tipo_identificacion: this.vacunas.tipo_identificacion,
                      cedula: this.vacunas.cedula,
                      nombres: this.vacunas.nombres,
                      apellidos: this.vacunas.apellidos,
                      fecha_nacimiento: this.vacunas.fecha_nacimiento,
                      telefono: this.vacunas.telefono,
                      estado_id: this.vacunas.estado_id,
                      municipio_id: this.vacunas.municipio_id,
                      parroquia_id: this.vacunas.parroquia_id,
                      centro_salud_id: this.vacunas.centro_salud_id,
                      sexo: this.vacunas.sexo,
                      direccion: this.vacunas.direccion,
                      email: this.vacunas.email,
                      dosis1: this.vacunas.dosis1,
                      fecha_dosis1: this.vacunas.fecha_dosis1,
                      dosis2: this.vacunas.dosis2,
                      fecha_dosis2: this.vacunas.fecha_dosis2,
                      tipo_vacuna_id: this.vacunas.tipo_vacuna_id,
                      lote1: this.vacunas.lote1,
                      lote2: this.vacunas.lote2,
                      establecimiento_laboral: this.vacunas.establecimiento_laboral,
                      pueblo_indigena_id: this.vacunas.pueblo_indigena_id,
                      etnia_id: this.vacunas.etnia_id,
                      grupo_especial_id: this.vacunas.grupo_especial_id,
                      motivo_desercion: this.vacunas.motivo_desercion
                      
                      //imagen_qr: this.vacunas.imagen_qr,
                      
                    });

                    this.date = new Date(this.Form.value.fecha_dosis1);
                    this.date.setDate(this.date.getDate() + 15);
                     
 
 
                    this.fechaHoyDate = new Date();
                    this.fechaHoyDate.setDate(this.fechaHoyDate.getDate());
                  
                            
                   if (this.fechaHoyDate >= this.date) 
                   {
                                         
                                         this.EstDosis2 = true;
 
                   
                     Swal.fire(
                      'Exitoso!',
                      `La persona con cédula: ${this.vacunas.cedula}, ya se le aplicó la 1era dosis, por favor verifique sus datos y proceda a cargar los datos de la 2da dosis`,
                      'success'
                    );
                   }
 
                   else {
                     this.EstDosis2 = false;
                                   
                   }




                    this.EditMunicipio();
                    this.EditParroquias();
                   
                  },
                  err => console.log(err)
                );

                       

                        
                    
                  });
                }

                // AQUI TERMINA EL IF de lenght //
                else {

                  if(this.vacunas.cedula == this.covid.cedula ) {
                    Swal.fire(
                      'Error!',
                      `El Paciente con la cedula: ${this.vacunas.cedula}, tuvo COVID 19 y no puede ser vacunado!!!`,
                      'error'
                    );
                   }
                   else 
                  // ELSE PRINCIPAL 
                  {

               

                     // LLAVE DE LA FUNCION DE SAIME //   
                    {

                        
                      this.informacionUsuario();
                      
                      this.vacunasService.getVacunaCedulaPatria(this.vacunas.cedula, this.centroSalud ).subscribe(req => 
                        {
                        this.convocadosPatria = req;
                        console.log(req);
                        
                        if(Object.keys(req).length >= 1)
                        {

                          
                                                 
   
                        
                         this.vacunasService.getCeduladosSaime(this.vacunas.cedula, this.vacunas.tipo_identificacion) // obtengo el juego con el parametro del id
                           .subscribe(
                             res => { // aqui tomo las respuesta
   
                               if(Object.keys(res).length >= 1) 
                               {
                               console.log('Cedulados SAIME: ', res);
                               this.cedulados = res;
                               
                               this.cedulados.forEach(element => {
                             
           
                                
           
                                
                             this.estatusForm = false;
                                 
                              this.vacunas.nombres = `${element.primernombre} ${element.segundonombre}`;
                               this.vacunas.apellidos = `${element.primerapellido} ${element.segundoapellido}`;
                               this.vacunas.fecha_nacimiento = element.fechanac;
                               this.vacunas.telefono = '';
                               this.vacunas.estado_id =  '';
                               this.vacunas.centro_salud_id =  '';
                               this.vacunas.parroquia_id =  '';
                               this.vacunas.municipio_id = '';
                               this.vacunas.sexo = '';
                               this.vacunas.direccion = '';
                               this.vacunas.email =  '';
                               this.vacunas.dosis1 = '';
                               this.vacunas.fecha_dosis1 = '';
                               this.vacunas.dosis2 = '';
                               this.vacunas.fecha_dosis2 = '';
                               this.vacunas.tipo_vacuna_id = '';
                               this.vacunas.lote1 = '';
                               this.vacunas.lote2 = '';
                               this.vacunas.establecimiento_laboral = '';
                               this.vacunas.pueblo_indigena_id = '';
                               this.vacunas.etnia_id = '';
                               this.vacunas.grupo_especial_id = '';
                               this.vacunas.motivo_desercion = '';
                   
                               
   
                              
                              
                           });
           
                           Swal.fire(
                             'Exitoso!',
                             `El Paciente con la cedula: ${this.vacunas.cedula}, puede ser vacunado en este Centro de Salud!!!`,
                             'success'
                           );
                          
                         }
   
                           else {
   
                             Swal.fire(
                               'Exitoso!',
                               `El Paciente con la cedula: ${this.vacunas.cedula}, puede ser vacunado en este Centro de Salud!!!`,
                               'success'
                             );
   
                             
                             this.vacunas.nombres = '';
                             this.vacunas.apellidos = '';
                             this.vacunas.fecha_nacimiento ='';
                             this.vacunas.telefono = '';
                             this.vacunas.estado_id =  '';
                             this.vacunas.centro_salud_id =  '';
                             this.vacunas.parroquia_id =  '';
                             this.vacunas.municipio_id = '';
                             this.vacunas.sexo = '';
                             this.vacunas.direccion = '';
                             this.vacunas.email =  '';
                             this.vacunas.dosis1 = '';
                             this.vacunas.fecha_dosis1 = '';
                             this.vacunas.dosis2 = '';
                             this.vacunas.fecha_dosis2 = '';
                             this.vacunas.tipo_vacuna_id = '';
                             this.vacunas.lote1 = '';
                             this.vacunas.lote2 = '';
                             this.vacunas.establecimiento_laboral = '';
                             this.vacunas.pueblo_indigena_id = '';
                             this.vacunas.etnia_id = '';
                             this.vacunas.grupo_especial_id = '';
                             this.vacunas.motivo_desercion = '';
                 
                           }
                               
                             },
                             err => console.log(err)
                           );
   
                        }
   
                        else {
                         //alert('No puede registrarse');
                         Swal.fire(
                          'Error!',
                          `El Paciente con la cedula: ${this.vacunas.cedula},  no puede ser vacunado en este centro de salud.`,
                          'error'
                        );
                        this.onReset();
                         
                       
                         
                        }

                   },

                      err => {
                     
                        console.log(err);
                      }
                      
                      
                      );



                    
                          
                  }

                  // AQUI LLAVE DE LA FUNCION DE SAIME //   












            
            
              //aqui termina el else principal       
                  }







                  
               





                }

                //AQUI TERMINA EL ELSE
                   
        }
        // AQUI TERMINA EL SERVICE 
        
        );

       
      }

  
    }

    onReset() {
     
      this.Form.reset();
  }

        GuardarVacunas() {

          this.vacunasService.getVacunaCedula(this.vacunas.cedula, this.vacunas.tipo_identificacion).subscribe(rep => {
           if(Object.keys(rep).length >= 1) {
            Swal.fire(
              'Error!',
              `El Usuario con la cedula: ${this.vacunas.cedula}, ya se encuentra registrado!!.`,
              'error'
            );

           } 
           
         else {

          this.vacunasService.saveVacunas(this.Form.value).subscribe(
            res => {
                  this.onReset();
                  console.log(res);
                  this.ngOnInit();
                  //this.router.navigate(['/vacunados/admin/list']);
                  Swal.fire(
                    'Exitoso!',
                    'Datos guardados correctamente...!',
                    'success'
                  );
            },
            err => {
              console.error(err);
              {
                Swal.fire(
                  'Error!',
                  '!Formulario incompleto o datos Incorrectos...',
                  'error'
                );
              }

            } 
          );

         }  
                
            });

        // AQUI TERMINA EL ELSE    
      }


        ActualizarVacunas() {

          this.vacunasService.updateVacuna(this.vacunas.id, this.vacunas)
            .subscribe(
              res => {
                console.log('actualizando', res);
                // alert(this.usuarios.user.rol_id);
                if(this.usuarios.user.rol_id == '1'){
                 this.router.navigate(['/vacunados/admin/list']);
                }

               else if(this.usuarios.user.rol_id == '2'){
                  this.router.navigate(['/vacunas/centro_salud/list',this.usuarios.user.centro_salud_id]);
                }
               
                Swal.fire(
                  'Exitoso!',
                  'Datos actualizados correctamente...!',
                  'success'
                );
              },
              err => {
                console.error(err);
                {
                  Swal.fire(
                    'Error!',
                    '!Formulario incompleto o datos Incorrectos...',
                    'error'
                  );
                }
  
              }
            );
        }


        
        ActualizarDosis() {

          this.vacunasService.updateDosis2(this.vacunas.id, this.vacunas)
            .subscribe(
              res => {
                console.log('actualizando', res);
                if(this.usuarios.user.rol_id == '1'){
                //  this.router.navigate(['/vacunados/admin/list']);
                this.onReset();
                this.formDosis2 = false;
                this.estatusForm = false;
                this.EstDosis2 = false;
                this.vacunas.lote2 = '';
                this.vacunas.fecha_dosis2 = '';
                this.vacunas.dosis2 = '';
                this.vacunas.motivo_desercion = '';
                this.ngOnInit();
                 }
 
                else if(this.usuarios.user.rol_id == '2'){
                  // this.router.navigate(['/vacunas/centro_salud/list',this.usuarios.user.centro_salud_id]);
                  this.onReset();
                  this.formDosis2 = false;
                this.estatusForm = false;
                this.EstDosis2 = false;
                this.vacunas.lote2 = '';
                this.vacunas.fecha_dosis2 = '';
                this.vacunas.dosis2 = '';
                this.vacunas.motivo_desercion = '';
                this.ngOnInit();

                 }
                Swal.fire(
                  'Exitoso!',
                  'Datos actualizados correctamente...!',
                  'success'
                );
              },
              err => {
                console.error(err);
                {
                  Swal.fire(
                    'Error!',
                    '!Formulario incompleto o datos Incorrectos...',
                    'error'
                  );
                }
  
              }
            );
        }



        // COMBO DEPENDIENTE //

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


           

        }


        getCentroSalud(id: any): void
          {

            this.comboListService.getParroquias().pipe(
              map((parroquias: any[]) => parroquias.filter((parroquia) => parroquia.id_municipio == id)
             )).subscribe((result) => {
              this.parroquias = result;
              console.log(result);

             });
            

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


          EditParroquias() {
            this.comboListService.getParroquias().subscribe(res => {
              this.parroquias = res;
              console.log(res);
            },
            err => {
              console.log(err);
            }
           );
          }


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

        getEtnias()
        {
          this.comboListService.getEtnias().subscribe(res => {
            this.etnias = res;
            console.log(res);
          },
          err => {
            console.log(err);
          }
         );
        }

        getPueblosIndigenas()
        {
          this.comboListService.getPueblosIndigenas().subscribe(res => {
            this.puebloindigenas = res;
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



        motivoDesercion() 
        {

          if(Object.keys(this.vacunas.motivo_desercion).length >= 1)
          {
            this.desercion2 = true;
          } 

          
        }

}
