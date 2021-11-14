import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InventarioInterfaces, API_URI } from '../interface';
@Injectable({
  providedIn: 'root'
})
export class InventarioService {


  constructor(private http: HttpClient) { }

// Peticiones GET INVENTARIO //
  getInventarios() {
    return this.http.get(`${API_URI}/inventarios`);
  }

  getInventariosNoOperativo() {
    return this.http.get(`${API_URI}/inventario/no`);
  }


  getInventariosNoOperativoEstadal(estado_id: string | number) {
    return this.http.get(`${API_URI}/inventario/no/${estado_id}`);
  }




  getInventario(id: string) {
    return this.http.get(`${API_URI}/inventarios/${id}`);
  }


// LISTADO INVENTAIROS PARA ROL DE ESTADAL //

  getInventariosPorEstados(id: string|number) {
    return this.http.get(`${API_URI}/inventarios/estados/${id}`);
  }


  getInventariosPorMunicipios(id: string|number) {
    return this.http.get(`${API_URI}/inventarios/municipios/${id}`);
  }


  getInventariosPorCentroSalud(id: string|number) {
    return this.http.get(`${API_URI}/inventarios/centrosalud/${id}`);
  }

  
// AQUI TERMINA LISTADO INVENTAIROS PARA ROL DE ESTADAL //



// TERMINAN las Peticiones GET INVENTARIO //









  getInventarioDetallado(id: string|number) {
    return this.http.get(`${API_URI}/inventarios/detallado/${id}`);
  }


  saveInventario(inventario: InventarioInterfaces) {
    return this.http.post(`${API_URI}/inventarios`,inventario);
  }

  updateInventario(id: string|number, updatedInventario: InventarioInterfaces): Observable<InventarioInterfaces> {
    return this.http.put(`${API_URI}/inventarios/${id}`, updatedInventario);
  }


  deleteInventario(id: string|number) {
    return this.http.delete(`${API_URI}/inventarios/${id}`);
  }

  // INVENTARIO //




  // HISTORICO ESTATUS INVENTARIO //
  getHistoricoEstatusInventarios() {
    return this.http.get(`${API_URI}/historico_estatus`);
  }

  getHistoricoEstatusInventario(id: string) {
    return this.http.get(`${API_URI}/historico_estatus/${id}`);
  }

  getHistoricoEstatusInventarioEquipo(id: string) {
    return this.http.get(`${API_URI}/historico_estatu_equipo/${id}`);
  }

  saveHistoricoEstatusInventario(inventario: InventarioInterfaces) {
    return this.http.post(`${API_URI}/historico_estatus`,inventario);
  }

  updateHistoricoEstatusInventario(id: string|number, updatedInventario: InventarioInterfaces): Observable<InventarioInterfaces> {
    return this.http.put(`${API_URI}/historico_estatus/${id}`, updatedInventario);
  }


  deleteHistoricoEstatusInventario(id: string|number) {
    return this.http.delete(`${API_URI}/historico_estatus/${id}`);
  }

  // HISTORICO ESTATUS INVENTARIO //


  // INVENTARIO MULTIMEDIA AGREGAR GALERIA //
  getInventariosMultimedia() {
    return this.http.get(`${API_URI}/multimedia_inventario`);
  }

  getInventarioMultimedia(id: string) {
    return this.http.get(`${API_URI}/multimedia_inventario/galeria/${id}`);
  }


  updateInventarioMultimedia(id: string|number, updatedInventario: InventarioInterfaces): Observable<InventarioInterfaces> {
    return this.http.put(`${API_URI}/multimedia_inventario/${id}`, updatedInventario);
  }


  deleteInventarioMultimedia(id: string|number) {
    return this.http.delete(`${API_URI}/multimedia_inventario/${id}`);
  }



  guardarGaleriaInventario(formData) {
    return this.http.post(`${API_URI}/multimedia_inventario`, formData, {
      reportProgress: true,
      observe: 'events'
      });
  }

  // INVENTARIO MULTIMEDIA AGREGAR GALERIA //






