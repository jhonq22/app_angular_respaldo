import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/user.service';
import { ComboListService } from '../../../../services/combo.service';
import { InventarioService } from '../../../../services/inventario.service';


@Component({
  selector: 'app-reportes-estadal-inventario',
  templateUrl: './reportes-estadal-inventario.component.html',
  styleUrls: ['./reportes-estadal-inventario.component.css']
})
export class ReportesEstadalInventarioComponent implements OnInit {

  usuarios: any = [];
  estados: any = [];
  municipios: any = [];
  mun: any = [];
  centrosalud: any = [];
  estatusequipos: any = {};
  fecha1 = '';
  fecha2 = '';
  estadalpdf = false;

  @ViewChild('fecha1', { static: false })
  @ViewChild('fecha2', { static: false })


  equipos: any = [];
  equipoBusqueda = '';


 // DATA PARA REPORTE GENERAL //
 inventarioGeneral: any = [];
 inventarioEstadal: any = [];
 inventarioMunicipal: any = [];
 inventarioCentroSalud: any = [];

 // DATA PARA REPORTE GENERAL //

   // DATA PARA REPORTE ESTATUS //

 inventarioEstadalEstatus: any = [];
 inventarioMunicipalEstatusData: any = [];
 inventarioCentroSaludEstatusData: any = [];

 // DATA PARA REPORTE ESTATUS //



   // DATA PARA REPORTE REPARADO //

   inventarioEstadalReparadoData: any = [];
   inventarioMunicipalReparadoData: any = [];
   inventarioCentroSaludReparadoData: any = [];
 
   // DATA PARA REPORTE REPARADO //

 // CAMPO PARA BUSCAR POR EL INPUT EL VALOR


 pdfEquipo = false;










 pdfEstadal = false;
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



 constructor(
   private auth: UserService,
   private comboListService: ComboListService,
   private router: Router,
   private inventarioService: InventarioService
 ) {
     this.Form = this.createFormGroup();
     this.Form2 = this.createFormGroupEstatus();
     this.Form3 = this.createFormGroupReparado();
 }

 ngOnInit() {
  this.getEstatusEquipos();
   this.informacionUsuario();
   // this.getEstados();
   this.getInventarios();
   this.getInventarioEstadal();
 
   this.getMunicipios(1);
   this.getEquipos();
   
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


// REPORTE GENERAL

 getInventarios()
 {
   this.inventarioService.getInventarios().subscribe(res => {
     this.inventarioGeneral = res;
     console.log(res);
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
                  0: {cellWidth: 90},
                  1: {cellWidth: 80},
                  2: {cellWidth: 80}, 
                  3: {cellWidth: 60}, 
                  4: {cellWidth: 60},  
                 
                 }
               
               });
    
     doc.save('Test.pdf');

}

// AQUI TERMINA REPORTE GENERAL

// REPORTE ESTADAL //



  getInventarioEstadal() {

         this.inventarioService.reporteGeneralEstadal(this.fecha1, this.fecha2,this.usuarios.user.estado_id,this.usuarios.user.estado_id, this.fecha1, this.fecha2)
           .subscribe(
             res => { // aqui tomo las respuesta
               
               this.inventarioEstadal = res;
               //alert(this.fecha1)
               console.log('Estadal PDF:', this.inventarioEstadal);
               this.estadalpdf = true;
             },
             err => console.log(err)
           );
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
          
             doc.save('Test.pdf');
       
       }


// AQUI TERMINA REPORTE ESTADAL




       // REPORTE MUNICIPAL //



