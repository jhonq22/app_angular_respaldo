import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { CombolistService } from 'src/app/services/combolist.service';


@Component({
  selector: 'app-usuarios-admin-form',
  templateUrl: './usuarios-admin-form.component.html',
  styleUrls: ['./usuarios-admin-form.component.css']
})
export class UsuariosAdminFormComponent implements OnInit {

  usuario: any = [];
  estados: any = [];
  municipios: any = [];
  centrosalud: any = [];
  roles: any = [];
  edit = false;
  paginate: 1;


  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('' ),
      rol_id: new FormControl('', [Validators.required]),
      centro_salud_id: new FormControl('', [Validators.required]),
      estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl(''),
      
   
    });
  }


   // tslint:disable-next-line: member-ordering
   Form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private comboListService: CombolistService
  ) { this.Form = this.createFormGroup(); }

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
                    rol_id: this.usuario.rol_id,
                    centro_salud_id: this.usuario.centro_salud_id,
                    estado_id: this.usuario.estado_id,
                    //rol_id: this.usuario.rol_id,
               });

                  this.edit = true;
                  this.EditCentroSalud();
                },
                err => console.log(err)
              );
        }

        this.getEstados();
        this.getRoles();
      }



        GuardarUsuario() {

            // para excluir los campo cuando se vayan a guardar
            this.userService.register(this.Form.value).subscribe(
              res => {
                    console.log(res);
                    this.router.navigate(['/inicio']);
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
                  this.router.navigate(['/inicio']);
                  Swal.fire(
                    'Exitoso!',
                    'Datos actualizados correctamente...!',
                    'success'
                  );
                },
                err => console.error(err)
              );
          }

            // COMBO LIST //

            
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


        getRoles()
        {
          this.comboListService.getRoles().subscribe(res => {
            this.roles = res;
            console.log(res);
          },
          err => {
            console.log(err);
          }
         );
        }


}