    // INVENTARIO ESTADISTICAS //

    getContarInventarioEstatus() {
      return this.http.get(`${API_URI}/inventario/contar_equipos`);
    }

    getContarInventarioEstatusEstados(id: string|number ) {
      return this.http.get(`${API_URI}/inventario/contar_equipos/estados/${id}`);
    }



    getContarInventarioEstatusCentroSalud(id: string|number ) {
      return this.http.get(`${API_URI}/inventario/contar_equipos/centrosalud/${id}`);
    }




    cantidadTotalInventario() {
      return this.http.get(`${API_URI}/inventario/total`);
    }


    cantidadTotalInventarioEstados(id: string|number) {
      return this.http.get(`${API_URI}/inventario/total/estados/${id}`);
    }


    cantidadTotalInventarioCentroSalud(id: string|number) {
      return this.http.get(`${API_URI}/inventario/total/centrosalud/${id}`);
    }



    cantidadTotalUsuarios() {
      return this.http.get(`${API_URI}/users/total_usuarios`);
    }

    //AQUI INVENTARIO ESTADISTICAS //



    // CARGA MASIVA DE EXCEL IMPORT //

    importExcelInventarioMasiva(formData) {
      return this.http.post(`${API_URI}/import`, formData, {
        reportProgress: true,
        observe: 'events'
        });
    }


    VerificarDuplicidadMarcas(marca_id: string|number, serial: string|number ) {
      return this.http.get(`${API_URI}/inventarios/marca/${marca_id}/${serial}`);
    }



    // TABLA EQUIPO GENERAL EN INICIO

    TablaEquiposInventariosGeneral() {
      return this.http.get(`${API_URI}/inventario/tabla`);
    }

    
    TablaCoeficicienteGeneral() {
      return this.http.get(`${API_URI}/inventario/tabla/general`);
    }





// REPORTES EN PDF //

reporteGeneral(fecha1: string|number, fecha2: string|number, fecha3: string|number, fecha4: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/general/${fecha1}/${fecha2}/${fecha3}/${fecha4}`);
}

reporteGeneralEstadal(id1: string|number,id2: string|number, fecha1: string|number, fecha2: string|number, fecha3: string|number, fecha4: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/estadal/${fecha1}/${fecha2}/${id1}/${id2}/${fecha3}/${fecha4}`);
}



reporteGeneralMunicipal(id1: string|number,id2: string|number, fecha1: string|number, fecha2: string|number, fecha3: string|number, fecha4: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/municipal/${fecha1}/${fecha2}/${id1}/${id2}/${fecha3}/${fecha4}`);
}


reporteGeneralCentroSalud(id1: string|number,id2: string|number, fecha1: string|number, fecha2: string|number, fecha3: string|number, fecha4: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/centro_salud/${fecha1}/${fecha2}/${id1}/${id2}/${fecha3}/${fecha4}`);
}




// REPORTES EN PDF POR ESTADOS Y ESTATUS //


reporteGeneralPorEstatus( equipo: string|number , estatu_equipo_id: string|number , fecha1: string|number, fecha2: string|number, fecha3: string|number, fecha4: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/general/estatus/${equipo}/${estatu_equipo_id}/${fecha1}/${fecha2}/${fecha3}/${fecha4}`);
}



reporteGeneralEstadalPorEstatus( equipo: string|number ,estado_id: string|number, estatu_equipo_id: string|number , fecha1: string|number, fecha2: string|number, fecha3: string|number, fecha4: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/estadal/estatus/${equipo}/${estado_id}/${estatu_equipo_id}/${fecha1}/${fecha2}/${fecha3}/${fecha4}`);
}


