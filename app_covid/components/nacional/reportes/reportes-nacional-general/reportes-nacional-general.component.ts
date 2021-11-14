import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { CombolistService } from 'src/app/services/combolist.service';
import { VacunasService } from 'src/app/services/vacunas.service';
import { ExcelService } from 'src/app/services/excel.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-reportes-nacional-general',
  templateUrl: './reportes-nacional-general.component.html',
  styleUrls: ['./reportes-nacional-general.component.css']
})
export class ReportesNacionalGeneralComponent implements OnInit {

    // Reportes
    VacunasTotalDosis: any = [];
    VacunasTotalDosisSexo: any = [];
    VacunasTotalDosisGrupoEspeciales: any = [];
    VacunasTotalDosisEtnias: any = [];
    VacunasTotalDosisPuebloIndigenas: any = [];
    VacunadosPersonalSalud: any = [];

    // REPORTE ESPECIAL MINISTRO
    vacunadosEspecialSexo: any = [];
    vacunadosEspecialEdades: any = [];
    vacunadosEspecialEstados: any = [];
    vacunadosEspecialSumaGeneral: any = [];

      // REPORTE ESPECIAL MINISTRO CON WHERE
      vacunadosEspecialSexoWhere: any = [];
      vacunadosEspecialEdadesWhere: any = [];
      vacunadosEspecialEstadosWhere: any = [];
      vacunadosEspecialSumaGeneralWhere: any = [];  


      // Reporte Vacunados
      VacunadosNo2Dosis: any = [];

  
    usuarios : any = [];


    tipo_vacuna_id = '';
    comboTipoVacuna = false;

    tipovacunas: any = [];
  

  constructor(
    private comboListService: CombolistService,
    private vacunasService:VacunasService,
    private excelService: ExcelService,
    private auth: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getTiposVacunas();

    this.getReporteVacunasTotalDosis();
    this.getReporteVacunasTotalDosisSexo();
    this.getReporteVacunasTotalDosisGrupoEspeciales();
    this.getReporteVacunasTotalDosisEtnias();
    this.getReporteVacunasTotalDosisIndigenas();
    this.getReporteVacunadosPersonalSalud();

    this.getReporteEspecialPorSexo();
    this.getReporteEspecialPorEdades();
    this.getReporteEspecialPorEstados();
    this.getReporteSumatoriaGeneralVacunadosEstados();
    this.getNo2Dosis();


    //REPORTE ESPECIAL WHERE

    
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



  // REPORTE 1 TOTAL DE DOSIS //
  excelVacunasTotalDosis():void {
    this.excelService.exportAsExcelFile(this.VacunasTotalDosis, 'Vacunas');
  }

  getReporteVacunasTotalDosis()
{
  const params = this.activatedRoute.snapshot.params;
  this.vacunasService.reporteVacunasTotalDosis().subscribe(res => {
    this.VacunasTotalDosis = res;
    console.log(res);
  },
  err => {
    console.log(err);
    if (err.status === 0)
    {}
  }
 );
}

PDFVacunasTotalDosis() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Total 1era Dosis' ,
    'Total 2da Dosis',
    'Total Dosis Completas'
    
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  Total de Dosis de Vacunados Por Estados'});
  img.src = 'assets/images/logo.png';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  Total de Dosis de Vacunados Por Estados', 310, 60);

  this.VacunasTotalDosis.forEach(element => {
    const temp = [
      element.estado,
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
                   0: {cellWidth: 180},
                   1: {cellWidth: 180},
                   2: {cellWidth: 180}, 
                   3: {cellWidth: 180}, 
                   4: {cellWidth: 110},  
                  
                  }
                
                });
     
      doc.save('Reporte_Dosi_Total_Estados.pdf');

}


  // REPORTE 1 TOTAL DE DOSIS //











  
  // REPORTE 2TOTAL DE DOSIS SEXO //
  excelVacunasTotalDosisSexo():void {
    this.excelService.exportAsExcelFile(this.VacunasTotalDosisSexo, 'Vacunas');
  }

