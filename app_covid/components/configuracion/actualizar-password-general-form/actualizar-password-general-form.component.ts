import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { CombolistService } from 'src/app/services/combolist.service';





@Component({
  selector: 'app-actualizar-password-general-form',
  templateUrl: './actualizar-password-general-form.component.html',
  styleUrls: ['./actualizar-password-general-form.component.css']
})
export class ActualizarPasswordGeneralFormComponent implements OnInit {
  edit = false;
  usuario: any = [];

  user: any = [];
  createFormGroup() {
    return new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  
   
    });
  }


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
                              
                    password: this.usuario.password,
                  
               });

                  this.edit = true;
           
                },
                err => console.log(err)
              );

            
        }
      
      }

      informacionUsuario() {
        this.userService.profile().subscribe(
        res => {
        this.user = res;
        // alert(this.usuarios.user.centro_salud_id);
        console.log('usuario data', res);
        
        },
        err => {
        alert('Sesion Experiada..');
    
        }
        );
        }






      

      ActualizarUsuario() {

        const params = this.activatedRoute.snapshot.params;
        this.userService.actualizarPassword(params.id, this.usuario)
          .subscribe(
            res => {
              //alert(this.user.usuario.id);
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

}
