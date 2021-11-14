import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URI, VacunasInterfaces, VacunasPerdidasInterfaces } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class VacunasService {

  constructor(private http: HttpClient,) { }


  getVacunas() {
    return this.http.get(`${API_URI}/vacunados`);
  }


  getVacunasListadoCompletoQR() {
    return this.http.get(`${API_URI}/vacunas/listado/qr/completo`);
  }


  getListadoVacunas() {
    return this.http.get(`${API_URI}/vacunas/listado`);
  }

  // para capturar la cedula si esta registrado //
  getVacunaCedula(cedula: string, tipo_identificacion: string) {
    return this.http.get(`${API_URI}/vacunas/cedula/${cedula}/${tipo_identificacion}`);
  }



    // para capturar la cedula si esta registrado //
    getVacunaCedulaPatria(cedula: string| number, centro_salud_id: string| number ) {
      return this.http.get(`${API_URI}/vacunados/patria/master/cedula/${cedula}/${centro_salud_id}`);
    }
  
  





  // para capturar verificar la cedula en el QR //
  getQRVacunaCedula(id: string| number) {
    return this.http.get(`${API_URI}/vacunas/qr/${id}`);
  }


  getCeduladosSaime(cedula: string| number, tipo_identificacion: string| number ) {
    return this.http.get(`${API_URI}/cedulados/${cedula}/${tipo_identificacion}`);
  }






  getVacuna(id:string|number) {
    return this.http.get(`${API_URI}/vacunados/${id}`);
  }

  getVacunad(id: string|number) {
    return this.http.get(`${API_URI}/vacunados/${id}`);
  }
  




  saveVacunas(vacunas: VacunasInterfaces) {
    return this.http.post(`${API_URI}/vacunados`,vacunas);
  }


  updateVacuna(id: string|number, updatedVacuna: VacunasInterfaces): Observable<VacunasInterfaces> {
    return this.http.put(`${API_URI}/vacunados/${id}`, updatedVacuna);
  }


  updateDosis2(id: string|number, updatedVacuna: VacunasInterfaces): Observable<VacunasInterfaces> {
    return this.http.put(`${API_URI}/vacunas/dosis/${id}`, updatedVacuna);
  }


  deleteVacuna(id: string|number) {
    return this.http.delete(`${API_URI}/vacunados/${id}`);
  }


 // API PARA VACUNAS PERDIDAS //

 getVacunaPerdidas() {
  return this.http.get(`${API_URI}/vacunas_perdidas`);
}




// VACUNAS PERDIDAS POR Estadal //

getVacunaPerdidaCentroEstadal(id: string| number) {
  return this.http.get(`${API_URI}/vacuna_perdida/listado/estadal/${id}`);
}

getVacunaPerdidaEstadalExcel(id: string| number) {
  return this.http.get(`${API_URI}/vacuna_perdida/excel/estadal/${id}`);
}


















// VACUNAS PERDIDAS POR CENTRO SALUD //

getVacunaPerdidaCentroSalud(id: string| number) {
  return this.http.get(`${API_URI}/vacuna_perdida/listado/centro_salud/${id}`);
}

getVacunaPerdidaCentroSaludExcel(id: string| number) {
  return this.http.get(`${API_URI}/vacuna_perdida/excel/centro_salud/${id}`);
}



 getVacunaPerdida(id: string) {
  return this.http.get(`${API_URI}/vacunas_perdidas/${id}`);
}









saveVacunasPerdidas(vacunas: VacunasPerdidasInterfaces) {
  return this.http.post(`${API_URI}/vacunas_perdidas`,vacunas);
}


updateVacunaPerdidas(id: string|number, updatedVacuna: VacunasPerdidasInterfaces): Observable<VacunasPerdidasInterfaces> {
  return this.http.put(`${API_URI}/vacunas_perdidas/${id}`, updatedVacuna);
}



VacunadosExcelTodos() {
  return this.http.get(`${API_URI}/vacunas/excel/todos`);
}

VacunasPerdidasExcelTodos() {
  return this.http.get(`${API_URI}/vacuna_perdida/excel/todos`);
}





// ROL ESTADAL PARA VISOR VACUNADOS //

ListadoVacunadosPorEstados(estado_id: string|number) {
  return this.http.get(`${API_URI}/vacunas/estadal/${estado_id}`);
}

ListadoVacunadosPorEstadosExcel(estado_id: string|number) {
  return this.http.get(`${API_URI}/vacunas/excel/estadal/${estado_id}`);
}


// ROL REGISTRADOR

ListadoVacunadosPorCentroSalud(id: string|number) {
  return this.http.get(`${API_URI}/vacunas/centro_salud/${id}`);
}


ListadoVacunadosPorCentroSaludExcel(id: string|number) {
  return this.http.get(`${API_URI}/vacunas/excel/centro_salud/${id}`);
}



////// REPORTES GENERAL ///

reporteVacunasEdadGeneral() {
  return this.http.get(`${API_URI}/vacunas/reportes/edad/general`);
}




reporteVacunasEdadEstado(estado_id: string|number) {
  return this.http.get(`${API_URI}/vacunas/reportes/edad/estadal/${estado_id}`);
}

//////////////// REPORTE REGISTRADOR //////////////

reporteVacunasEdadCentroSalud(centro_salud_id: string|number) {
  return this.http.get(`${API_URI}/vacunas/reportes/edad/centro_salud/${centro_salud_id}`);
}





////// REPORTES PARA ROL NACIONAL MInistro ///

reporteVacunasTotalDosis() {
  return this.http.get(`${API_URI}/vacunas/reportes/total/dosis`);
}

reporteVacunasTotalDosisSexo() {
  return this.http.get(`${API_URI}/vacunas/reportes/total/dosis/sexo`);
}

reporteVacunasTotalDosisGrupoEspeciales() {
  return this.http.get(`${API_URI}/vacunas/reportes/total/dosis/grupo_especial`);
}

reporteVacunasTotalDosisEtnias() {
  return this.http.get(`${API_URI}/vacunas/reportes/total/dosis/etnias`);
}

reporteVacunasTotalDosisIndigenas() {
  return this.http.get(`${API_URI}/vacunas/reportes/total/dosis/indigenas`);
}

reporteVacunasDosis1(fecha1: string, fecha2: string) {
  return this.http.get(`${API_URI}/vacunas/reportes/dosis1/fecha/${fecha1}/${fecha2}`);
}


reporteVacunasDosis1PorEstado(estado_id: string | number, fecha1: string, fecha2: string) {
  return this.http.get(`${API_URI}/vacunas/reportes/dosis1/estados/fecha/${estado_id}/${fecha1}/${fecha2}`);
}


// REPORTE DE VACUNADOS Y DATA SALUD //

getPersonalSaludVacunados() {
  return this.http.get(`${API_URI}/datasalud`);
}



// REPORTE ESPECIAL PARA EL MINISTRO //

getReporteEspecialPorSexo() {
  return this.http.get(`${API_URI}/vacunas/reportes/especial/sexo`);
}

getReporteEspecialPorEdades() {
  return this.http.get(`${API_URI}/vacunas/reportes/especial/edades`);
}


getReporteEspecialPorEstados() {
  return this.http.get(`${API_URI}/vacunas/reportes/especial/estados`);
}


getReporteSumatoriaGeneralVacunadosEstados() {
  return this.http.get(`${API_URI}/vacunas/reportes/especial/general/sumatoria`);
}




// REPORTE ESPECIAL PARA EL MINISTRO WHERE //

getReporteEspecialPorSexoWhere(tipo_vacuna_id: string|number ) {
  return this.http.get(`${API_URI}/vacunas/reportes/especial/sexo/where/${tipo_vacuna_id}`);
}

getReporteEspecialPorEdadesWhere(tipo_vacuna_id: string|number ) {
  return this.http.get(`${API_URI}/vacunas/reportes/especial/edades/where/${tipo_vacuna_id}`);
}


getReporteEspecialPorEstadosWhere(tipo_vacuna_id: string|number ) {
  return this.http.get(`${API_URI}/vacunas/reportes/especial/estados/where/${tipo_vacuna_id}`);
}


getReporteSumatoriaGeneralVacunadosEstadosWhere(tipo_vacuna_id: string|number ) {
  return this.http.get(`${API_URI}/vacunas/reportes/especial/general/sumatoria/where/${tipo_vacuna_id}`);
}





getReporteNoVacunados2DosisDesercion() {
  return this.http.get(`${API_URI}/vacunas/desercion`);
}






}
