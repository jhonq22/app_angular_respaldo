import { Component, OnInit } from '@angular/core';
import { VacunasService } from 'src/app/services/vacunas.service';
import Swal from 'sweetalert2';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ExcelService } from 'src/app/services/excel.service';
import { QR_URI } from 'src/app/interfaces/interface';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-visor-estadal-vacunas-list',
  templateUrl: './visor-estadal-vacunas-list.component.html',
  styleUrls: ['./visor-estadal-vacunas-list.component.css']
})
export class VisorEstadalVacunasListComponent implements OnInit {

  vacunas: any = [];
  vacunasExcel: any = [];
  filter: '';
  paginate = 1;
  usuarios: any = [];


  // QR
  
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  valueqr = '';

  constructor(private vacunasService: VacunasService,
              private excelService: ExcelService,
              private auth: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute
     ) { }

  ngOnInit() {
    this.informacionUsuario();
      
    
  }


  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.vacunasExcel, 'Vacunas');
  }





  getVacunadosExcel()
  {
    const params = this.activatedRoute.snapshot.params;
    this.vacunasService.ListadoVacunadosPorEstadosExcel(params.id).subscribe(res => {
      this.vacunasExcel = res;
      console.log('excel:', res);
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
       this.getVacunas();
       this.getVacunadosExcel();
      //alert(`centro salud: ${this.usuarios.user.centro_salud_id}`);
       //alert(`id: ${this.usuarios.user.id}`)
      // this.Form.get('user_id').setValue(this.usuarios.user.id);
      
      },
     err => {
        alert('Sesion Experiada..');
        this.router.navigateByUrl('/login');
      }
    );
  }






  getVacunas()
  {
    const params = this.activatedRoute.snapshot.params;
    this.vacunasService.ListadoVacunadosPorEstados(params.id).subscribe(res => {
      this.vacunas = res;
      console.log(res);
     
     
        this.vacunas.forEach(element => {
        //  this.valueqr = `${QR_URI}/qr/vacunados/`+ element.cedula;  
        this.valueqr = `${QR_URI}/qr/vacunados/`;  
        /* this.valueqr = `Cedula:  ` + element.cedula  + ".\n" 
         + "Dosis 1: "  + element.dosis1 + ".\n" 
         + "Fecha Dosis 1: " + element.fecha_dosis1 + ".\n" 
         + "Dosis 2: " + element.dosis2 + ".\n" 
         + "Fechas Dosis 2: " + element.fecha_dosis2 + ".\n"
         */
      
      
    
    });


      
    },
    err => {
      console.log(err);
      if (err.status === 0)
      {
        Swal.fire(
          'Error!',
          'El servidor no esta activo, no podra ver los datos...',
          'error'
        );
      }
    }
   );
  }


}
