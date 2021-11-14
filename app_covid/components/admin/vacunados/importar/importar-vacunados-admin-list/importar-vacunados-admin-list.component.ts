import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CombolistService } from 'src/app/services/combolist.service';
import { ExcelService } from 'src/app/services/excel.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-importar-vacunados-admin-list',
  templateUrl: './importar-vacunados-admin-list.component.html',
  styleUrls: ['./importar-vacunados-admin-list.component.css']
})
export class ImportarVacunadosAdminListComponent implements OnInit {

  vacunados: any = [];
  filter: '';
  paginate = 1;
  usuarios: any = [];

  constructor(private comboListService: CombolistService,
    private auth: UserService,
    private excelService: ExcelService,
    private activatedRoute: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
    this.getVacunadosExcel();
  }

  getVacunadosExcel()
  {
   
    this.comboListService.getConvocadosPatrias().subscribe(res => {
      this.vacunados = res;
      console.log('vacunados:', res);
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
       console.log('usuario data', res);
      
      },
     err => {
        alert('Sesion Experiada..');
        this.router.navigateByUrl('/login');
      }
    );
  }




}
