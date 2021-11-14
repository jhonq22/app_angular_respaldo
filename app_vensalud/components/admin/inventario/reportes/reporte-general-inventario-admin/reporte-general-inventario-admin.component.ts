import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';
import { ComboListService } from '../../../../../services/combo.service';
import { Router } from '@angular/router';
import { InventarioService } from '../../../../../services/inventario.service';
import { map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-reporte-general-inventario-admin',
  templateUrl: './reporte-general-inventario-admin.component.html',
  styleUrls: ['./reporte-general-inventario-admin.component.css']
})
export class ReporteGeneralInventarioAdminComponent implements OnInit {

  usuarios: any = [];
  estados: any = [];
  municipios: any = [];
  mun: any = [];
  centrosalud: any = [];
  estatusequipos: any = [];
  fecha1 = '';
  fecha2 = '';
  reportegeneral = false;
  reportegeneralEstatus = false;

// DATA PARA REPORTE GENERAL //
  inventarioGeneral: any = [];
  inventarioEstadal: any = [];
  inventarioMunicipal: any = [];
  inventarioCentroSalud: any = [];

  // DATA PARA REPORTE GENERAL //

    // DATA PARA REPORTE ESTATUS //

  inventarioGeneralEstatus: any = [];
  inventarioEstadalEstatus: any = [];
  inventarioMunicipalEstatusData: any = [];
  inventarioCentroSaludEstatusData: any = [];

  // DATA PARA REPORTE ESTATUS //



    // DATA PARA REPORTE REPARADO //

    inventarioEstadalReparadoData: any = [];
    inventarioMunicipalReparadoData: any = [];
    inventarioCentroSaludReparadoData: any = [];
  
    // DATA PARA REPORTE REPARADO //






/////////////////// REPORTES  PARA  DATA GLOBAL ////////////////////////


    // DATA PARA REPORTE ESTATUS //

    inventarioGeneralGlobalData: any = [];
    inventarioEstadalGlobalData: any = [];
    inventarioMunicipalGlobalData: any = [];
    inventarioCentroSaludGlobalData: any = [];

// ----------- //


    // DATA PARA REPORTE CONDICION(REPARADO) GLOBAL  //

    inventarioGeneralGlobalCondicionData: any = [];
    inventarioEstadalGlobalCondicionData: any = [];
    inventarioMunicipalGlobalCondicionData: any = [];
    inventarioCentroSaludGlobalCondicionData: any = [];

// ----------- //



    // DATA PARA REPORTE EQUIPOS GLOBAL //

    inventarioGeneralGlobalEquipoData: any = [];
    inventarioEstadalGlobalEquipoData: any = [];
    inventarioMunicipalGlobalEquipoData: any = [];
    inventarioCentroSaludGlobalEquipoData: any = [];

// ----------- //





















        // DATA PARA REPORTE BUSCAR EQUIPOS //

          
        inventarioEstadalBuscarData: any = [];
        inventarioMunicipalBuscarData: any = [];
        inventarioCentroSaludBuscarData: any = [];
  
      
        // DATA PARA REPORTE REPARADO //





  // CAMPO PARA BUSCAR POR EL INPUT EL VALOR
  equipos: any = [];
  equipoBusqueda = '';
  pdfEquipo = false;










  pdfEstadal = false;
  pdfEstadal1 = false;
  pdfMunicipal = false;
  pdfCentroSalud = false;




  centro_salud_id = '';
  municipio_id = '';
  estado_id = '';
  user_id = '';
  estatu_equipo_id = '';
  reparado = '';

  createFormGroup() {
    return new FormGroup({
       estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required]),
      centro_salud_id: new FormControl('', [Validators.required]),

    });
  }

  Form: FormGroup;


  createFormGroupEstatus() {
    return new FormGroup({
       estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required]),
      centro_salud_id: new FormControl('', [Validators.required]),
      estatu_equipo_id: new FormControl('', [Validators.required]),
      equipo: new FormControl('', [Validators.required])

    });
  }


  Form2: FormGroup;




  createFormGroupReparado() {
    return new FormGroup({
       estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required]),
      centro_salud_id: new FormControl('', [Validators.required]),
      reparado: new FormControl('', [Validators.required]),
      equipo: new FormControl('', [Validators.required])

    });
  }

  Form3: FormGroup;




  
  createFormGroupBusquedaEquipos() {
    return new FormGroup({
       estado_id: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required]),
      centro_salud_id: new FormControl('', [Validators.required]),
      equipo: new FormControl('', [Validators.required]),

    });
  }

  Form4: FormGroup;



  constructor(
    private auth: UserService,
    private comboListService: ComboListService,
    private router: Router,
    private inventarioService: InventarioService,
    private excelService: ExcelService,
  ) {
      this.Form = this.createFormGroup();
      this.Form2 = this.createFormGroupEstatus();
      this.Form3 = this.createFormGroupReparado();
      this.Form4 = this.createFormGroupBusquedaEquipos();

  }

  ngOnInit() {
    this.informacionUsuario();
    this.getEstados();
    this.getInventarios();
    //  this.getInventarioEstadal();
    this.getEstatusEquipos();
    this.getEquipos();

  }