  getReporteVacunasTotalDosisSexo()
{
  const params = this.activatedRoute.snapshot.params;
  this.vacunasService.reporteVacunasTotalDosisSexo().subscribe(res => {
    this.VacunasTotalDosisSexo = res;
    console.log(res);
  },
  err => {
    console.log(err);
    if (err.status === 0)
    {}
  }
 );
}

PDFVacunasTotalDosisSexo() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Centro Salud',
    'Femenino',
    'Masculino',
    'Total Dosis 1',
    'Total Dosis 2',
    'Total Dosis'
  
  
    
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  Total de Dosis de Vacunados Por Sexo'});
  img.src = 'assets/images/logo.png';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  Total de Dosis de Vacunados Por Sexo', 310, 60);

  this.VacunasTotalDosisSexo.forEach(element => {
    const temp = [
      element.estado,
      element.centro_salud,
      element.femenino,
      element.masculino,
      element.totaldosis1,
      element.totaldosis2,
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
     
      doc.save('Reporte_Dosi_Total_Sexo_Estados.pdf');

}


  // REPORTE 2 TOTAL DE DOSIS SEXO //












  // REPORTE 3 TOTAL DE DOSIS GRUPO ESPECIALES //
  excelVacunasTotalDosisGrupoEspeciales():void {
    this.excelService.exportAsExcelFile(this.VacunasTotalDosisGrupoEspeciales, 'Vacunas');
  }

  getReporteVacunasTotalDosisGrupoEspeciales()
{

  this.vacunasService.reporteVacunasTotalDosisGrupoEspeciales().subscribe(res => {
    this.VacunasTotalDosisGrupoEspeciales = res;
    console.log(res);
  },
  err => {
    console.log(err);
    if (err.status === 0)
    {}
  }
 );
}

PDFVacunasTotalDosisGrupoEspeciales() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Grupo Especial',
    'Estado',
    'Total 1era Dosis ',
    'Total 2da Dosis',
    'Total Dosis Completas'
    
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  Total de Dosis de Vacunados Por Estados Grupo Especiales'});
  img.src = 'assets/images/logo.png';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte Vacunados Grupo Especiales', 310, 60);

  this.VacunasTotalDosisGrupoEspeciales.forEach(element => {
    const temp = [
      element.grupo_especial,
      element.estado,
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
                   0: {cellWidth: 140},
                   1: {cellWidth: 140},
                   2: {cellWidth: 140}, 
                   3: {cellWidth: 140}, 
                   4: {cellWidth: 140},  
                  
                  }
                
                });
     
      doc.save('Reporte_Dosi_Total_Estados_Grupo_Especiales.pdf');

}


  // REPORTE 3 TOTAL DE DOSIS GRUPO ESPECIALES //














 // REPORTE 4 TOTAL DE DOSIS ETNIAS //
 excelVacunasTotalDosisEtnias():void {
  this.excelService.exportAsExcelFile(this.VacunasTotalDosisEtnias, 'Vacunas');
}

getReporteVacunasTotalDosisEtnias()
{

this.vacunasService.reporteVacunasTotalDosisEtnias().subscribe(res => {
  this.VacunasTotalDosisEtnias = res;
  console.log(res);
},
err => {
  console.log(err);
  if (err.status === 0)
  {}
}
);
}

PDFVacunasTotalDosisEtnias() {
const doc = new jsPDF('l', 'pt', "a4");

const col = [
  'Etnia',
  'Estado',
  'Total 1era Dosis ',
  'Total 2da Dosis',
  'Total Dosis Completas'
  
];
const rows = [];
const img = new Image();
doc.setProperties({title: 'Reporte  Total de Dosis de Vacunados Por Estados Etnias'});
img.src = 'assets/images/logo.png';
doc.addImage(img, 'JPGE', 50,8);
doc.setFontSize(20);
doc.text('Reporte  Total de Dosis Vacunados Por Etnias', 310, 60);

this.VacunasTotalDosisEtnias.forEach(element => {
  const temp = [
    element.etnia,
    element.estado,
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
                 0: {cellWidth: 140},
                 1: {cellWidth: 140},
                 2: {cellWidth: 140}, 
                 3: {cellWidth: 140}, 
                 4: {cellWidth: 140},  
                
                }
              
              });
   
    doc.save('Reporte_Dosi_Total_Estados_Etnias.pdf');

}


// REPORTE 4 TOTAL DE DOSIS GRUPO ETNIAS //













 // REPORTE 5 TOTAL DE DOSIS INDIGENAS //
 excelVacunasTotalDosisIndigenas():void {
  this.excelService.exportAsExcelFile(this.VacunasTotalDosisPuebloIndigenas, 'Vacunas');
}

getReporteVacunasTotalDosisIndigenas()
{

this.vacunasService.reporteVacunasTotalDosisIndigenas().subscribe(res => {
  this.VacunasTotalDosisPuebloIndigenas = res;
  console.log(res);
},
err => {
  console.log(err);
  if (err.status === 0)
  {}
}
);
}

PDFVacunasTotalDosisIndigenas() {
const doc = new jsPDF('l', 'pt', "a4");

const col = [
  'Pueblo Indigena',
  'Estado',
  'Total 1era Dosis ',
  'Total 2da Dosis',
  'Total Dosis Completas'
  
];
const rows = [];
const img = new Image();
doc.setProperties({title: 'Reporte  Total de Dosis de Vacunados Por Estados Pueblo Indigenas'});
img.src = 'assets/images/logo.png';
doc.addImage(img, 'JPGE', 50,8);
doc.setFontSize(20);
doc.text('Reporte  Total de Dosis de Vacunados Por Estados Pueblo Indigenas', 310, 60);

this.VacunasTotalDosisPuebloIndigenas.forEach(element => {
  const temp = [
    element.pueblo_indigena,
    element.estado,
    element.totaldosis1,
    element.totaldosis1,
    element.total

      
  ];

  rows.push(temp);

});

   doc.autoTable(col, rows, 
                           
              { 
               startY: 150,
               columnStyles: { 
                 0: {cellWidth: 140},
                 1: {cellWidth: 140},
                 2: {cellWidth: 140}, 
                 3: {cellWidth: 140}, 
                 4: {cellWidth: 140},  
                
                }
              
              });
   
    doc.save('Reporte_Dosi_Total_Estados_Pueblos_Indigenas.pdf');

}


// REPORTE 5 TOTAL DE DOSIS GRUPO ESPECIALES //








  // REPORTE 6 VACUNADOS PERSONAL DE SALUD //
  excelVacunasPersonalSalud():void {
    this.excelService.exportAsExcelFile(this.VacunadosPersonalSalud, 'vacunados_personal_salud');
  }

  getReporteVacunadosPersonalSalud()
{
  
  this.vacunasService.getPersonalSaludVacunados().subscribe(res => {
    this.VacunadosPersonalSalud = res;
    console.log(res);
  },
  err => {
    console.log(err);
    if (err.status === 0)
    {}
  }
 );
}

PDFVacunadosPersonalSalud() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Centro Salud',
    'Total Registrado Vacunados Sistema',
    'Total Personal de Salud Vacunados'
        
        
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte Vacunados Personal de Salud '});
  img.src = 'assets/images/logo.png';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte Vacunados Personal de Salud', 310, 60);



  this.VacunadosPersonalSalud.forEach(element => {

    

      const temp = [
      element.estado,
      element.centro_salud,
      element.registrado_vacunados,
      element.registrado_data_salud,
           

      
      
              
    ];

    rows.push(temp);

});

     doc.autoTable(col, rows, 
                             
                { 
                 startY: 150,
                 columnStyles: { 
                   0: {cellWidth: 180},
                   1: {cellWidth: 180},
                   2: {cellWidth: 180}, 
                   3: {cellWidth: 180}, 
                   4: {cellWidth: 110},  
                  
                  }
                
                });
     
      doc.save('Reporte_Vacunados_Personal_Salud.pdf');

}