reporteGeneralMunicipalPorEstatus(equipo: string|number, municipio_id: string|number, estatu_equipo_id: string|number, fecha1: string|number, fecha2: string|number, fecha3: string|number, fecha4: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/municipal/estatus/${equipo}/${municipio_id}/${estatu_equipo_id}/${fecha1}/${fecha2}/${fecha3}/${fecha4}`);
}


reporteGeneralCentroSaludPorEstatus(equipo: string|number, centro_salud_id: string|number, estatu_equipo_id: string|number, fecha1: string|number, fecha2: string|number, fecha3: string|number, fecha4: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/centro_salud/estatus/${equipo}/${centro_salud_id}/${estatu_equipo_id}/${fecha1}/${fecha2}/${fecha3}/${fecha4}`);
}






// REPORTES EN PDF POR ESTADOS Y REPARADOS //

reporteGeneralEstadalPorReparado(equipo: string|number, estado_id: string|number, reparado: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/estadal/reparado/${equipo}/${estado_id}/${reparado}/${fecha1}/${fecha2}`);
}


reporteGeneralMunicipalPorReparado(equipo: string|number, municipio_id: string|number, reparado: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/municipal/reparado/${equipo}/${municipio_id}/${reparado}/${fecha1}/${fecha2}`);
}


reporteGeneralCentroSaludPorReparado(equipo: string|number,centro_salud_id: string|number, reparado: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/centro_salud/reparado/${equipo}/${centro_salud_id}/${reparado}/${fecha1}/${fecha2}`);
}



// REPORTES EN P //



reporteGeneralBusquedaPorEquipos(equipo: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/buscar_equipo/${equipo}/${fecha1}/${fecha2}`);
}

reporteGeneralBusquedaPorEquiposEstados(equipo: string|number, estado_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/buscar_equipo/estados/${equipo}/${estado_id}/${fecha1}/${fecha2}`);
}

reporteGeneralBusquedaPorEquiposMunicipios(equipo: string|number, municipio_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/buscar_equipo/municipios/${equipo}/${municipio_id}/${fecha1}/${fecha2}`);
}

reporteGeneralBusquedaPorEquiposCentroSalud(equipo: string|number, centro_salud_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/buscar_equipo/centro_salud/${equipo}/${centro_salud_id}/${fecha1}/${fecha2}`);
}








// REPORTES GLOBALES GENERAL // 

reporteGeneralGlobal(fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/general/global/${fecha1}/${fecha2}`);
}

reporteGeneralGlobalEstadal(estado_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/estadal/global/${estado_id}/${fecha1}/${fecha2}`);
}

reporteGeneralGlobalMunicipal(municipio_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/municipal/global/${municipio_id}/${fecha1}/${fecha2}`);
}

reporteGeneralGlobalCentroSalud(centro_salud_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/centro_salud/global/${centro_salud_id}/${fecha1}/${fecha2}`);
}




// REPORTES GLOBALES COndicion // 

reporteGeneralReparadoGlobal(fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/condicion/general/global/${fecha1}/${fecha2}`);
}

reporteGeneralReparadoGlobalEstadal(estado_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/condicion/estadal/global/${estado_id}/${fecha1}/${fecha2}`);
}

reporteReparadoGlobalMunicipal(municipio_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/condicion/municipal/global/${municipio_id}/${fecha1}/${fecha2}`);
}

reporteReparadoGlobalCentroSalud(centro_salud_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/condicion/centro_salud/global/${centro_salud_id}/${fecha1}/${fecha2}`);
}





// REPORTES GLOBALES POR EQUIPOS // 

reporteEquiposGlobal( equipo: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/equipos/general/global/${equipo}/${fecha1}/${fecha2}`);
}

reporteEquiposGlobalEstadal(equipo: string|number, estado_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/equipos/estadal/global/${equipo}/${estado_id}/${fecha1}/${fecha2}`);
}

reporteEquiposGlobalMunicipal(equipo: string|number, municipio_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/equipos/municipal/global/${equipo}/${municipio_id}/${fecha1}/${fecha2}`);
}

reporteEquiposGlobalGlobalCentroSalud(equipo: string|number, centro_salud_id: string|number, fecha1: string|number, fecha2: string|number) {
  return this.http.get(`${API_URI}/inventario/reportes/equipos/centro_salud/global/${equipo}/${centro_salud_id}/${fecha1}/${fecha2}`);
}










}