// REPORTE GENERAL

  getInventarios()
  {
    this.inventarioService.reporteGeneral(this.fecha1, this.fecha2, this.fecha1, this.fecha2).subscribe(res => {
      this.inventarioGeneral = res;
      this.reportegeneral = true;
      this.getInventarioGlobalGeneral()
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


  excelinventarioGeneral():void {
    this.excelService.exportAsExcelFile(this.inventarioGeneral, 'Excel General Inventario');
    }
    
  // REPORTES PDF GENERAL

PDFGeneral() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Codigo',
    'Centro',
    'Estado',
    'Servicio Médico',
    'Equipo',
    'Marca',
    'Serial',
    'Bien Nacional',
    'Condicion',
    'Estatus',
    'Observacion',
    'Fecha Creado',
    'Fecha Registro'
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  General Inventario'});
  img.src = 'assets/logo_vensalud.jpg';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  General Inventario', 310, 60);
  doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);

  this.inventarioGeneral.forEach(element => {
    const temp = [
      element.codigo_vensalud,
      element.centro_salud,
      element.estado,
      element.servicio_medico,
      element.equipo,
      element.marca,
      element.serial,
      element.numero_bien_nacional,
      element.reparado,
      element.estatu_equipo,
      element.observacion,
      element.fecha_creado_estatus,
      element.fecha_registro
    ];

    rows.push(temp);

});

     doc.autoTable(col, rows, 
                             
                { 
                 startY: 100,
                 columnStyles: { 
                  0: {cellWidth: 60},
                  1: {cellWidth: 60},
                  2: {cellWidth: 60}, 
                  3: {cellWidth: 60}, 
                  4: {cellWidth: 60},
                  5: {cellWidth: 60},
                  6: {cellWidth: 60},
                  7: {cellWidth: 60},  
                  8: {cellWidth: 60},  
                  9: {cellWidth: 60},
                  10: {cellWidth: 60}, 
                  11: {cellWidth: 60}, 
                  12: {cellWidth: 60},   
                  
                  }
                
                });
     
      doc.save('Reporte_Vensalud.pdf');

}

// AQUI TERMINA REPORTE GENERAL

 // REPORTE ESTADAL //



   getInventarioEstadal() {

          this.inventarioService.reporteGeneralEstadal(this.fecha1, this.fecha2,this.Form.value.estado_id,this.Form.value.estado_id,  this.fecha1, this.fecha2)
            .subscribe(
              res => { // aqui tomo las respuesta
                this.inventarioEstadal = res;
                //alert(this.fecha1)
                console.log('Estadal PDF:', this.inventarioEstadal);
                this.pdfEstadal1 = true;
                this.reporteGeneralGlobalEstadal();
              },
              err => console.log(err)
            );
        }


        excelinventarioEstadal():void {
          this.excelService.exportAsExcelFile(this.inventarioEstadal, 'Excel General Estadal Inventario');
          }



        PDFEstadal() {
          
          const doc = new jsPDF('l', 'pt', "a4");
        
          const col = [
            'Codigo',
            'Centro',
            'Estado',
            'Servicio Médico',
            'Equipo',
            'Marca',
            'Serial',
            'Bien Nacional',
            'Condicion',
            'Estatus',
            'Observacion',
            'Fecha Creado',
            'Fecha Registro'
          ];
          const rows = [];
          const img = new Image();
          doc.setProperties({title: 'Reporte  General Estadal Inventario'});
          img.src = 'assets/logo_vensalud.jpg';
          doc.addImage(img, 'JPGE', 50,8);
          doc.setFontSize(20);
          doc.text('Reporte  General Estadal Inventario', 310, 60);
          doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
          doc.setFontSize(14);
          doc.text(`Total Equipos: ${this.inventarioEstadal.length}`, 310, 90);
          this.getInventarioEstadal();
         
          this.inventarioEstadal.forEach(element => {
            const temp = [
              element.codigo_vensalud,
        element.centro_salud,
        element.estado,
        element.servicio_medico,
        element.equipo,
        element.marca,
        element.serial,
        element.numero_bien_nacional,
        element.reparado,
        element.estatu_equipo,
        element.observacion,
        element.fecha_creado_estatus,
        element.fecha_registro
            ];
        
            rows.push(temp);
        
        });
        
              doc.autoTable(col, rows, 
                             
                { 
                 startY: 100,
                 columnStyles: { 
                  0: {cellWidth: 60},
                  1: {cellWidth: 60},
                  2: {cellWidth: 60}, 
                  3: {cellWidth: 60}, 
                  4: {cellWidth: 60},
                  5: {cellWidth: 60},
                  6: {cellWidth: 60},
                  7: {cellWidth: 60},  
                  8: {cellWidth: 60},  
                  9: {cellWidth: 60},
                  10: {cellWidth: 60}, 
                  11: {cellWidth: 60}, 
                  12: {cellWidth: 60},
                  }
                
                });
           
              doc.save('Reporte_Vensalud.pdf');
        
        }


// AQUI TERMINA REPORTE ESTADAL




        // REPORTE MUNICIPAL //



   getInventarioMunicipal() {

    this.inventarioService.reporteGeneralMunicipal(this.fecha1, this.fecha2,this.Form.value.municipio_id,this.Form.value.municipio_id, this.fecha1, this.fecha2)
      .subscribe(
        res => { // aqui tomo las respuesta
          
          this.inventarioMunicipal = res;
          this.pdfMunicipal = true;
          this.reporteGeneralGlobalMunicipal();
        },
        err => console.log(err)
      );
  }




  PDFMunicipal() {
    
    const doc = new jsPDF('l', 'pt', "a4");
  
    const col = [
      'Codigo',
      'Centro',
      'Estado',
      'Servicio Médico',
      'Equipo',
      'Marca',
      'Serial',
      'Bien Nacional',
      'Condicion',
      'Estatus',
      'Observacion',
      'Fecha Creado',
      'Fecha Registro'
    ];
    const rows = [];
    const img = new Image();
    doc.setProperties({title: 'Reporte  General Municipal Inventario'});
    img.src = 'assets/logo_vensalud.jpg';
    doc.addImage(img, 'JPGE', 50,8);
    doc.setFontSize(20);
    doc.text('Reporte  General Municipal Inventario', 310, 60);
    doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
    this.getInventarioMunicipal();
   
    this.inventarioMunicipal.forEach(element => {
      const temp = [
        element.codigo_vensalud,
        element.centro_salud,
        element.estado,
        element.servicio_medico,
        element.equipo,
        element.marca,
        element.serial,
        element.numero_bien_nacional,
        element.reparado,
        element.estatu_equipo,
        element.observacion,
        element.fecha_creado_estatus,
        element.fecha_registro
        
     
      ];
  
      rows.push(temp);
  
  });
  
  doc.autoTable(col, rows, 
                             
    { 
     startY: 100,
     columnStyles: { 
      0: {cellWidth: 60},
      1: {cellWidth: 60},
      2: {cellWidth: 60}, 
      3: {cellWidth: 60}, 
      4: {cellWidth: 60},
      5: {cellWidth: 60},
      6: {cellWidth: 60},
      7: {cellWidth: 60},  
      8: {cellWidth: 60},  
      9: {cellWidth: 60},
      10: {cellWidth: 60}, 
      11: {cellWidth: 60}, 
      12: {cellWidth: 60},   
      
      }
    
    });
     
     
       
        doc.save('reporte_general_municipal.pdf');
  
  }


// AQUI TERMINA REPORTE MUNICIPAL





     // REPORTE MUNICIPAL //



     getInventarioCentroSalud() {

      this.inventarioService.reporteGeneralCentroSalud(this.fecha1, this.fecha2,this.Form.value.centro_salud_id,this.Form.value.centro_salud_id, this.fecha1, this.fecha2)
        .subscribe(
          res => { // aqui tomo las respuesta
            
            this.inventarioCentroSalud = res;
            this.pdfCentroSalud = true;
            this.reporteGeneralGlobalCentroSalud();
          },
          err => console.log(err)
        );
    }
  
  
    excelinventarioCentroSalud():void {
      this.excelService.exportAsExcelFile(this.inventarioCentroSalud, 'Excel Centro Salud Inventario');
      }
  
    PDFCentroSalud() {
      
      const doc = new jsPDF('l', 'pt', "a4");
    
      const col = [
        'Codigo',
        'Centro',
        'Estado',
        'Servicio Médico',
        'Equipo',
        'Marca',
        'Serial',
        'Bien Nacional',
        'Condicion',
        'Estatus',
        'Observacion',
        'Fecha Creado',
        'Fecha Registro'
      ];
      const rows = [];
      const img = new Image();
      doc.setProperties({title: 'Reporte  General Centro Salud Inventario'});
    img.src = 'assets/logo_vensalud.jpg';
    doc.addImage(img, 'JPGE', 50,8);
    doc.setFontSize(20);
    doc.text('Reporte  General Centro Salud Inventario', 310, 60);
    doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
    doc.setFontSize(14);
    doc.text(`Cantidad Items: ${this.inventarioCentroSalud.length}`, 310, 90);
      this.getInventarioCentroSalud();
     
      this.inventarioCentroSalud.forEach(element => {
        const temp = [
          element.codigo_vensalud,
          element.centro_salud,
          element.estado,
          element.servicio_medico,
          element.equipo,
          element.marca,
          element.serial,
          element.numero_bien_nacional,
          element.reparado,
          element.estatu_equipo,
          element.observacion,
          element.fecha_creado_estatus,
          element.fecha_registro
        ];

        // this.Form.reset();
        rows.push(temp);
    
    });
    
    doc.autoTable(col, rows, 
                             
      { 
       startY: 100,
       columnStyles: { 
        0: {cellWidth: 60},
      1: {cellWidth: 60},
      2: {cellWidth: 60}, 
      3: {cellWidth: 60}, 
      4: {cellWidth: 60},
      5: {cellWidth: 60},
      6: {cellWidth: 60},
      7: {cellWidth: 60},  
      8: {cellWidth: 60},  
      9: {cellWidth: 60},
      10: {cellWidth: 60}, 
      11: {cellWidth: 60}, 
      12: {cellWidth: 60}, 
        
        }
      
      });
         
          doc.save('Reporte_Centro_Salud.pdf');
    
    }
  
  
  // AQUI TERMINA REPORTE MUNICIPAL
  











  getInventarioGeneralEstatus() {

    this.reportegeneralEstatus = true;

    this.inventarioService.reporteGeneralPorEstatus( this.Form2.value.equipo, this.Form2.value.estatu_equipo_id, this.fecha1, this.fecha2, this.fecha1, this.fecha2)
      .subscribe(
        res => { // aqui tomo las respuesta
          this.inventarioGeneralEstatus = res;
          console.log('General ESTATUS PDF:',  this.inventarioGeneralEstatus);
          //this.pdfEstadal = true;
        },
        err => console.log(err)
      );
  }


  excelinventarioGeneralEstatus():void {
    this.excelService.exportAsExcelFile(this.inventarioGeneralEstatus, 'Excel  General Por Estatus de Inventario');
    }


// REPORTE ESTADAL GENERAL POR ESTATUS //

  PDFGeneralPorEstatus() {
    
    const doc = new jsPDF('l', 'pt', "a4");
  
    const col = [
      'Estado',
      'Fecha Registro',
      'Hospital',
      'Servicio Médico',
      'Equipo',
      'Marca',
      'Serial',
      //'Modelo',
      'Condición',
      'Estatus Equipo',
      'Observacion',
      'Fecha Actualizacion'
    ];
    const rows = [];
    const img = new Image();
    doc.setProperties({title: 'Reporte General Por Estatus de Inventario'});
    img.src = 'assets/logo_vensalud.jpg';
    doc.addImage(img, 'JPGE', 50,8);
    doc.setFontSize(20);
    doc.text('Reporte General Por Estatus de Inventario', 310, 60);
    doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
    doc.setFontSize(14);
    doc.text(`Cantidad Items: ${this.inventarioGeneralEstatus.length}`, 310, 90);
    
    this.getInventarioGeneralEstatus();
    console.log('PDF ESTATUS GENERAL:', this.inventarioGeneralEstatus);
    
   
    this.inventarioGeneralEstatus.forEach(element => {
      const temp = [
        element.estado,
        element.created_at,
        element.centro_salud,
        element.servicio_medico,
        element.equipo,
        element.marca,
        // element.modelo,
        element.serial,
        //element.modelo, 
        element.reparado,
        element.estatu_equipo,
        element.observacion,
        element.updated_at
      ];
  
      rows.push(temp);
  
  });
  
       doc.autoTable(col, rows, 
                             
                { 
                 startY: 100,
                 columnStyles: { 
                  0: {cellWidth: 70},
                  1: {cellWidth: 70},
                  2: {cellWidth: 70}, 
                  3: {cellWidth: 70}, 
                  4: {cellWidth: 70},
                  5: {cellWidth: 70},
                  6: {cellWidth: 70},
                  7: {cellWidth: 70},  
                  8: {cellWidth: 70},  
                  9: {cellWidth: 70},
                  10: {cellWidth: 70},    
                  
                  }
                
                });
        
        doc.save('Reporte_General_Estatus.pdf');
  
  }



  onReset() {
     
    this.Form.reset();
    this.reportegeneral = false;
this.pdfEstadal1 = false;
this.pdfMunicipal = false;
this.pdfCentroSalud = false;
this.pdfEstadal = false;
}

// AQUI TERMINA REPORTE ESTADAL POR ESTATUS


































  // REPORTE ESTADAL POR ESTATUS //



  getInventarioEstadalEstatus() {

    this.inventarioService.reporteGeneralEstadalPorEstatus( this.Form2.value.equipo ,this.Form2.value.estado_id, this.Form2.value.estatu_equipo_id, this.fecha1, this.fecha2, this.fecha1, this.fecha2)
      .subscribe(
        res => { // aqui tomo las respuesta
          this.inventarioEstadalEstatus = res;
          console.log('Estadal ESTATUS PDF:',  this.inventarioEstadalEstatus);
          this.pdfEstadal = true;
        },
        err => console.log(err)
      );
  }


  excelinventarioEstadalEstatus():void {
    this.excelService.exportAsExcelFile(this.inventarioEstadalEstatus, 'Excel Por Estatus Estadal Inventario');
    }





  PDFEstadalPorEstatus() {
    
    const doc = new jsPDF('l', 'pt', "a4");
  
    const col = [
      'Estado',
      'Fecha Registro',
      'Hospital',
      'Servicio Médico',
      'Equipo',
      'Marca',
      'Serial',
      'Condición',
      'Estatus Equipo',
      'Observacion',
      'Fecha Actualizacion'
    ];
    const rows = [];
    const img = new Image();
    doc.setProperties({title: 'Reporte  Por Estatus Estadal Inventario'});
    img.src = 'assets/logo_vensalud.jpg';
    doc.addImage(img, 'JPGE', 50,8);
    doc.setFontSize(20);
    doc.text('Reporte  Por Estatus Estadal Inventario', 310, 60);
    doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
    doc.setFontSize(14);
    doc.text(`Cantidad Items: ${this.inventarioEstadalEstatus.length}`, 310, 90);
    
    this.getInventarioEstadalEstatus();
    console.log('PDF ESTATUS ESTADAL:', this.inventarioEstadalEstatus);
    
   
    this.inventarioEstadalEstatus.forEach(element => {
      const temp = [
        element.estado,
        element.created_at,
        element.centro_salud,
        element.servicio_medico,
        element.equipo,
        element.marca,
        // element.modelo,
        element.serial,
        element.reparado,
        element.estatu_equipo,
        element.observacion,
        element.updated_at
      ];
  
      rows.push(temp);
  
  });
  
       doc.autoTable(col, rows, 
                             
                { 
                 startY: 100,
                 columnStyles: { 
                   0: {cellWidth: 70},
                   1: {cellWidth: 70},
                   2: {cellWidth: 70}, 
                   3: {cellWidth: 70}, 
                   4: {cellWidth: 70},
                   5: {cellWidth: 70},
                   6: {cellWidth: 70},
                   7: {cellWidth: 70},  
                   8: {cellWidth: 70},  
                   9: {cellWidth: 70}, 
                   10: {cellWidth: 70},  
                       
                  
                  }
                
                });
        
        doc.save('Reporte_Estadal_Estatus.pdf');
  
  }


// AQUI TERMINA REPORTE ESTADAL POR ESTATUS










  // REPORTE MUNICIPAL POR ESTATUS //



  getInventarioMunicipalEstatus() {

    this.inventarioService.reporteGeneralMunicipalPorEstatus( this.Form2.value.equipo , this.Form2.value.municipio_id, this.Form2.value.estatu_equipo_id, this.fecha1, this.fecha2, this.fecha1, this.fecha2)
      .subscribe(
        res => { // aqui tomo las respuesta
          this.inventarioMunicipalEstatusData = res;
          console.log('Municipal ESTATUS PDF:', this.inventarioMunicipalEstatusData);
          this.pdfMunicipal = true;
        },
        err => console.log(err)
      );
  }

  excelinventarioMunicipalEstatusData():void {
    this.excelService.exportAsExcelFile(this.inventarioMunicipalEstatusData, 'Excel  Por Estatus Municipal Inventario');
    }


  PDFMunicipalPorEstatus() {
    
    const doc = new jsPDF('l', 'pt', "a4");
  
    const col = [
      'Estado',
      'Fecha Registro',
      'Hospital',
      'Servicio Médico',
      'Equipo',
      'Marca',
      'Serial',
      'Condición',
      'Estatus Equipo',
      'Observacion',
      'Fecha Actualizacion'
    ];
    const rows = [];
    const img = new Image();
    doc.setProperties({title: 'Reporte  Por Estatus Municipal Inventario'});
    img.src = 'assets/logo_vensalud.jpg';
    doc.addImage(img, 'JPGE', 50,8);
    doc.setFontSize(20);
    doc.text('Reporte  Por Estatus Municipal Inventario', 310, 60);
    doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
    doc.setFontSize(14);
    doc.text(`Cantidad Items: ${this.inventarioMunicipalEstatusData.length}`, 310, 90);
    this.getInventarioMunicipalEstatus();
    //console.log('PDF ESTATUS ESTADAL:', this.inventarioEstadalEstatus);
    
   
    this.inventarioMunicipalEstatusData.forEach(element => {
      const temp = [
        element.estado,
        element.created_at,
        element.centro_salud,
        element.servicio_medico,
        element.equipo,
        element.marca,
        // element.modelo,
        element.serial,
        element.reparado,
        element.estatu_equipo,
        element.observacion,
        element.updated_at
      ];
  
      rows.push(temp);
  
  });
  
       doc.autoTable(col, rows, 
                             
                { 
                 startY: 100,
                 columnStyles: { 
                  0: {cellWidth: 70},
                  1: {cellWidth: 70},
                  2: {cellWidth: 70}, 
                  3: {cellWidth: 70}, 
                  4: {cellWidth: 70},
                  5: {cellWidth: 70},
                  6: {cellWidth: 70},
                  7: {cellWidth: 70},  
                  8: {cellWidth: 70},  
                  9: {cellWidth: 70},  
                  10: {cellWidth: 70},
                  
                  }
                
                });
       
        doc.save('Reporte_Municipal_Estatus.pdf');
  
  }


// AQUI TERMINA REPORTE ESTADAL POR ESTATUS







 // REPORTE CENTRO SALUD POR ESTATUS //



 getInventarioCentroSaludEstatus() {

  this.inventarioService.reporteGeneralCentroSaludPorEstatus( this.Form2.value.equipo , this.Form2.value.centro_salud_id, this.Form2.value.estatu_equipo_id, this.fecha1, this.fecha2, this.fecha1, this.fecha2)
    .subscribe(
      res => { // aqui tomo las respuesta
        this.inventarioCentroSaludEstatusData = res;
        console.log('Centro salud ESTATUS PDF:', this.inventarioCentroSaludEstatusData);
        this.pdfCentroSalud = true;
      },
      err => console.log(err)
    );
}


excelinventarioCentroSaludEstatusData():void {
  this.excelService.exportAsExcelFile(this.inventarioMunicipalEstatusData, 'Excel  Por Estatus Centro Salud Inventario');
  }



PDFCentroSaludPorEstatus() {
  
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Fecha Registro',
    'Hospital',
    'Servicio Médico',
    'Equipo',
    'Marca',
    'Serial',
    'Condición',
    'Estatus Equipo',
    'Observacion',
    'Fecha Actualizacion'
  ];
  const rows = [];
  const img = new Image();
  
  doc.setProperties({title: 'Reporte  Por Estatus Centro Salud Inventario'});
    img.src = 'assets/logo_vensalud.jpg';
    doc.addImage(img, 'JPGE', 50,8);
    doc.setFontSize(20);
    doc.text('Reporte  Por Estatus Centro Salud Inventario', 310, 60);
    doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
    doc.setFontSize(14);
    doc.text(`Cantidad Items: ${this.inventarioCentroSaludEstatusData.length}`, 310, 90);
  this.getInventarioCentroSaludEstatus();
  
  //console.log('PDF ESTATUS ESTADAL:', this.inventarioEstadalEstatus);
  
 
  this.inventarioCentroSaludEstatusData.forEach(element => {
    const temp = [
      element.estado,
      element.created_at,
      element.centro_salud,
      element.servicio_medico,
      element.equipo,
      element.marca,
      // element.modelo,
      element.serial,
      element.reparado,
      element.estatu_equipo,
      element.observacion,
      element.updated_at
    ];

    rows.push(temp);

});



     doc.autoTable(col, rows, 
                             
                { 
                 startY: 100,
                 columnStyles: { 
                   0: {cellWidth: 70},
                   1: {cellWidth: 70},
                   2: {cellWidth: 70}, 
                   3: {cellWidth: 70}, 
                   4: {cellWidth: 70},
                   5: {cellWidth: 70},
                   6: {cellWidth: 70},
                   7: {cellWidth: 70},  
                   8: {cellWidth: 70},  
                   9: {cellWidth: 70},
                   10: {cellWidth: 70},
                  
                  }
                
                });
              
      
      doc.save('Reporte_Centro Salud_Estatus.pdf');

}