  // REPORTE 6 VACUNADOS PERSONAL DE SALUD  FIN//












  //AQUI EMPIEZA EL REPORTE ESPECIAL PARA MINISTRO //


  getReporteEspecialPorSexo()
  {
    
    this.vacunasService.getReporteEspecialPorSexo().subscribe(res => {
      this.vacunadosEspecialSexo = res;
      console.log('especial sexo', res);
    },


    
    err => {
      console.log('especial sexo', err);
      if (err.status === 0)
      {}
    }
   );
  }


  getReporteEspecialPorEdades()
  {
    
    this.vacunasService.getReporteEspecialPorEdades().subscribe(res => {
      this.vacunadosEspecialEdades = res;
      console.log('especial edad', res);
    },
    
    err => {
      console.log('especial edad', err);
      if (err.status === 0)
      {}
    }
   );
  }


 

  getReporteEspecialPorEstados()
  {
    
    this.vacunasService.getReporteEspecialPorEstados().subscribe(res => {
      this.vacunadosEspecialEstados = res;
      console.log('especial estados', res);
    },
    
    err => {
      console.log('especial estados', err);
      if (err.status === 0)
      {}
    }
   );
  }
 


  
  getReporteSumatoriaGeneralVacunadosEstados()
  {
    
    this.vacunasService.getReporteSumatoriaGeneralVacunadosEstados().subscribe(res => {
      this.vacunadosEspecialSumaGeneral = res;
      console.log('Suma General', res);
    },
    
    err => {
      console.log('Suma General', err);
      if (err.status === 0)
      {}
    }
   );
  }
 





