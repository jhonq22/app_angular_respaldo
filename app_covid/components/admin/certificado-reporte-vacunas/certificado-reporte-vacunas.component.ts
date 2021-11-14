import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VacunasService } from 'src/app/services/vacunas.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';



@Component({
  selector: 'app-certificado-reporte-vacunas',
  templateUrl: './certificado-reporte-vacunas.component.html',
  styleUrls: ['./certificado-reporte-vacunas.component.css']
})
export class CertificadoReporteVacunasComponent implements OnInit {

  vacunas: any = [];
  element: HTMLImageElement; /* Defining element */
   // QR
  
 elementType = NgxQrcodeElementTypes.URL;
 correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
 valueqr = '11701380';

 

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  constructor(private vacunasService: VacunasService) { }

  ngOnInit(): void {
    this.getReporteVacunasEdadGeneral();
  

  }



  getReporteVacunasEdadGeneral()
  {
    this.vacunasService.getQRVacunaCedula(25329844).subscribe(res => {
      this.vacunas = res;
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
    
    const doc = new jsPDF('l', 'pt', "letter");
  

    const rows = [];
    const img = new Image();
    doc.setProperties({title: 'Certificado de vacunados'});
    img.src = 'assets/certificado/logo1.png';
    doc.addImage(img, 'JPGE', 50,8);
   // img.src = 'assets/certificado/logo2.png';
    //doc.addImage(img, 'JPGE', 710,8);
    doc.setFontSize(8);
    doc.text(`DIRECCIÓN GENERAL DE EPIDEMIOLOGÍA
    REGLAMENTO SANITARIO INTERNACIONAL
    INTERNATIONAL HEALTH REGULATIONS
    RÉGLEMENT SANITAIRE INTERNATIONAL
    CERTIFICADO INTERNACIONAL DE VACUNACIÓN O PROFILAXIS
    INTERNATIONAL CERTIFICATE OF VACCINATION OR PROPHYLAXIS
    CERTIFICAT INTERNATIONAL DE VACCINATION OU PROPHYLAXIE`
    , 450, 40, 'center');

    doc.setFontSize(8);
    doc.text('EXPEDIDO A: __________________________________________________________________________________________________________   ', 80, 150)
    doc.text('ISSUED TO: ', 80, 160)
    doc.text('DELIVRE A: ', 80, 170)


    //NOMBRE
    doc.text('Certificase que(nombre): __________________________________________', 80, 200)
    doc.text('This is to certify that(name): ', 80, 210)
    doc.text('Nous certiflons que(nom): ', 80, 220)

    //NACIDO
    doc.text('Nacido(a): ________________________ ', 430, 200)
    doc.text('Data of birth ', 430, 210)
    doc.text('né (e) le', 430, 220)

   //Sexo
   doc.text('Sexo: _________________ ', 620, 200)
   doc.text('Sex ', 620, 210)
   doc.text('Sexe', 620, 220)




//NACIONALIDAD

    
    doc.text('Nacionalidad: ____________________', 80, 250)
    doc.text('Nacionality', 80, 260)
    doc.text('Nacionalite', 80, 270)

    //NACIDO
    doc.text('Documento nacional de identificación, si procede:_______________________________________________________  ', 320, 250)
    doc.text('Nacional identification document, if applicable', 320, 260)
    doc.text('Document d´identification national, les cas échéant', 320, 270)







   //Firma
   doc.text('Cuya firma aparece a continuación: ______________________________________________________________________________________ ', 80, 300)
   doc.text('Whose signature folows  ', 80, 310)
   doc.text('Dont le signature sull ', 80, 320)



      //Firma
      doc.text('(Nombre de la enfermedad o dolencia): ______________________________________________________________________________________ ', 80, 350)
      doc.text('(Name of disease or condition)', 80, 360)
      doc.text('(Nom de la maladie ou de l´affection)', 80, 370)
   


      //Texto Tabla
   doc.text('De conformidad con el Reglamento Sanitario Internacional:', 80, 390)
   doc.text('In accordance with the International Health Regulations.', 80, 400)
   doc.text('Conformément au Réglament Sanitarire International', 80, 410)

   


    

  



    this.vacunas.forEach(element => {
      const temp = [
        element.nombre_vacuna,
        element.fecha_dosis1,
        element.lote1,
             ];

      
     doc.setFontSize(12);

            

     doc.text( element.nombres + " " + element.apellidos, 175, 200)
     
     doc.text( element.fecha_nacimiento, 470, 200)

     doc.text( element.sexo, 650, 200)

     //doc.text( element.tipo_identificacion, 130, 250)

     ( element.cedula, 520, 250)

     doc.text( element.nombre_vacuna, 240, 350)

    // doc.text( qr , 710, 8)
 

    



      var picture = (<HTMLInputElement><unknown>document.getElementsByClassName("bshadow"));
      var qrImage = picture[0].children[0].src;
         console.log(qrImage);    

      doc.addImage(qrImage, 'JPGE', 650,8);
  
      rows.push(temp);
  
  });

 doc.setFontSize(8);
  const col1 = "Vacuna o profilaxis" + "\n" + "\n" + "Vaccine or prophylaxis" + "\n" + "\n" + "Vaccin ou agent prophylactique";
  const col2 = "Fecha" + "\n" + "\n" + "Date" + "\n" + "\n";
  const col3 = "Fabricante y número de lote de la vacuna o el producto profiláctico." + "\n" + "\n" + 
               "Manufacturer and batch no of vaccine or prophylaxis" + "\n" + "\n" +
               "Fabricant du vaccin ou de l´agent prophylactique el numéro du lot" ;
  const col4 = "Validez del certificado" + "\n" + 
  "Certificated valid" + "\n" + 
  "Certificant valable á" + "\n" +  "\n" + 
  "Hasta" + "\n" + "from" + "\n" + "Partir du___________" + "\n" + "\n" +
  "Desde" + "\n" + "Unie" + "\n" + "Jusqu´au ___________" + "\n";
  const col5 = "Sello oficial del centro administrador" + "\n" + "\n" + "Oficial stamp of the administtering centre" + "\n" + "\n" + "Cachet officiel du centre habilité";             

  const col = [
    col1,
    col2,
    col3,
    col4,
    col5
         
  ];
  
       doc.autoTable(col, rows, 
                               
                  { 
                    styles: { fontSize: 8 },
                   startY: 430,
                   columnStyles: {
                     0: {cellWidth: 150},
                     1: {cellWidth: 80},
                     2: {cellWidth: 150}, 
                     3: {cellWidth: 150}, 
                     4: {cellWidth: 150},  
                    
                    }
                  
                  });




                  doc.addPage()

                  doc.setFontSize(8);
         //Texto Despues de la tabla
doc.text('El presente Certificadosolo será valido si la vacuna o el tratamiento profiláctico ha sido administrado han sido aprobados por la Organización Mundial de la Salud (OMS).', 80, 30)
doc.text('This certificate is valid only if the vaccine or prophylaxis used has been aproved by the World Organization (WHO).', 80, 40)
doc.text('Certificat n´est valable que si le vaccin ou l´agent prophylactique utilisé a été approuvé par l´Organization Mondiale de la Santé (OMS)', 80, 50)
    


doc.text('El presente certificado deberá ir firmado de su puño y letra por el clínico, que habrá de ser el médico o el agente de la salud autorizado que haya supervisado la administración de la vacuna.' , 80, 70)
doc.text('This certificate must be signed in the hand of the clinician, who shal be a medical practitioner or other autorized healrh worker, supevising the administration of the vaccine or prophylaxis.', 80, 80)
doc.text('Ce certicat doit etre signe de la main du clinicaien – medecin autre agent de sante agree – qui supervice l´administration du vaccin ou de l´agente prophylactique.', 80, 90)


doc.text('Las enmiendas , tachaduras o borraduras y la omision de cualquiera de los datos requeridos podran acarrear invalidez del presente certificado.', 80, 110)
doc.text('Any amendment of this certificate, or erasure, or faulure to complete any part of it, may render it valid. ', 80, 120)
doc.text('Toute correction ou rature sur le certificat ou l´omission d´une quelconque des informations demandées peut entrainer sa nullité.', 80, 130)

doc.text('La validez del presente certificado se extenderá hasta la fecha indicada para la vacunacion o el tratamiento profiláctico de que se trate.', 80, 150)
doc.text('The validity of this certificate shall extend until the date indicated for the particular vaccinatioon or prophylaxis. ', 80, 160)
doc.text('Ce certificat est valable jusqu´a la date indiquée pour le vaccin ou l´agent prophylactique.', 80, 170)

doc.text('El certificado deberá ser complementado integramente en ingles y francés.', 80, 190)
doc.text('The certificate shall be fully completed in english or in french. ', 80, 200)
doc.text('Ll doit étre établi intégralement en anglais ou francais.', 80, 210)

doc.text('Tambien se podra , en el mismo documento, en otro idioma ademas de uno de los dos citados.', 80, 230)
doc.text('The certificate mayalso be completed in another lenguage on the same document in addition to one of both mentioned. ', 80, 240)
doc.text('Le méme certificat peut aussi étre étabil dans une autre langue, en plus de lánglais ou du francais.', 80, 250)














       
        doc.save('Reporte_certificado_vacunados.pdf');



  
  }
  

}