// AQUI TERMINA REPORTE CENTRO SALUD POR ESTATUS
















  // REPORTE ESTADAL POR REPARADO //



  getInventarioEstadalReparado() {

    this.inventarioService.reporteGeneralEstadalPorReparado(this.Form3.value.equipo,this.Form3.value.estado_id, this.Form3.value.reparado, this.fecha1, this.fecha2)
      .subscribe(
        res => { // aqui tomo las respuesta
          this.inventarioEstadalReparadoData = res;
          console.log('Estadal REPARADO PDF:', this.inventarioEstadalReparadoData);
          this.pdfEstadal = true;
          this. reporteReparadoGlobalEstadal()
        },
        err => console.log(err)
      );
  }


  excelinventarioEstadalReparadoData():void {
    this.excelService.exportAsExcelFile(this.inventarioEstadalReparadoData, 'Excel  Por Condición Estadal Inventario');
    }


  PDFEstadalPorReparado() {
    
    const doc = new jsPDF('l', 'pt', "a4");
  
    const col = [
      'Estado',
      'Fecha Registro',
      'Hospital',
      'Servicio Médico',
      'Equipo',
      'Marca',
      'Serial',
      'Modelo',
      'Condición',
      'Estatus Equipo'
    ];
    const rows = [];
    const img = new Image();
    doc.setProperties({title: 'Reporte Por Condición Estadal Inventario'});
    img.src = 'assets/logo_vensalud.jpg';
    doc.addImage(img, 'JPGE', 50,8);
    doc.setFontSize(20);
    doc.text('Reporte Por Condición Estadal Inventario', 310, 60);
    doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
    doc.setFontSize(14);
    doc.text(`Cantidad Items: ${this.inventarioEstadalReparadoData.length}`, 310, 90);

    this.getInventarioEstadalReparado();
   // console.log('PDF ESTATUS ESTADAL:', this.inventarioEstadalEstatus);
    
   
    this.inventarioEstadalReparadoData.forEach(element => {
      const temp = [
        element.estado,
        element.created_at,
        element.centro_salud,
        element.servicio_medico,
        element.equipo,
        element.marca,
        // element.modelo,
        element.serial,
        element.modelo, 
        element.reparado,
        element.estatu_equipo
      ];
  
      rows.push(temp);
  
  });
  
       doc.autoTable(col, rows, 
                             
                { 
                 startY: 100,
                 columnStyles: { 
                   0: {cellWidth: 90},
                   1: {cellWidth: 80},
                   2: {cellWidth: 80}, 
                   3: {cellWidth: 60}, 
                   4: {cellWidth: 60},  
                  
                  }
                
                });
       
        doc.save('Reporte_Estadal_Reparados.pdf');
  
  }


