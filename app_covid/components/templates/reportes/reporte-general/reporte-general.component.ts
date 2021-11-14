import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { CombolistService } from 'src/app/services/combolist.service';
import { VacunasService } from 'src/app/services/vacunas.service';
import { ExcelService } from 'src/app/services/excel.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent implements OnInit {

  estados: any = [];




  // Reportes
  VacunasGeneralEdad: any = [];
  VacunasEstadalEdad: any = [];
  VacunasGeneralDosis1: any = [];
  VacunasGeneralDosis1Estadal: any = [];
  
  pdfEstadal = false;
  pdfDosis1 = false;
  estado_id = '';
  fecha1 = '';
  fecha2= '';
  usuarios : any = [];


  //EXCEL 




  createFormGroup() {
    return new FormGroup({
       estado_id: new FormControl('', [Validators.required]),
      
    });
  }

  Form: FormGroup;


  createFormGroup2() {
    return new FormGroup({
       fecha1: new FormControl('', [Validators.required]),
       fecha2: new FormControl('', [Validators.required]),
       estado_id: new FormControl('', [Validators.required]),
      
    });
  }

  Form2: FormGroup;




  constructor(
    private comboListService: CombolistService,
    private vacunasService:VacunasService,
    private excelService: ExcelService,
    private auth: UserService ) {
    this.Form = this.createFormGroup();
    this.Form2 = this.createFormGroup2();
   }

  ngOnInit(): void {
    this.getEstados();
    this.getReporteVacunasEdadGeneral();
  }


  excelVacunasPorEdadGeneral():void {
    this.excelService.exportAsExcelFile(this.VacunasGeneralEdad, 'Vacunas');
  }

  excelVacunasPorEdadEstadal():void {
    this.excelService.exportAsExcelFile(this.VacunasEstadalEdad, 'Vacunas');
  }

  excelVacunasDosis1PorFechas():void {
    this.excelService.exportAsExcelFile(this.VacunasGeneralDosis1, 'Vacunas');
  }

  excelVacunasDosis1PorEstadal():void {
    this.excelService.exportAsExcelFile(this.VacunasGeneralDosis1Estadal, 'Vacunas');
  }




/////////////////////////////////// REPORTES ////////////////////////////








getReporteVacunasEdadGeneral()
{
  this.vacunasService.reporteVacunasEdadGeneral().subscribe(res => {
    this.VacunasGeneralEdad = res;
    console.log(res);
  },
  err => {
    console.log(err);
    if (err.status === 0)
    {
      
    }
  }
 );
}

PDFGeneral() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Centro Salud',
    '1-12 Años',
    '13-21 Años',
    '22-59 Años',
    '60 o Mas Años ',
    'Total'
    
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  General De Vacunados Por Edad'});
  img.src = 'assets/images/logo.png';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  General De Vacunados Por Edad', 310, 60);

  this.VacunasGeneralEdad.forEach(element => {
    const temp = [
      element.estado,
      element.centro_salud,
      element.de_1_a_12,
      element.de_13_a_21,
      element.de_22_a_59,
      element.de_60_o_mas,
      element.total, 
        
    ];

    rows.push(temp);

});

     doc.autoTable(col, rows, 
                             
                { 
                 startY: 150,
                 columnStyles: { 
                   0: {cellWidth: 110},
                   1: {cellWidth: 110},
                   2: {cellWidth: 110}, 
                   3: {cellWidth: 110}, 
                   4: {cellWidth: 110},  
                  
                  }
                
                });
     
      doc.save('Reporte_vacunados_edad_general.pdf');

}

// AQUI TERMINA REPORTE GENERAL



/// REPORTES VACUNADOS POR EDAD POR ESTADOS //


reporteVacunasEdadEstado()
{
  this.vacunasService.reporteVacunasEdadEstado(this.estado_id).subscribe(res => {
    this.VacunasEstadalEdad = res;
    this.pdfEstadal = true;
    console.log(res);
  },
  err => {
    console.log(err);
    if (err.status === 0)
    {
      /*Swal.fire(
        'Error!',
        'El servidor no esta activo, no podra ver los datos...',
        'error'
        
      );
      */
    }
  }
 );
}








