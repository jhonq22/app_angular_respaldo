import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { API_URI } from '../interface';


export interface MultimediaInterface {

  id?: number;
  image?: string;
  nombre_img?: string;
 }


@Injectable({
  providedIn: 'root'
})
export class MultimediasService {


  constructor(private http: HttpClient) { }

  getMultimedias() {
    return this.http.get(`${API_URI}/multimedias`);
  }


  getMultimedia(id: string) {
    return this.http.get(`${API_URI}/multimedias/${id}`);
  }


  updateMultimedia(id: string|number, updatedMultimedia: MultimediaInterface): Observable<MultimediaInterface> {
    return this.http.put(`${API_URI}/multimedias/${id}`, updatedMultimedia);
  }


  deleteMultimedia(id: string|number) {
    return this.http.delete(`${API_URI}/multimedias/delete/${id}`);
  }



  // tslint:disable-next-line: adjacent-overload-signatures
  saveMultimedia(formData) {
    return this.http.post(`${API_URI}/multimedias/upload`, formData, {
      reportProgress: true,
      observe: 'events'
      });
    }










}