// AQUI TERMINA REPORTE ESTADAL POR ESTATUS










  // REPORTE MUNICIPAL POR REPARADO //



  getInventarioMunicipalReparado() {

    this.inventarioService.reporteGeneralMunicipalPorReparado(this.Form3.value.equipo, this.Form3.value.municipio_id, this.Form3.value.reparado, this.fecha1, this.fecha2)
      .subscribe(
        res => { // aqui tomo las respuesta
          this.inventarioMunicipalReparadoData = res;
          console.log('Municipal Reparado PDF:', this.inventarioMunicipalReparadoData);
          this.pdfMunicipal = true;
          this.reporteCondicionGlobalMunicipal();
        },
        err => console.log(err)
      );
  }

  excelinventarioMunicipalReparadoData():void {
    this.excelService.exportAsExcelFile(this.inventarioMunicipalReparadoData, 'Excel  Reporte Por Condición Municipal Inventario');
    }


  PDFMunicipalPorReparado() {
    
    const doc = new jsPDF('l', 'pt', "a4");
  
    const col = [
      'Estado',
      'Fecha Registro',
      'Hospital',
      'Servicio Médico',
      'Equipo',
      'Marca',
      'Serial',
      'Modelo',
      'Condición',
      'Estatus Equipo'
    ];
    const rows = [];
    const img = new Image();
    doc.setProperties({title: 'Reporte Por Condición Municipal Inventario'});
    img.src = 'assets/logo_vensalud.jpg';
    doc.addImage(img, 'JPGE', 50,8);
    doc.setFontSize(20);
    doc.text('Reporte Por Condición Municipal Inventario', 310, 60);
    doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
    doc.setFontSize(14);
    doc.text(`Cantidad Items: ${this.inventarioMunicipalReparadoData.length}`, 310, 90);
    this.getInventarioMunicipalEstatus();
    //console.log('PDF ESTATUS ESTADAL:', this.inventarioEstadalEstatus);
    
   
    this.inventarioMunicipalReparadoData.forEach(element => {
      const temp = [
        element.estado,
        element.created_at,
        element.centro_salud,
        element.servicio_medico,
        element.equipo,
        element.marca,
        // element.modelo,
        element.serial,
        element.modelo, 
        element.reparado,
        element.estatu_equipo
      ];
  
      rows.push(temp);
  
  });
  
        doc.autoTable(col, rows, 
          { 
            startY: 100 
          
          
          });
       
        doc.save('Reporte_Municipal_Reparado.pdf');
  
  }


// AQUI TERMINA REPORTE ESTADAL POR REPARADO







 // REPORTE CENTRO SALUD POR ESTATUS //



 getInventarioCentroSaludReparado() {

  this.inventarioService.reporteGeneralCentroSaludPorReparado(this.Form3.value.equipo, this.Form3.value.centro_salud_id, this.Form3.value.reparado, this.fecha1, this.fecha2)
    .subscribe(
      res => { // aqui tomo las respuesta
        this.inventarioCentroSaludReparadoData = res;
        console.log('Centro salud REPARADO PDF:', this.inventarioCentroSaludReparadoData);
        this.pdfCentroSalud = true;
        this.reporteReparadoGlobalCentroSalud();
      },
      err => console.log(err)
    );
}

excelinventarioCentroSaludReparadoData():void {
  this.excelService.exportAsExcelFile(this.inventarioCentroSaludReparadoData, 'Excel  Reporte Condición Centro Salud Inventario');
  }