PDFEstadalEdad() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Centro de Salud',
    '1-12 Años',
    '13-21 Años',
    '22-59 Años',
    '60 o Mas Años ',
    'Total'
    
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  Estadal De Vacunados Por Edad'});
  img.src = 'assets/images/logo.png';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  Estadal De Vacunados Por Edad', 310, 60);

  this.VacunasEstadalEdad.forEach(element => {
    const temp = [
      element.estado,
      element.centro_salud,
      element.de_1_a_12,
      element.de_13_a_21,
      element.de_22_a_59,
      element.de_60_o_mas,
      element.total, 
        
    ];

    rows.push(temp);

});

     doc.autoTable(col, rows, 
                             
                { 
                 startY: 150,
                 columnStyles: { 
                   0: {cellWidth: 110},
                   1: {cellWidth: 110},
                   2: {cellWidth: 110}, 
                   3: {cellWidth: 110}, 
                   4: {cellWidth: 110},  
                  
                  }
                
                });
     
      doc.save('Reporte_vacunados_edad_estadal.pdf');

}

// AQUI TERMINA REPORTE GENERAL



// AQUI TERMINA REPORTES VACUNADOS ESTADAL //







// REPORTE DOSIS 1 POR FECHA  GENERAL//

getReporteVacunasDosis1Fechas()
{
  this.vacunasService.reporteVacunasDosis1(this.fecha1, this.fecha2).subscribe(res => {
    this.VacunasGeneralDosis1 = res;
    console.log(res);
    this.pdfDosis1 = true;
  },
  err => {
    console.log(err);
    if (err.status === 0)
    {
      
    }
  }
 );
}

PDFGeneralDosis1Fechas() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Fecha Dosis 1',
    'Total Dosis 1',
    'Total Dosis 2',
    'Total'
     
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  General De Vacunados Por Fecha'});
  img.src = 'assets/images/logo.png';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  General De Vacunados Por Fecha', 310, 60);
  doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);

  this.VacunasGeneralDosis1.forEach(element => {
    const temp = [
      element.estado,
      element.fecha_dosis1,
      element.totaldosis1,
      element.totaldosis2,
      element.total
       
        
    ];

    rows.push(temp);

});

     doc.autoTable(col, rows, 
                             
                { 
                 startY: 150,
                 columnStyles: { 
                   0: {cellWidth: 150},
                   1: {cellWidth: 150},
                   2: {cellWidth: 150}, 
                   3: {cellWidth: 150}, 
                   4: {cellWidth: 150},  
                  
                  }
                
                });
     
      doc.save('Reporte_vacunados_dosis_fechas.pdf');

}

// AQUI TERMINA REPORTE GENERAL



// AQUI TERMINA REPORTE DOSIS 1 POR FECHA general //







// REPORTE DOSIS 1 POR FECHA //

getReporteVacunasDosis1FechasEstadal()
{
  this.vacunasService.reporteVacunasDosis1PorEstado(this.estado_id, this.fecha1, this.fecha2).subscribe(res => {
    this.VacunasGeneralDosis1Estadal = res;
    console.log(res);
    this.pdfEstadal = true;
  },
  err => {
    console.log(err);
    if (err.status === 0)
    {
      
    }
  }
 );
}

PDFGeneralDosis1FechasEstadal() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Fecha Dosis 1',
    'Total Dosis 1',
    'Total Dosis 2',
    'Total'
     
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  General De Vacunados Por Fecha Estadal'});
  img.src = 'assets/images/logo.png';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  General De Vacunados Por Fecha Estadal', 310, 60);
  doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);

  this.VacunasGeneralDosis1Estadal.forEach(element => {
    const temp = [
      element.estado,
      element.fecha_dosis1,
      element.totaldosis1,
      element.totaldosis2,
      element.total
       
        
    ];

    rows.push(temp);

});

     doc.autoTable(col, rows, 
                             
                { 
                 startY: 150,
                 columnStyles: { 
                   0: {cellWidth: 150},
                   1: {cellWidth: 150},
                   2: {cellWidth: 150}, 
                   3: {cellWidth: 150}, 
                   4: {cellWidth: 150},  
                  
                  }
                
                });
     
      doc.save('Reporte_vacunados_dosis_fechas.pdf');

}

// AQUI TERMINA REPORTE GENERAL



// AQUI TERMINA REPORTE DOSIS 1 POR FECHA //

























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
}
