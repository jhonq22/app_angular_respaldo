import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { VacunasService } from 'src/app/services/vacunas.service';

@Component({
  selector: 'app-qrlist-public',
  templateUrl: './qrlist-public.component.html',
  styleUrls: ['./qrlist-public.component.css']
})
export class QRListPublicComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  valueqr = '';


  vacunas: any = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private vacunasService: VacunasService,
  ) { }


  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params; // para saber si recibo un parametro
 
            this.vacunasService.getQRVacunaCedula(params.cedula) // obtengo el juego con el parametro del id
              .subscribe(
                res => { // aqui tomo las respuesta
                  console.log(res);
                  //alert(params.cedula)
                  this.vacunas = res;

                  this.vacunas.forEach(element => {
                    //this.valueqr = `http://localhost:4200/vacunados/admin/list/`+ element.cedula;  
               
                
              
              });
                                  
                },
                err => console.log(err)
              );
      



  }

}