PDFCentroSaludPorReparado() {
  
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Fecha Registro',
    'Hospital',
    'Servicio Médico',
    'Equipo',
    'Marca',
    'Serial',
    'Modelo',
    'Condición',
    'Estatus Equipo'
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte Por Condición Centro Salud Inventario'});
  img.src = 'assets/logo_vensalud.jpg';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte Por Condición Centro Salud Inventario', 310, 60);
  doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
  doc.setFontSize(14);
  doc.text(`Cantidad Items: ${this.inventarioCentroSaludReparadoData.length}`, 310, 90);
  this.getInventarioCentroSaludReparado();
  //console.log('PDF ESTATUS ESTADAL:', this.inventarioEstadalEstatus);
  
 
  this.inventarioCentroSaludReparadoData.forEach(element => {
    const temp = [
      element.estado,
      element.created_at,
      element.centro_salud,
      element.servicio_medico,
      element.equipo,
      element.marca,
      // element.modelo,
      element.serial,
      element.modelo, 
      element.reparado,
      element.estatu_equipo
    ];

    rows.push(temp);

});

     doc.autoTable(col, rows, 
                             
                { 
                 startY: 100,
                 columnStyles: { 
                   0: {cellWidth: 90},
                   1: {cellWidth: 80},
                   2: {cellWidth: 80}, 
                   3: {cellWidth: 60}, 
                   4: {cellWidth: 60},  
                  
                  }
                
                });
     
      doc.save('Reporte_Centro Salud_Estatus.pdf');

}


// AQUI TERMINA REPORTE CENTRO SALUD POR REPARADO



getInventarioBusquedaPorEquipos() {

  this.inventarioService.reporteGeneralBusquedaPorEquipos(this.Form4.value.equipo, this.fecha1, this.fecha2)
    .subscribe(
      res => { // aqui tomo las respuesta
        this.equipos = res;
        this.pdfEquipo = true;
        this.getInventarioGlobalGeneralEquipos();
        console.log('busqueda por equipos PDF:', this.equipos);

      },
      err => console.log(err)
    );
}


 PDFBusquedaPorEquipos() {


  const doc = new jsPDF('l', 'pt', 'a4');

  const col = [
    'Hospital',
    'Servicio Médico',
    'Equipo',
    'Marca',
    'Serial',
    'Modelo',
    'Condición',
    'Estatus Equipo'
  ];
  const rows = [];
  const img = new Image();
   doc.setProperties({title: 'Reporte Busqueda Por equipos'});
   img.src = 'assets/logo_vensalud.jpg';
   doc.addImage(img, 'JPGE', 50,8);
   doc.setFontSize(20);
   doc.text('Reporte Busqueda Por equipos', 310, 60);
   doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);

  this.getInventarioBusquedaPorEquipos();
 
  this.equipos.forEach(element => {
    const temp = [
      element.centro_salud,
      element.servicio_medico,
      element.equipo,
      element.marca,
      // element.modelo,
      element.serial,
      element.modelo, 
      element.reparado,
      element.estatu_equipo
    ];

    rows.push(temp);

});

      doc.autoTable(col, rows, 

        { 
         startY: 100,
         columnStyles: { 
           0: {cellWidth: 90},
           1: {cellWidth: 90},
           2: {cellWidth: 100}, 
           3: {cellWidth: 60}, 
           4: {cellWidth: 60},  
          
          }
        
        });
   
      doc.save('Busqueda_Equipos.pdf');

}


// AQUI TERMINA REPORTE ESTADAL


 getInventarioBusquedaPorEquiposEstadal() {

  this.inventarioService.reporteGeneralBusquedaPorEquiposEstados(this.Form4.value.equipo, this.Form4.value.estado_id, this.fecha1, this.fecha2)
    .subscribe(
      res => { // aqui tomo las respuesta
        this.inventarioEstadalBuscarData = res;
        this.pdfEstadal1 = true;
        this.reporteGeneralGlobalEstadalEquipos();
        console.log('busqueda por equipos estadal PDF:', this.Form4.value.equipo);

      },
      err => console.log(err)
    );
}

PDFBusquedaPorEquiposEstadal() {


  const doc = new jsPDF('l', 'pt', 'a4');

  const col = [
    'Hospital',
    'Servicio Médico',
    'Equipo',
    'Marca',
    'Serial',
    'Bien Nacional',
    'Condición',
    'Estatus Equipo'
  ];
  const rows = [];
  const img = new Image();
   doc.setProperties({title: 'Reporte Busqueda Por Equipos Estadal'});
   img.src = 'assets/logo_vensalud.jpg';
   doc.addImage(img, 'JPGE', 50,8);
   doc.setFontSize(20);
   doc.text('Reporte Busqueda Por Equipos Estadal', 310, 60);
   doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);

  this.getInventarioBusquedaPorEquiposEstadal();
 
  this.inventarioEstadalBuscarData.forEach(element => {
    const temp = [
      element.centro_salud,
      element.servicio_medico,
      element.equipo,
      element.marca,
      // element.modelo,
      element.serial,
      element.numero_bien_nacional, 
      element.reparado,
      element.estatu_equipo
    ];

    rows.push(temp);

});

      doc.autoTable(col, rows, 

        { 
         startY: 100,
         columnStyles: { 
           0: {cellWidth: 90},
           1: {cellWidth: 90},
           2: {cellWidth: 100}, 
           3: {cellWidth: 60}, 
           4: {cellWidth: 60},  
          
          }
        
        });
   
      doc.save('Busqueda_Equipos.pdf');

}

// ESTADAL BUSQUEDA POR EQUIPOS TERMINA AQUI //


// AQUI EMPIEZA MUNICIPAL DE EQUIPOS //


getInventarioBusquedaPorEquiposMunicipal() {

  this.inventarioService.reporteGeneralBusquedaPorEquiposMunicipios(this.Form4.value.equipo, this.Form4.value.municipio_id, this.fecha1,this.fecha2)
    .subscribe(
      res => { // aqui tomo las respuesta
        this.inventarioMunicipalBuscarData = res;
        this.pdfMunicipal = true;
        this.reporteGeneralGlobalMunicipalEquipos();
        console.log('busqueda por equipos Municipal PDF:', this.Form4.value.equipo);

      },
      err => console.log(err)
    );
}

PDFBusquedaPorEquiposMunicipal() {


  const doc = new jsPDF('l', 'pt', 'a4');

  const col = [
    'Hospital',
    'Servicio Médico',
    'Equipo',
    'Marca',
    'Serial',
    'Bien Nacional',
    'Condición',
    'Estatus Equipo'
  ];
  const rows = [];
  const img = new Image();
   doc.setProperties({title: 'Reporte Busqueda Por Equipos Municipal'});
   img.src = 'assets/logo_vensalud.jpg';
   doc.addImage(img, 'JPGE', 50,8);
   doc.setFontSize(20);
   doc.text('Reporte Busqueda Por Equipos Municipal', 310, 60);
   doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);

  this.getInventarioBusquedaPorEquiposMunicipal();
 
  this.inventarioMunicipalBuscarData.forEach(element => {
    const temp = [
      element.centro_salud,
      element.servicio_medico,
      element.equipo,
      element.marca,
      // element.modelo,
      element.serial,
      element.numero_bien_nacional, 
      element.reparado,
      element.estatu_equipo
    ];

    rows.push(temp);

});

      doc.autoTable(col, rows, 

        { 
         startY: 100,
         columnStyles: { 
           0: {cellWidth: 90},
           1: {cellWidth: 90},
           2: {cellWidth: 100}, 
           3: {cellWidth: 60}, 
           4: {cellWidth: 60},  
          
          }
        
        });
   
      doc.save('Busqueda_Equipos_Municipal.pdf');

}

// AQUI TERMINAL EL MUNICIPAL POR EQUIPOS //


// AQUI EMPIEZA EL Centro Salud POR EQUIPOS //




getInventarioBusquedaPorEquiposCentroSalud() {

  this.inventarioService.reporteGeneralBusquedaPorEquiposCentroSalud(this.Form4.value.equipo, this.Form4.value.centro_salud_id, this.fecha1, this.fecha2)
    .subscribe(
      res => { // aqui tomo las respuesta
        this.inventarioCentroSaludBuscarData = res;
        this.pdfCentroSalud = true;
        this.GlobalGeneralCentroSaludEquipoPDF();
        this.reporteGeneralGlobalCentroSaludEquipos();
        console.log('busqueda por equipos CentroSalud PDF:', this.inventarioCentroSaludBuscarData);

      },
      err => console.log(err)
    );
}

