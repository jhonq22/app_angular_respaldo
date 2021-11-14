import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ComboListService } from '../../../../services/combo.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-inventario-list-estadal',
  templateUrl: './inventario-list-estadal.component.html',
  styleUrls: ['./inventario-list-estadal.component.css']
})
export class InventarioListEstadalComponent implements OnInit {
  usuarios: any = [];
  municipios: any = {};
  centrosalud: any = {};
  usuarioID = '';

  centro_salud_id = '';
  municipio_id = '';

  createFormGroup() {
    return new FormGroup({
      // estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required]),
      centro_salud_id: new FormControl('', [Validators.required]),
    });
  }

  Form: FormGroup;









  constructor(
    private auth: UserService,
    private comboListService: ComboListService,
    private router: Router
  ) { this.Form = this.createFormGroup();  }

  ngOnInit() {
    this.informacionUsuario();
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


  informacionUsuario() {

    this.auth.profile().subscribe(
      res => {
        this.usuarios = res;
        this.comboListService.getMunicipios().pipe(
          map((municipios: any[]) => municipios.filter((municipio) => municipio.estado_id == this.usuarios.user.estado_id)
         )).subscribe((result) => {
          this.municipios = result;
          this.usuarioID = this.usuarios.user.estado_id;
          console.log(result);

         });
      },

      err => {
        alert('Sesion Experiada..');
        this.router.navigateByUrl('/login');

      }
    );


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

}
