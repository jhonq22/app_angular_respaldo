import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InventarioInterfaces, CentroSaludInterface, MunicipiosInterface, API_URI, MarcasInterfaces, EquipoInterface, HistoricoInventarioInterface, EquiposRespuestoInterface, RepuestoDetallesInterface, BibliotecaVirtualInterface, TecnicosInterface } from '../interface';
@Injectable({
  providedIn: 'root'
})
export class ComboListService {



  constructor(private http: HttpClient) { }





// API CENTRO SALUD //

// INVENTARIOG //
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









//HISTORICO INVENTARIO 

saveHistoricoInventario(historico: HistoricoInventarioInterface) {
  return this.http.post(`${API_URI}/historico_inventario`, historico);
}



getTodosHistoricoInventario() {
  return this.http.get(`${API_URI}/historico_inventario`);
}






  //COMBOS DEPENDIENTE//

  getEstados() {
    return this.http.get(`${API_URI}/estados`);
  }

/*
   private heroesUrl = `${API_URI}/municipios`;


  getMunicipios(): Observable<MunicipiosInterface[]> {
    return this.http.get<MunicipiosInterface[]> (this.heroesUrl);
  }

  */

  // ESTE ES MI SERVICE DONDE ME TRAIGO LA DATA API DE LARAVEL
  getMunicipios(): Observable<MunicipiosInterface[]> {
    return this.http.get<MunicipiosInterface[]>(`${API_URI}/municipios`);
  }


  getEstatusEquipos() {
    return this.http.get(`${API_URI}/estatus_equipos`);
  }


  getEntes() {
    return this.http.get(`${API_URI}/entes`);
  }

  getEnte(id: string|number) {
    return this.http.get(`${API_URI}/entes/${id}`);
  }


  // MARCAS //


  getMarcas() {
    return this.http.get(`${API_URI}/marcas`);
  }

  getMarcas1(): Observable<any[]> {
    // return this.http.get(`${API_URI}/marcas`);
    return this.http.get<any[]>(`${API_URI}/marcas`);
  }

  


  getMarca(id: string) {
    return this.http.get(`${API_URI}/marcas/${id}`);
  }

  saveMarcas(marca: MarcasInterfaces) {
    return this.http.post(`${API_URI}/marcas`, marca);
  }

  updateMarcas(id: string|number, updatedMarcas: MarcasInterfaces): Observable<MarcasInterfaces> {
    return this.http.put(`${API_URI}/marcas/${id}`, updatedMarcas);
  }

  deleteMarcas(id: string|number) {
    return this.http.delete(`${API_URI}/marcas/${id}`);
  }




    // EQUIPOS //


    getEquipos() {
      return this.http.get(`${API_URI}/equipos`);
    }

    getEquipo(id: string) {
      return this.http.get(`${API_URI}/equipos/${id}`);
    }

    saveEquipos(equipo: EquipoInterface) {
      return this.http.post(`${API_URI}/equipos`, equipo);
    }

    updateEquipos(id: string|number, updatedEquipos: EquipoInterface): Observable<EquipoInterface> {
      return this.http.put(`${API_URI}/equipos/${id}`, updatedEquipos);
    }

    deleteEquipos(id: string|number) {
      return this.http.delete(`${API_URI}/equipos/${id}`);
    }





    // API CENTRO SALUD //

// INVENTARIOG //
        getTodosEquipoRespuestos() {
          return this.http.get(`${API_URI}/equipos_respuestos`);
        }

        getEquipoRespuesto(id: string) {
        return this.http.get(`${API_URI}/equipos_respuestos/${id}`);
        }




        saveEquipoRespuesto(respuesto: EquiposRespuestoInterface) {
          return this.http.post(`${API_URI}/equipos_respuestos`, respuesto);
        }

        updateEquipoRespuesto(id: string|number, updatedrespuesto: EquiposRespuestoInterface): Observable<EquiposRespuestoInterface> {
          return this.http.put(`${API_URI}/equipos_respuestos/${id}`, updatedrespuesto);
        }


