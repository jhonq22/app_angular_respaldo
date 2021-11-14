import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';
import { ComboListService } from '../../../../services/combo.service';

@Component({
  selector: 'app-cambiar-contrasena-estadal',
  templateUrl: './cambiar-contrasena-estadal.component.html',
  styleUrls: ['./cambiar-contrasena-estadal.component.css']
})
export class CambiarContrasenaEstadalComponent implements OnInit {

  usuario: any = {};
  Form: FormGroup;


  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
     
    });
  }


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
                    });

                  },
                  err => console.log(err)
                );
         }
  
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



}