  PDFespecialReporteTotalVacunados() {
    const doc = new jsPDF('l', 'pt', "a4");
  
  
    const rows1 = []; // sexo
    const rows2 = []; //edades
    const rows3 = []; //estados
    const rows4 = []; //general
    const img = new Image();
    doc.setProperties({title: 'Reporte  Vacunación '});
    img.src = 'assets/images/logo.png';
    doc.addImage(img, 'JPGE', 50,8);
   
    doc.setFontSize(16);
    doc.text(`VICEMINISTERIO DE RECURSOS, TECNOLOGÍA Y REGULACIÓN`, 450, 40, 'center');
    doc.setFontSize(14);

    doc.text(`REPORTE DE VACUNACIÓN`, 450, 70, 'center');
  


    doc.text(`DATOS SEGÚN GÉNERO`, 130, 180, 'center');

    doc.text(`DATOS SEGÚN RANGO ETARIO`, 170, 330, 'center');


// SEXO //
    const colSexo = [
      'Vacuna',
      'Femenino',
      'Masculino',
      'Total Dosis 1',
      'Total Dosis 2',
      'Total Dosis Completas'
    ];
   
    this.vacunadosEspecialSexo.forEach(element => {
       const datosSexo = [
        element.nombre_vacuna,
        element.femenino,
        element.masculino,
        element.totaldosis1,
        element.totaldosis2,
        element.total_dosis_completadas
             
                
      ];
  
      rows1.push(datosSexo);
  
  });
  
       doc.autoTable(colSexo, rows1, 
                               
                  { 
                   startY: 200,
                   columnStyles: { 
                     0: {cellWidth: 130 },
                     1: {cellWidth: 130 },
                     2: {cellWidth: 130 }, 
                     3: {cellWidth: 130 }, 
                     4: {cellWidth: 130 },  
                    
                    }
                  
                  });


  //AQUI TERMINA Sexo //



  // EDADES //
  const colEdades = [
    'Vacuna',
    '13 - 21 Años',
    '22 - 59 Años',
    '60 + Años',
    'Total'
    
  ];
 
  this.vacunadosEspecialEdades.forEach(element => {
     const datosEdades = [
      element.nombre_vacuna,
      element.de_13_a_21,
      element.de_22_a_59,
      element.de_60_o_mas,
      element.total
     
     
           
              
    ];

    rows2.push(datosEdades);

});

     doc.autoTable(colEdades, rows2, 
                             
                { 
                 startY: 350,
                 columnStyles: { 
                   0: {cellWidth: 150 },
                   1: {cellWidth: 150 },
                   2: {cellWidth: 150 },
                   3: {cellWidth: 150 },  
                  
                  
                  }
                
                });


//AQUI TERMINA EDADES //




// ESTADOS //
const colEstados = [
  'Estado',
  'Nombre Vacuna',
  'Total Dosis 1',
  'Total Dosis 2',
  'Total Dosis Completas'
  
];

this.vacunadosEspecialEstados.forEach(element => {
   const datosEstados = [
    element.estado,
    element.nombre_vacuna,
    element.totaldosis1,
    element.totaldosis2,
    element.total_dosis_completas,
         
  ];

  rows3.push(datosEstados);

});
   doc.addPage()
   doc.setFontSize(14);
   //Texto Despues de la tabla
doc.text('TOTAL DE VACUNADOS POR ESTADOS', 45,80 )
   doc.autoTable(colEstados, rows3, 
                           
              { 
               startY:90,
               columnStyles: { 
                 0: {cellWidth: 170 },
                 1: {cellWidth: 140 },
                 2: {cellWidth: 140 },
                 3: {cellWidth: 140 }, 
                 4: {cellWidth: 150 },  
                
                
                }
              
              });


//AQUI TERMINA ESTADOS //



// SUMA GENERAL //
const colGeneral = [
  'Pais',
  'Nombre Vacuna',
  'Total Dosis 1 General',
  'Total Dosis 2 General',
  'Total Dosis Completas'
  
];

this.vacunadosEspecialSumaGeneral.forEach(element => {
   const datosGeneral = [
     'Venezuela',
     element.nombre_vacuna,
    element.totaldosis1,
    element.totaldosis2,
    element.total_dosis_completas
     
         
  ];

  rows4.push(datosGeneral);

});
//doc.addPage()
doc.setFontSize(14);
   //Texto Despues de la tabla
//doc.text('TOTAL DE VACUNADOS POR ESTADOS', 45,80 )
   doc.autoTable(colGeneral, rows4, 
                           
              { 
               startY:450,
               columnStyles: { 
                 0: {cellWidth: 170 },
                 1: {cellWidth: 140 },
                 2: {cellWidth: 140 },
                 3: {cellWidth: 140 }, 
                 4: {cellWidth: 150 },  
                
                
                }
              
              });


//AQUI TERMINA ESTADOS //













       
        doc.save('Reporte_Vacunacion_Especial');
  
  }
  
   
 
