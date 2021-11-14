import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URI, CentroSaludInterface, ConvocadosPatriasInterfaces, GrupoEspecialInterface, MunicipiosInterface, TiposVacunasInterfaces, VacunasRecibidasInterface } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class CombolistService {

  constructor(private http: HttpClient) { }


//API CENTRO DE SALUD //

// API CENTRO SALUD //


getTodosCentrosSalud() {
  return this.http.get(`${API_URI}/centro_salud`);



}

getTodosCentroSalud() {
  return this.http.get(`${API_URI}/centro_salud_list`);
}


getCentroSalud(id: string) {
  return this.http.get(`${API_URI}/centro_salud/${id}`);
}


getCentroSaludEstados(id: string) {
  return this.http.get(`${API_URI}/centro_salud_estados/${id}`);
}




saveCentroSalud(centrosalud: CentroSaludInterface) {
  return this.http.post(`${API_URI}/centro_salud`,centrosalud);
}

updateCentroSalud(id: string|number, updatedCentroSalud: CentroSaludInterface): Observable<CentroSaludInterface> {
  return this.http.put(`${API_URI}/centro_salud/${id}`, updatedCentroSalud);
}


deleteCentroSalud(id: string|number) {
  return this.http.delete(`${API_URI}/centro_salud/${id}`);
}


// COMBO LIST// 

  getEstados() {
    return this.http.get(`${API_URI}/estados`);
  }



  

 
  getMunicipios(): Observable<MunicipiosInterface[]> {
    return this.http.get<MunicipiosInterface[]>(`${API_URI}/municipios`);
  }



  getEtnias() {
    return this.http.get(`${API_URI}/etnias`);
  }


  getParroquias() {
    return this.http.get(`${API_URI}/parroquias`);
  }


  getPueblosIndigenas() {
    return this.http.get(`${API_URI}/pueblo_indigenas`);
  }


  getRoles() {
    return this.http.get(`${API_URI}/roles`);
  }
// AQUI TERMINAN LOS COMBO LIST //







// CRUD GRUPO ESPECIALES //

getGruposEspeciales() {
  return this.http.get(`${API_URI}/grupo_especiales`);
}


getGrupoEspecial(id: string) {
  return this.http.get(`${API_URI}/grupo_especiales/${id}`);
}


saveGruposEspeciales(GrupoEspecial: GrupoEspecialInterface) {
  return this.http.post(`${API_URI}/grupo_especiales`,GrupoEspecial);
}

updateGruposEspeciales(id: string|number, updatedGrupoEspecials: GrupoEspecialInterface): Observable<GrupoEspecialInterface> {
  return this.http.put(`${API_URI}/grupo_especiales/${id}`, updatedGrupoEspecials);
}







  // CRUD DE TIPOS DE VACUNAS //

  getTiposVacunas() {
    return this.http.get(`${API_URI}/tipo_vacunas`);
  
  }
  
  
  getTiposVacuna(id: string) {
    return this.http.get(`${API_URI}/tipo_vacunas/${id}`);
  }
  
 
  
  saveTiposVacunas(TiposVacuna: TiposVacunasInterfaces) {
    return this.http.post(`${API_URI}/tipo_vacunas`,TiposVacuna);
  }
  
  updateTiposVacunas(id: string|number, updatedTiposVacunas: TiposVacunasInterfaces): Observable<TiposVacunasInterfaces> {
    return this.http.put(`${API_URI}/tipo_vacunas/${id}`, updatedTiposVacunas);
  }
  
  
  deleteTiposVacunas(id: string|number) {
    return this.http.delete(`${API_URI}/tipo_vacunas/${id}`);
  }



    // CRUD DE VACUNAS RECIBIDAS //

    getVacunasRecibidas() {
      return this.http.get(`${API_URI}/vacunas_recibidas`);
    
    }




    getVacunasRecibidasEstadal(id: string| number) {
      return this.http.get(`${API_URI}/vacunas_recibida/estadal/${id}`);
    
    }


    getVacunasRecibidasCentroSalud(id: string| number) {
      return this.http.get(`${API_URI}/vacunas_recibida/centrosalud/${id}`);
    
    }













    getVacunasRecibidasExcel() {
      return this.http.get(`${API_URI}/vacuna_recibida/excel/todos`);
    
    }
    
    
    
    getVacunasRecibida(id: string) {
      return this.http.get(`${API_URI}/vacunas_recibidas/${id}`);
    }
    
   
    
    saveVacunasRecibidas(VacunasRecibida: VacunasRecibidasInterface) {
      return this.http.post(`${API_URI}/vacunas_recibidas`,VacunasRecibida);
    }
    
    
    updateVacunasRecibidas(id: string|number, updatedVacunasRecibidas: VacunasRecibidasInterface): Observable<VacunasRecibidasInterface> {
      return this.http.put(`${API_URI}/vacunas_recibidas/${id}`, updatedVacunasRecibidas);
    }
    
        

     // CARGA MASIVA DE EXCEL IMPORT //

     importExcelVacunadosMasiva(formData) {
      return this.http.post(`${API_URI}/import`, formData, {
        reportProgress: true,
        observe: 'events'
        });
    }


    getConvocadosPatrias() {
      return this.http.get(`${API_URI}/convocados_patrias`);
    }


    getConvocadosPatria(id: string) {
      return this.http.get(`${API_URI}/convocados_patrias/${id}`);
    }
    



    updateConvocadosPatrias(id: string|number, updated: ConvocadosPatriasInterfaces): Observable<ConvocadosPatriasInterfaces> {
      return this.http.put(`${API_URI}/convocados_patrias/${id}`, updated);
    }



    // estatus convocados //
    getEstatusConvocados() {
      return this.http.get(`${API_URI}/estatus_convocados`);
    }


}