PDFBusquedaPorEquiposCentroSalud() {


  const doc = new jsPDF('l', 'pt', 'a4');

  const col = [
    'Hospital',
    'Servicio Médico',
    'Equipo',
    'Marca',
    'Serial',
    'Bien Nacional',
    'Condición',
    'Estatus Equipo'
  ];
  const rows = [];
  const img = new Image();
   doc.setProperties({title: 'Reporte Busqueda Por Equipos Centro Salud'});
   img.src = 'assets/logo_vensalud.jpg';
   doc.addImage(img, 'JPGE', 50,8);
   doc.setFontSize(20);
   doc.text('Reporte Busqueda Por Equipos Centro Salud', 310, 60);
   doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);

  this.getInventarioBusquedaPorEquiposCentroSalud();
 
  this.inventarioCentroSaludBuscarData.forEach(element => {
    const temp = [
      element.centro_salud,
      element.servicio_medico,
      element.equipo,
      element.marca,
      // element.modelo,
      element.serial,
      element.numero_bien_nacional, 
      element.reparado,
      element.estatu_equipo
    ];

    rows.push(temp);

});

      doc.autoTable(col, rows, 

        { 
         startY: 100,
         columnStyles: { 
           0: {cellWidth: 90},
           1: {cellWidth: 90},
           2: {cellWidth: 100}, 
           3: {cellWidth: 60}, 
           4: {cellWidth: 60},  
          
          }
        
        });
   
      doc.save('Busqueda_Equipos_Centro_Salud.pdf');

}














  informacionUsuario() {

    this.auth.profile().subscribe(
      res => {
        this.usuarios = res;
        this.user_id = this.usuarios.user.id;
        console.log(res);
      },
      err => {
        alert('Sesion Experiada..');
        this.router.navigateByUrl('/login');

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
      this.mun = result;
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


          resetForm() {
            this.Form.reset();
          }


          /////////////// REPORTES GLOBALES ////////////////////////

          
 // REPORTE GLOBAL GENERAL//



   getInventarioGlobalGeneral() {

    this.inventarioService.reporteGeneralGlobal(this.fecha1, this.fecha2)
      .subscribe(
        res => { // aqui tomo las respuesta
          this.inventarioGeneralGlobalData = res;
          //alert(this.fecha1)
          console.log('Estadal PDF:', this.inventarioGeneralGlobalData);
          this.pdfEstadal = true;
        },
        err => console.log(err)
      );
  }




  GlobalGeneralPDF() {
    
    const doc = new jsPDF('l', 'pt', "a4");
  
    const col = [
      'Estado',
      'Equipos Operativos',
      'Equipos Baja Tecnicas',
      'Equipos Inoperativos',
      'Totalidad de Equipos',
     
    ];
    const rows = [];
    const img = new Image();
    doc.setProperties({title: 'Reporte  Especifico General Inventario'});
    img.src = 'assets/logo_vensalud.jpg';
    doc.addImage(img, 'JPGE', 50,8);
    doc.setFontSize(20);
    doc.text('Reporte  Especifico General Inventario', 310, 60);
    doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
    this.getInventarioGlobalGeneral();
   
    this.inventarioGeneralGlobalData.forEach(element => {
      const temp = [
        element.estado,
        element.equipos_operativos,
        element.equipos_baja_tecnicas,
        element.equipos_inoperativos,
        element.total_equipos,
    
      ];
  
      rows.push(temp);
  
  });
  
        doc.autoTable(col, rows, 
                       
          { 
           startY: 100,
           columnStyles: { 
             0: {cellWidth: 150},
             1: {cellWidth: 150},
             2: {cellWidth: 150}, 
             3: {cellWidth: 150}, 
             4: {cellWidth: 150},
             
            
            }
          
          });
     
        doc.save('Reporte_Vensalud.pdf');
  
  }


// AQUI TERMINA REPORTE GLOBAL GENERAL








// REPORTE GLOBAL GENERAL//



reporteGeneralGlobalEstadal() {

  this.inventarioService.reporteGeneralGlobalEstadal(this.Form.value.estado_id ,this.fecha1, this.fecha2)
    .subscribe(
      res => { // aqui tomo las respuesta
        this.inventarioEstadalGlobalData = res;
        //alert(this.fecha1)
        console.log('Estadal PDF:', this.inventarioEstadalGlobalData);
        this.pdfEstadal = true;
      },
      err => console.log(err)
    );
}




GlobalGeneralEstadalPDF() {
  
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Equipos Operativos',
    'Equipos Baja Tecnicas',
    'Equipos Inoperativos',
    'Totalidad de Equipos',
   
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  Especifico Estadal Inventario'});
  img.src = 'assets/logo_vensalud.jpg';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  Especifico Estadal Inventario', 310, 60);
  doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
  this.reporteGeneralGlobalEstadal();
 
  this.inventarioEstadalGlobalData.forEach(element => {
    const temp = [
      element.estado,
      element.equipos_operativos,
      element.equipos_baja_tecnicas,
      element.equipos_inoperativos,
      element.total_equipos,
  
    ];

    rows.push(temp);

});

      doc.autoTable(col, rows, 
                     
        { 
         startY: 100,
         columnStyles: { 
           0: {cellWidth: 150},
           1: {cellWidth: 150},
           2: {cellWidth: 150}, 
           3: {cellWidth: 150}, 
           4: {cellWidth: 150},
           
          
          }
        
        });
   
      doc.save('Reporte_Vensalud.pdf');

}


// AQUI TERMINA REPORTE GLOBAL GENERAL




// REPORTE GLOBAL Municipal//



reporteGeneralGlobalMunicipal() {

  this.inventarioService.reporteGeneralGlobalMunicipal(this.Form.value.municipio_id ,this.fecha1, this.fecha2)
    .subscribe(
      res => { // aqui tomo las respuesta
        this.inventarioMunicipalGlobalData = res;
        //alert(this.fecha1)
        console.log('Estadal PDF:', this.inventarioMunicipalGlobalData);
        this.pdfEstadal = true;
      },
      err => console.log(err)
    );
}




GlobalGeneralMunicipalPDF() {
  
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Municipio',
    'Equipos Operativos',
    'Equipos Baja Tecnicas',
    'Equipos Inoperativos',
    'Totalidad de Equipos',
   
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  Especifico Municipal Inventario'});
  img.src = 'assets/logo_vensalud.jpg';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  Especifico Municipal Inventario', 310, 60);
  doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
  this.reporteGeneralGlobalMunicipal();
 
  this.inventarioMunicipalGlobalData.forEach(element => {
    const temp = [
      element.estado,
      element.municipio,
      element.equipos_operativos,
      element.equipos_baja_tecnicas,
      element.equipos_inoperativos,
      element.total_equipos,
  
    ];

    rows.push(temp);

});

      doc.autoTable(col, rows, 
                     
        { 
         startY: 100,
         columnStyles: { 
           0: {cellWidth: 100},
           1: {cellWidth: 100},
           2: {cellWidth: 100}, 
           3: {cellWidth: 100}, 
           4: {cellWidth: 100},
           
          
          }
        
        });
   
      doc.save('Reporte_Vensalud.pdf');

}


// AQUI TERMINA REPORTE GLOBAL  MUNICIPAL







// REPORTE GLOBAL CENTRO SALUD//



reporteGeneralGlobalCentroSalud() {

  this.inventarioService.reporteGeneralGlobalCentroSalud(this.Form.value.centro_salud_id ,this.fecha1, this.fecha2)
    .subscribe(
      res => { // aqui tomo las respuesta
        this.inventarioCentroSaludGlobalData = res;
        //alert(this.fecha1)
        console.log('Estadal PDF:', this.inventarioCentroSaludGlobalData);
        this.pdfEstadal = true;
      },
      err => console.log(err)
    );
}




GlobalGeneralCentroSaludPDF() {
  
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Municipio',
    'Centro Salud',
    'Equipos Operativos',
    'Equipos Baja Tecnicas',
    'Equipos Inoperativos',
    'Totalidad de Equipos',
   
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  Especifico Municipal Inventario'});
  img.src = 'assets/logo_vensalud.jpg';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  Especifico Municipal Inventario', 310, 60);
  doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
  this.reporteGeneralGlobalCentroSalud();
 
  this.inventarioCentroSaludGlobalData.forEach(element => {
    const temp = [
      element.estado,
      element.municipio,
      element.centro_salud,
      element.equipos_operativos,
      element.equipos_baja_tecnicas,
      element.equipos_inoperativos,
      element.total_equipos,
  
    ];

    rows.push(temp);

});

      doc.autoTable(col, rows, 
                     
        { 
         startY: 100,
         columnStyles: { 
           0: {cellWidth: 90},
           1: {cellWidth: 90},
           2: {cellWidth: 90}, 
           3: {cellWidth: 90}, 
           4: {cellWidth: 90},
           
          
          }
        
        });
   
      doc.save('Reporte_Vensalud.pdf');

}


// AQUI TERMINA REPORTE GLOBAL CENTRO SALUD






/////////// REPORTES GLOBAL CONDICION (REPARADOS) //////



 // REPORTE GLOBAL GENERAL//



 getInventarioGlobalReparado() {

  this.inventarioService.reporteGeneralReparadoGlobal(this.fecha1, this.fecha2)
    .subscribe(
      res => { // aqui tomo las respuesta
        this.inventarioGeneralGlobalCondicionData = res;
        //alert(this.fecha1)
        console.log('Condicion especificio General:', this.inventarioGeneralGlobalCondicionData);
        this.reportegeneral = true;
      },
      err => console.log(err)
    );
}




GlobalGeneralReparadoPDF() {
  
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Reparado',
    'Instalados',
    'Revision Tecnica',
    'Mantenimiento Preventivo',
   
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  Especifico General Inventario'});
  img.src = 'assets/logo_vensalud.jpg';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  Especifico Por Condicion General Inventario', 310, 60);
  doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
  this.getInventarioGlobalReparado();
 
  this.inventarioGeneralGlobalCondicionData.forEach(element => {
    const temp = [
      element.estado,
      element.reparados,
      element.instalado,
      element.revision_tecnica,
      element.mantenimiento_preventivo,
  
    ];

    rows.push(temp);

});

      doc.autoTable(col, rows, 
                     
        { 
         startY: 100,
         columnStyles: { 
           0: {cellWidth: 150},
           1: {cellWidth: 150},
           2: {cellWidth: 150}, 
           3: {cellWidth: 150}, 
           4: {cellWidth: 150},
           
          
          }
        
        });
   
      doc.save('Reporte_Vensalud.pdf');

}


// AQUI TERMINA REPORTE GLOBAL GENERAL








// REPORTE GLOBAL GENERAL//



reporteReparadoGlobalEstadal() {

this.inventarioService.reporteGeneralReparadoGlobalEstadal(this.Form3.value.estado_id ,this.fecha1, this.fecha2)
  .subscribe(
    res => { // aqui tomo las respuesta
      this.inventarioEstadalGlobalCondicionData = res;
      //alert(this.fecha1)
      console.log('Estadal Condicion PDF:', this.inventarioEstadalGlobalCondicionData);
      this.pdfEstadal1 = true;
    },
    err => console.log(err)
  );
}




GlobalCondicionEstadalPDF() {

const doc = new jsPDF('l', 'pt', "a4");

const col = [
  'Estado',
  'Reparado',
  'Instalados',
  'Revision Tecnica',
  'Mantenimiento Preventivo',
 
];
const rows = [];
const img = new Image();
doc.setProperties({title: 'Reporte Especifico Por Condicion Estadal Inventario'});
img.src = 'assets/logo_vensalud.jpg';
doc.addImage(img, 'JPGE', 50,8);
doc.setFontSize(20);
doc.text('Reporte  Especifico Por Condicion Estadal Inventario', 310, 60);
doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
this.reporteReparadoGlobalEstadal();

this.inventarioEstadalGlobalCondicionData.forEach(element => {
  const temp = [
    element.estado,
    element.reparados,
    element.instalado,
    element.revision_tecnica,
    element.mantenimiento_preventivo,

  ];

  rows.push(temp);

});

    doc.autoTable(col, rows, 
                   
      { 
       startY: 100,
       columnStyles: { 
         0: {cellWidth: 150},
         1: {cellWidth: 150},
         2: {cellWidth: 150}, 
         3: {cellWidth: 150}, 
         4: {cellWidth: 150},
         
        
        }
      
      });
 
    doc.save('Reporte_Vensalud.pdf');

}


// AQUI TERMINA REPORTE GLOBAL GENERAL




// REPORTE GLOBAL Municipal//



reporteCondicionGlobalMunicipal() {

this.inventarioService.reporteReparadoGlobalMunicipal(this.Form3.value.municipio_id ,this.fecha1, this.fecha2)
  .subscribe(
    res => { // aqui tomo las respuesta
      this.inventarioMunicipalGlobalCondicionData = res;
      //alert(this.fecha1)
      console.log('Estadal PDF:', this.inventarioMunicipalGlobalCondicionData);
      this.pdfEstadal = true;
    },
    err => console.log(err)
  );
}




GlobalReparadoMunicipalPDF() {

const doc = new jsPDF('l', 'pt', "a4");

const col = [
  'Estado',
  'Municipio',
  'Reparado',
  'Instalados',
  'Revision Tecnica',
  'Mantenimiento Preventivo',
 
 
];
const rows = [];
const img = new Image();
doc.setProperties({title: 'Reporte Especifico  Por Condicion Municipal Inventario'});
img.src = 'assets/logo_vensalud.jpg';
doc.addImage(img, 'JPGE', 50,8);
doc.setFontSize(20);
doc.text('Reporte  Especifico  Por Condicion Municipal Inventario', 310, 60);
doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
this.reporteCondicionGlobalMunicipal();

this.inventarioMunicipalGlobalCondicionData.forEach(element => {
  const temp = [
    element.estado,
    element.municipio,
    element.reparados,
    element.instalado,
    element.revision_tecnica,
    element.mantenimiento_preventivo,

  ];

  rows.push(temp);

});

    doc.autoTable(col, rows, 
                   
      { 
       startY: 100,
       columnStyles: { 
         0: {cellWidth: 100},
         1: {cellWidth: 100},
         2: {cellWidth: 100}, 
         3: {cellWidth: 100}, 
         4: {cellWidth: 100},
         
        
        }
      
      });
 
    doc.save('Reporte_Vensalud.pdf');

}


// AQUI TERMINA REPORTE GLOBAL  MUNICIPAL







// REPORTE GLOBAL CENTRO SALUD//



reporteReparadoGlobalCentroSalud() {

this.inventarioService.reporteReparadoGlobalCentroSalud(this.Form3.value.centro_salud_id ,this.fecha1, this.fecha2)
  .subscribe(
    res => { // aqui tomo las respuesta
      this.inventarioCentroSaludGlobalCondicionData = res;
      //alert(this.fecha1)
      console.log('Reparado Especifico Centro Salud PDF:', this.inventarioCentroSaludGlobalCondicionData);
      this.pdfEstadal = true;
    },
    err => console.log(err)
  );
}




GlobalReparadoCentroSaludPDF() {

const doc = new jsPDF('l', 'pt', "a4");

const col = [
  'Estado',
  'Municipio',
  'Centro Salud',
  'Equipos Operativos',
  'Equipos Baja Tecnicas',
  'Equipos Inoperativos',
  'Totalidad de Equipos',
 
];
const rows = [];
const img = new Image();
doc.setProperties({title: 'Reporte Por Condicion Especifico Municipal Inventario'});
img.src = 'assets/logo_vensalud.jpg';
doc.addImage(img, 'JPGE', 50,8);
doc.setFontSize(20);
doc.text('Reporte  Especifico Por Condicion Municipal Inventario', 310, 60);
doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
this.reporteReparadoGlobalCentroSalud();

this.inventarioCentroSaludGlobalCondicionData.forEach(element => {
  const temp = [
    element.estado,
    element.municipio,
    element.centro_salud,
    element.reparados,
    element.instalado,
    element.revision_tecnica,
    element.mantenimiento_preventivo,
  ];

  rows.push(temp);

});

    doc.autoTable(col, rows, 
                   
      { 
       startY: 100,
       columnStyles: { 
         0: {cellWidth: 90},
         1: {cellWidth: 90},
         2: {cellWidth: 90}, 
         3: {cellWidth: 90}, 
         4: {cellWidth: 90},
         
        
        }
      
      });
 
    doc.save('Reporte_Vensalud.pdf');

}

// AQUI TERMINA REPORTE GLOBAL CENTRO SALUD
/// AQUI TERMINA LOS REPORTES GLOBAL CONDICION(REPARADOS) ///




     /////////////// REPORTES GLOBALES ////////////////////////

          
 // REPORTE GLOBAL GENERAL Por EQUIPOS//



 getInventarioGlobalGeneralEquipos() {

  this.inventarioService.reporteEquiposGlobal(this.Form4.value.equipo ,this.fecha1, this.fecha2)
    .subscribe(
      res => { // aqui tomo las respuesta
        this.inventarioGeneralGlobalEquipoData = res;
        //alert(this.fecha1)
        console.log('General Equipo Global PDF:', this.inventarioGeneralGlobalEquipoData);
        this.reportegeneral = true;
      },
      err => console.log(err)
    );
}




GlobalGeneralEquipoPDF() {
  
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Equipos Operativos',
    'Equipos Baja Tecnicas',
    'Equipos Inoperativos',
    'Totalidad de Equipos',
   
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  Especifico  General Por Equipo Inventario'});
  img.src = 'assets/logo_vensalud.jpg';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  Especifico General Por Equipo Inventario', 310, 60);
  doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
  this.getInventarioGlobalGeneralEquipos();
 
  this.inventarioGeneralGlobalEquipoData.forEach(element => {
    const temp = [
      element.estado,
      element.equipos_operativos,
      element.equipos_baja_tecnicas,
      element.equipos_inoperativos,
      element.total_equipos,
  
    ];

    rows.push(temp);

});

      doc.autoTable(col, rows, 
                     
        { 
         startY: 100,
         columnStyles: { 
           0: {cellWidth: 150},
           1: {cellWidth: 150},
           2: {cellWidth: 150}, 
           3: {cellWidth: 150}, 
           4: {cellWidth: 150},
           
          
          }
        
        });
   
      doc.save('Reporte_Vensalud.pdf');

}


// AQUI TERMINA REPORTE GLOBAL GENERAL








// REPORTE GLOBAL GENERAL//



reporteGeneralGlobalEstadalEquipos() {

this.inventarioService.reporteEquiposGlobalEstadal(this.Form4.value.equipo ,this.Form4.value.estado_id ,this.fecha1, this.fecha2)
  .subscribe(
    res => { // aqui tomo las respuesta
      this.inventarioEstadalGlobalEquipoData = res;
      //alert(this.fecha1)
      console.log('Estadal Por equipo Global PDF:', this.inventarioEstadalGlobalEquipoData);
      this.pdfEstadal1 = true;
    },
    err => console.log(err)
  );
}




GlobalGeneralEstadalEquipoPDF() {

const doc = new jsPDF('l', 'pt', "a4");

const col = [
  'Estado',
  'Equipos Operativos',
  'Equipos Baja Tecnicas',
  'Equipos Inoperativos',
  'Totalidad de Equipos',
 
];
const rows = [];
const img = new Image();
doc.setProperties({title: 'Reporte  Especifico Estadal Por Equipo Inventario'});
img.src = 'assets/logo_vensalud.jpg';
doc.addImage(img, 'JPGE', 50,8);
doc.setFontSize(20);
doc.text('Reporte  Especifico Estadal Por Equipo Inventario', 310, 60);
doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
this.reporteGeneralGlobalEstadalEquipos();

this.inventarioEstadalGlobalEquipoData.forEach(element => {
  const temp = [
    element.estado,
    element.equipos_operativos,
    element.equipos_baja_tecnicas,
    element.equipos_inoperativos,
    element.total_equipos,

  ];

  rows.push(temp);

});

    doc.autoTable(col, rows, 
                   
      { 
       startY: 100,
       columnStyles: { 
         0: {cellWidth: 150},
         1: {cellWidth: 150},
         2: {cellWidth: 150}, 
         3: {cellWidth: 150}, 
         4: {cellWidth: 150},
         
        
        }
      
      });
 
    doc.save('Reporte_Vensalud.pdf');

}


// AQUI TERMINA REPORTE GLOBAL GENERAL




// REPORTE GLOBAL Municipal//



reporteGeneralGlobalMunicipalEquipos() {

this.inventarioService.reporteEquiposGlobalMunicipal(this.Form4.value.equipo, this.Form4.value.municipio_id ,this.fecha1, this.fecha2)
  .subscribe(
    res => { // aqui tomo las respuesta
      this.inventarioMunicipalGlobalEquipoData = res;
      //alert(this.fecha1)
      console.log('Estadal PDF:', this.inventarioMunicipalGlobalEquipoData);
      this.pdfMunicipal = true;
    },
    err => console.log(err)
  );
}




GlobalGeneralMunicipalEquipoPDF() {

const doc = new jsPDF('l', 'pt', "a4");

const col = [
  'Estado',
  'Municipio',
  'Equipos Operativos',
  'Equipos Baja Tecnicas',
  'Equipos Inoperativos',
  'Totalidad de Equipos',
 
];
const rows = [];
const img = new Image();
doc.setProperties({title: 'Reporte  Especifico Municipal Por Equipo Inventario'});
img.src = 'assets/logo_vensalud.jpg';
doc.addImage(img, 'JPGE', 50,8);
doc.setFontSize(20);
doc.text('Reporte  Especifico Municipal Por Equipo Inventario', 310, 60);
doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
this.reporteGeneralGlobalMunicipalEquipos();

this.inventarioMunicipalGlobalEquipoData.forEach(element => {
  const temp = [
    element.estado,
    element.municipio,
    element.equipos_operativos,
    element.equipos_baja_tecnicas,
    element.equipos_inoperativos,
    element.total_equipos,

  ];

  rows.push(temp);

});

    doc.autoTable(col, rows, 
                   
      { 
       startY: 100,
       columnStyles: { 
         0: {cellWidth: 100},
         1: {cellWidth: 100},
         2: {cellWidth: 100}, 
         3: {cellWidth: 100}, 
         4: {cellWidth: 100},
         
        
        }
      
      });
 
    doc.save('Reporte_Vensalud.pdf');

}


// AQUI TERMINA REPORTE GLOBAL  MUNICIPAL







// REPORTE GLOBAL CENTRO SALUD//



reporteGeneralGlobalCentroSaludEquipos() {

this.inventarioService.reporteEquiposGlobalGlobalCentroSalud(this.Form4.value.equipo ,this.Form4.value.centro_salud_id ,this.fecha1, this.fecha2)
  .subscribe(
    res => { // aqui tomo las respuesta
      this.inventarioCentroSaludGlobalEquipoData = res;
      //alert(this.fecha1)
      console.log('Centro Salud global Equipo PDF:', this.inventarioCentroSaludGlobalEquipoData);
      this.pdfEstadal = true;
    },
    err => console.log(err)
  );
}




GlobalGeneralCentroSaludEquipoPDF() {

const doc = new jsPDF('l', 'pt', "a4");

const col = [
  'Estado',
  'Municipio',
  'Centro Salud',
  'Equipos Operativos',
  'Equipos Baja Tecnicas',
  'Equipos Inoperativos',
  'Totalidad de Equipos',
 
];
const rows = [];
const img = new Image();
doc.setProperties({title: 'Reporte  Especifico Municipal Inventario'});
img.src = 'assets/logo_vensalud.jpg';
doc.addImage(img, 'JPGE', 50,8);
doc.setFontSize(20);
doc.text('Reporte  Especifico Municipal Inventario', 310, 60);
doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
this.reporteGeneralGlobalCentroSaludEquipos();

this.inventarioCentroSaludGlobalEquipoData.forEach(element => {
  const temp = [
    element.estado,
    element.municipio,
    element.centro_salud,
    element.equipos_operativos,
    element.equipos_baja_tecnicas,
    element.equipos_inoperativos,
    element.total_equipos,

  ];

  rows.push(temp);

});

    doc.autoTable(col, rows, 
                   
      { 
       startY: 100,
       columnStyles: { 
         0: {cellWidth: 90},
         1: {cellWidth: 90},
         2: {cellWidth: 90}, 
         3: {cellWidth: 90}, 
         4: {cellWidth: 90},
         
        
        }
      
      });
 
    doc.save('Reporte_Vensalud.pdf');

}


// AQUI TERMINA REPORTE GLOBAL CENTRO SALUD















}