  getInventarioMunicipal() {

   this.inventarioService.reporteGeneralMunicipal(this.fecha1, this.fecha2,this.Form.value.municipio_id,this.Form.value.municipio_id, this.fecha1, this.fecha2)
     .subscribe(
       res => { // aqui tomo las respuesta
        //alert(this.fecha1)
         
         this.inventarioMunicipal = res;
         this.pdfMunicipal = true;
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
         },
         err => console.log(err)
       );
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
 







 // REPORTE ESTADAL POR ESTATUS //



 getInventarioEstadalEstatus() {

   this.inventarioService.reporteGeneralPorEstatus(this.Form2.value.estado_id, this.Form2.value.estatu_equipo_id, this.fecha1, this.fecha2,  this.fecha1, this.fecha2)
     .subscribe(
       res => { // aqui tomo las respuesta
         this.inventarioEstadalEstatus = res;
         console.log('Estadal ESTATUS PDF:', this.inventarioEstadalEstatus);
         this.pdfEstadal = true;
       },
       err => console.log(err)
     );
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
   doc.text(`Equipos Encontrados: ${this.inventarioEstadalEstatus.length}`, 310, 90);
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

   this.inventarioService.reporteGeneralMunicipalPorEstatus(this.Form2.value.equipo, this.Form2.value.municipio_id, this.Form2.value.estatu_equipo_id, this.fecha1, this.fecha2, this.fecha1, this.fecha2)
     .subscribe(
       res => { // aqui tomo las respuesta
         this.inventarioMunicipalEstatusData = res;
         console.log('Municipal ESTATUS PDF:', this.inventarioMunicipalEstatusData);
         this.pdfMunicipal = true;
       },
       err => console.log(err)
     );
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
    doc.text(`Equipos Encontrados: ${this.inventarioMunicipalEstatusData.length}`, 310, 90);
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

 this.inventarioService.reporteGeneralCentroSaludPorEstatus(this.Form2.value.equipo, this.Form2.value.centro_salud_id, this.Form2.value.estatu_equipo_id, this.fecha1, this.fecha2, this.fecha1, this.fecha2)
   .subscribe(
     res => { // aqui tomo las respuesta
       this.inventarioCentroSaludEstatusData = res;
       console.log('Centro salud ESTATUS PDF:', this.inventarioCentroSaludEstatusData);
       this.pdfCentroSalud = true;
     },
     err => console.log(err)
   );
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
    doc.text(`Equipos Encontrados: ${this.inventarioCentroSaludEstatusData.length}`, 310, 90);
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

   this.inventarioService.reporteGeneralEstadalPorReparado(this.Form3.value.equipo, this.Form3.value.estado_id, this.Form3.value.reparado, this.fecha1, this.fecha2)
     .subscribe(
       res => { // aqui tomo las respuesta
         this.inventarioEstadalReparadoData = res;
         console.log('Estadal REPARADO PDF:', this.inventarioEstadalReparadoData);
         this.pdfEstadal = true;
       },
       err => console.log(err)
     );
 }




 PDFEstadalPorReparado() {
   
   const doc = new jsPDF('l', 'pt', "a4");
 
   const col = [
     'Hospital',
     'Servicio Médico',
     'Equipo',
     'Marca',
     'Serial',
     'Nro Bien Nacional',
     'Reparado',
     'Estatus Equipo'
   ];
   const rows = [];
   const img = new Image();
   doc.setProperties({title: 'Reporte  Reparado Estadal Inventario'});
   img.src = 'assets/logo_vensalud.jpg';
   doc.addImage(img, 'JPGE', 50,8);
   doc.setFontSize(20);
   doc.text('Reporte  Reparado Estadal Inventario', 310, 60);
   doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
   this.getInventarioEstadalReparado();
  // console.log('PDF ESTATUS ESTADAL:', this.inventarioEstadalEstatus);
   
  
   this.inventarioEstadalReparadoData.forEach(element => {
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
       },
       err => console.log(err)
     );
 }




 PDFMunicipalPorReparado() {
   
   const doc = new jsPDF('l', 'pt', "a4");
 
   const col = [
     'Hospital',
     'Servicio Médico',
     'Equipo',
     'Marca',
     'Serial',
     'Nro Bien Nacional',
     'Reparado',
     'Estatus Equipo'
   ];
   const rows = [];
   const img = new Image();
   doc.setProperties({title: 'Reporte  Reparado Municipal Inventario'});
   img.src = 'assets/logo_vensalud.jpg';
   doc.addImage(img, 'JPGE', 50,8);
   doc.setFontSize(20);
   doc.text('Reporte  Reparado Municipal Inventario', 310, 60);
   doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
   this.getInventarioMunicipalEstatus();
   //console.log('PDF ESTATUS ESTADAL:', this.inventarioEstadalEstatus);
   
  
   this.inventarioMunicipalReparadoData.forEach(element => {
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
     1: {cellWidth: 80},
     2: {cellWidth: 80}, 
     3: {cellWidth: 60}, 
     4: {cellWidth: 60},  
    
    }
  
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
     },
     err => console.log(err)
   );
}




PDFCentroSaludPorReparado() {
 
 const doc = new jsPDF('l', 'pt', "a4");

 const col = [
   'Hospital',
   'Servicio Médico',
   'Equipo',
   'Marca',
   'Serial',
   'Nro Bien Nacional',
   'Reparado',
   'Estatus Equipo'
 ];
 const rows = [];
 const img = new Image();
 doc.setProperties({title: 'Reporte  Reparado Centro Salud Inventario'});
 img.src = 'assets/logo_vensalud.jpg';
 doc.addImage(img, 'JPGE', 50,8);
 doc.setFontSize(20);
 doc.text('Reporte  Reparado Centro Salud Inventario', 310, 60);
 doc.text(`Desde: ${this.fecha1} - Hasta: ${this.fecha2}`, 310, 30);
 this.getInventarioCentroSaludReparado();
 //console.log('PDF ESTATUS ESTADAL:', this.inventarioEstadalEstatus);
 

 this.inventarioCentroSaludReparadoData.forEach(element => {
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

 this.inventarioService.reporteGeneralBusquedaPorEquipos(this.equipoBusqueda, this.fecha1, this.fecha2)
   .subscribe(
     res => { // aqui tomo las respuesta

       this.equipos = res;
       this.pdfEquipo = true;
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
   'Bien Nacional',
   'Reparado',
   'Estatus Equipo'
 ];
 const rows = [];
 const img = new Image();
  doc.setProperties({title: 'Reporte Busqueda Por equipos'});
  img.src = 'assets/logo_vensalud.jpg';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte Busqueda Por equipos', 310, 60);
  

 this.getInventarioBusquedaPorEquipos();

 this.equipos.forEach(element => {
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


// AQUI TERMINA REPORTE ESTADAL





















 

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
    this.usuarios.user.estado_id;
   // alert(this.usuarios.user.estado_id);
    this.comboListService.getMunicipios().pipe(
    map((municipios: any[]) => municipios.filter((municipio) => municipio.estado_id == this.usuarios.user.estado_id)
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

}