  //AQUI TERMINA EL REPORTE ESPECIAL PARA MINISTRO //


// ------------------------------------------ ************************ ----------------------- //


  //AQUI EMPIEZA EL REPORTE ESPECIAL PARA MINISTRO CON WHERE //

  EntrarComboList()
  {
    // alert('Activando combo')
    this.comboTipoVacuna = true;
    this.getReporteEspecialPorSexoWhere();
    this.getReporteEspecialPorEdadesWhere();
    this.getReporteEspecialPorEstadosWhere();
    this.getReporteSumatoriaGeneralVacunadosEstadosWhere();
  }






  getReporteEspecialPorSexoWhere()
  {
    
    this.vacunasService.getReporteEspecialPorSexoWhere(this.tipo_vacuna_id).subscribe(res => {
      this.vacunadosEspecialSexoWhere = res;
      console.log('especial sexo', res);
    },


    
    err => {
      console.log('especial sexo', err);
      if (err.status === 0)
      {}
    }
   );
  }


  getReporteEspecialPorEdadesWhere()
  {
    
    this.vacunasService.getReporteEspecialPorEdadesWhere(this.tipo_vacuna_id).subscribe(res => {
      this.vacunadosEspecialEdadesWhere = res;
      console.log('especial edad', res);
    },
    
    err => {
      console.log('especial edad', err);
      if (err.status === 0)
      {}
    }
   );
  }


 