        deleteEquipoRespuesto(id: string|number) {
          return this.http.delete(`${API_URI}/equipos_respuestos/${id}`);
        }






        getTodosDetallesRespuestos() {
          return this.http.get(`${API_URI}/detalle_respuesto`);
        }

        getTodosDetallesRespuestosSolicitados() {
          return this.http.get(`${API_URI}/respuesto/solicitados`);
        }



        getDetallesRepuestos(id: string) {
        return this.http.get(`${API_URI}/detalle_respuesto/${id}`);
        }

        getDetallesRepuestosInventario(id: string) {
          return this.http.get(`${API_URI}/detalle_respuesto_inventario/${id}`);
          }


          ReportePDFEstadalDetallesRepuestosInventario(id: string) {
            return this.http.get(`${API_URI}/detalle_respuesto_inventario/reporte/estadal/${id}`);
            }
  




        saveDetallesRepuestos(respuesto: RepuestoDetallesInterface) {
          return this.http.post(`${API_URI}/detalle_respuesto`, respuesto);
        }

        updateDetallesRepuestos(id: string|number, updatedrespuesto: RepuestoDetallesInterface): Observable<RepuestoDetallesInterface> {
          return this.http.put(`${API_URI}/detalle_respuesto/${id}`, updatedrespuesto);
        }


        deleteDetallesRepuestos(id: string|number) {
          return this.http.delete(`${API_URI}/detalle_respuesto/${id}`);
        }



        //BIBLIOTECA VIRTUAL //

        
  

    getBibliotecas() {
      return this.http.get(`${API_URI}/biblioteca_virtual`);
    }

    getBiblioteca(id: string) {
      return this.http.get(`${API_URI}/biblioteca_virtual/${id}`);
    }

    saveBibliotecas(biblioteca: BibliotecaVirtualInterface) {
      return this.http.post(`${API_URI}/biblioteca_virtual`, biblioteca);
    }

    updateBibliotecas(id: string|number, updatedEquipos: BibliotecaVirtualInterface): Observable<BibliotecaVirtualInterface> {
      return this.http.put(`${API_URI}/biblioteca_virtual/${id}`, updatedEquipos);
    }

    deleteBibliotecas (id: string|number) {
      return this.http.delete(`${API_URI}/biblioteca_virtual/${id}`);
    }


    guardarArchivoBiblioteca(formData) {
      return this.http.post(`${API_URI}/biblioteca_virtual`, formData, {
        reportProgress: true,
        observe: 'events'
        });
    }
  


    //estatus solicitud 
    getSolicitudEstatusRepuestos() {
      return this.http.get(`${API_URI}/estatus_solicitud_repuestos`);
    }

    updateEstatusRepuestosSolicitud(id: string|number, updatedEquipos: RepuestoDetallesInterface): Observable<RepuestoDetallesInterface> {
      return this.http.put(`${API_URI}/estatu_repuestos_actualizar/${id}`, updatedEquipos);
    }




      // TECNICOS //


  getTecnicos() {
    return this.http.get(`${API_URI}/tecnicos`);
  }

  


  getTecnico(id: string) {
    return this.http.get(`${API_URI}/tecnicos/${id}`);
  }

  saveTecnicos(tecnico: TecnicosInterface) {
    return this.http.post(`${API_URI}/tecnicos`, tecnico);
  }

  updateTecnicos(id: string|number, updatedTecnicos: TecnicosInterface): Observable<TecnicosInterface> {
    return this.http.put(`${API_URI}/tecnicos/${id}`, updatedTecnicos);
  }

  deleteTecnicos(id: string|number) {
    return this.http.delete(`${API_URI}/tecnicos/${id}`);
  }


  // para capturar la cedula si esta registrado //
  MarcasRegistradas(marca: string) {
    return this.http.get(`${API_URI}/marcas/registradas/${marca}`);
  }

  EquiposRegistradas(equipo: string) {
    return this.http.get(`${API_URI}/equipos/registradas/${equipo}`);
  }


  CentrosRegistradas(centro: string) {
    return this.http.get(`${API_URI}/centros/registradas/${centro}`);
  }



}