  getReporteEspecialPorEstadosWhere()
  {
    
    this.vacunasService.getReporteEspecialPorEstadosWhere(this.tipo_vacuna_id).subscribe(res => {
      this.vacunadosEspecialEstadosWhere = res;
      console.log('especial estados', res);
    },
    
    err => {
      console.log('especial estados', err);
      if (err.status === 0)
      {}
    }
   );
  }
 


  
  getReporteSumatoriaGeneralVacunadosEstadosWhere()
  {
    
    this.vacunasService.getReporteSumatoriaGeneralVacunadosEstadosWhere(this.tipo_vacuna_id).subscribe(res => {
      this.vacunadosEspecialSumaGeneralWhere = res;
      console.log('Suma General', res);
    },
    
    err => {
      console.log('Suma General', err);
      if (err.status === 0)
      {}
    }
   );
  }
 





  PDFespecialReporteTotalVacunadosWhere() {
    const doc = new jsPDF('l', 'pt', "a4");
  
  
    const rows1 = []; // sexo
    const rows2 = []; //edades
    const rows3 = []; //estados
    const rows4 = []; //general
    const img = new Image();
    doc.setProperties({title: 'Reporte  Vacunación '});
    img.src = 'assets/images/logo.png';
    doc.addImage(img, 'JPGE', 50,8);
   
    doc.setFontSize(16);
    doc.text(`VICEMINISTERIO DE RECURSOS, TECNOLOGÍA Y REGULACIÓN`, 450, 40, 'center');
    doc.setFontSize(14);

    doc.text(`REPORTE DE VACUNACIÓN`, 450, 70, 'center');
  


    doc.text(`DATOS SEGÚN GÉNERO`, 130, 180, 'center');

    doc.text(`DATOS SEGÚN RANGO ETARIO`, 170, 330, 'center');


// SEXO //
    const colSexo = [
      'Vacuna',
      'Femenino',
      'Masculino',
      'Total Dosis 1',
      'Total Dosis 2',
      'Total Dosis Completas'
    ];
   
    this.vacunadosEspecialSexoWhere.forEach(element => {
       const datosSexo = [
        element.nombre_vacuna,
        element.femenino,
        element.masculino,
        element.totaldosis1,
        element.totaldosis2,
        element.total_dosis_completadas
             
                
      ];
  
      rows1.push(datosSexo);
  
  });
  
       doc.autoTable(colSexo, rows1, 
                               
                  { 
                   startY: 200,
                   columnStyles: { 
                     0: {cellWidth: 130 },
                     1: {cellWidth: 130 },
                     2: {cellWidth: 130 }, 
                     3: {cellWidth: 130 }, 
                     4: {cellWidth: 130 },  
                    
                    }
                  
                  });


  //AQUI TERMINA Sexo //



  // EDADES //
  const colEdades = [
    'Vacuna',
    '13 - 21 Años',
    '22 - 59 Años',
    '60 + Años',
    'Total'
    
  ];
 
  this.vacunadosEspecialEdadesWhere.forEach(element => {
     const datosEdades = [
      element.nombre_vacuna,
      element.de_13_a_21,
      element.de_22_a_59,
      element.de_60_o_mas,
      element.total
     
     
           
              
    ];

    rows2.push(datosEdades);

});

     doc.autoTable(colEdades, rows2, 
                             
                { 
                 startY: 350,
                 columnStyles: { 
                   0: {cellWidth: 150 },
                   1: {cellWidth: 150 },
                   2: {cellWidth: 150 },
                   3: {cellWidth: 150 },  
                  
                  
                  }
                
                });


//AQUI TERMINA EDADES //




// ESTADOS //
const colEstados = [
  'Estado',
  'Nombre Vacuna',
  'Total Dosis 1',
  'Total Dosis 2',
  'Total Dosis Completas'
  
];

this.vacunadosEspecialEstadosWhere.forEach(element => {
   const datosEstados = [
    element.estado,
    element.nombre_vacuna,
    element.totaldosis1,
    element.totaldosis2,
    element.total_dosis_completas,
         
  ];

  rows3.push(datosEstados);

});
   doc.addPage()
   doc.setFontSize(14);
   //Texto Despues de la tabla
doc.text('TOTAL DE VACUNADOS POR ESTADOS', 45,80 )
   doc.autoTable(colEstados, rows3, 
                           
              { 
               startY:90,
               columnStyles: { 
                 0: {cellWidth: 170 },
                 1: {cellWidth: 140 },
                 2: {cellWidth: 140 },
                 3: {cellWidth: 140 }, 
                 4: {cellWidth: 150 },  
                
                
                }
              
              });


//AQUI TERMINA ESTADOS //



// SUMA GENERAL //
const colGeneral = [
  'Pais',
  'Nombre Vacuna',
  'Total Dosis 1 General',
  'Total Dosis 2 General',
  'Total Dosis Completas'
  
];

this.vacunadosEspecialSumaGeneralWhere.forEach(element => {
   const datosGeneral = [
     'Venezuela',
     element.nombre_vacuna,
    element.totaldosis1,
    element.totaldosis2,
    element.total_dosis_completas
     
         
  ];

  rows4.push(datosGeneral);

});
//doc.addPage()
doc.setFontSize(14);
   //Texto Despues de la tabla
//doc.text('TOTAL DE VACUNADOS POR ESTADOS', 45,80 )
   doc.autoTable(colGeneral, rows4, 
                           
              { 
               startY:450,
               columnStyles: { 
                 0: {cellWidth: 170 },
                 1: {cellWidth: 140 },
                 2: {cellWidth: 140 },
                 3: {cellWidth: 140 }, 
                 4: {cellWidth: 150 },  
                
                
                }
              
              });


//AQUI TERMINA ESTADOS //













       
        doc.save('Reporte_Vacunacion_Especial_Por_Vacunas');
  
  }
  
  
 
 
 
 
 
 
  //AQUI TERMINA EL REPORTE ESPECIAL PARA MINISTRO //
















   // REPORTE No Vacunados 2da dosis  //
   excelNo2Dosis():void {
    this.excelService.exportAsExcelFile(this.VacunadosNo2Dosis, 'Vacunas');
  }

  getNo2Dosis()
{
  
  this.vacunasService.getReporteNoVacunados2DosisDesercion().subscribe(res => {
    this.VacunadosNo2Dosis = res;
    console.log(res);
  },
  err => {
    console.log(err);
    if (err.status === 0)
    {}
  }
 );
}

  PDFNo2Dosis() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'cedula',
    'Nombres',
    'Apellidos',
    'Fecha de Nacimiento',
    'Sexo',
    'Telefono',
    'Estado',
    'Centro Salud',
    'Motivo Deserción'
  
  
    
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte De No Vacunados con 2da Dosis'});
  img.src = 'assets/images/logo.png';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte De No Vacunados con 2da Dosis', 310, 60);

  this.VacunadosNo2Dosis.forEach(element => {
    const temp = [
      element.cedula,
      element.nombres,
      element.apellidos,
      element.fecha_nacimiento,
      element.sexo,
      element.telefono,
      element.estado,
      element.centro_salud,
      element.motivo_desercion
      
  
        
    ];

    rows.push(temp);

});

     doc.autoTable(col, rows, 
                             
                { 
                 startY: 150,
                 columnStyles: { 
                   0: {cellWidth: 80},
                   1: {cellWidth: 80},
                   2: {cellWidth: 80}, 
                   3: {cellWidth: 80}, 
                   4: {cellWidth: 80},  
                  
                  }
                
                });
     
      doc.save('Reporte_No_Vacunados_2da_Dosis.pdf');

}


  // REPORTE No Vacunados 2da dosis //




























}
