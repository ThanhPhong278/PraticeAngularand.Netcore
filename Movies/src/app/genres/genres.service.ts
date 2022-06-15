import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { genreCreationDTO, genreDTO } from './genres.model';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/genres'

  getAll(page: number, recordsPerPage: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<genreDTO[]>(this.apiURL, {observe: 'response', params});
  }

  getById(id: number): Observable<genreDTO>{
    return this.http.get<genreDTO>(`${this.apiURL}/${id}`);
  }

  create(genre: genreCreationDTO){
    return this.http.post(this.apiURL, genre);
  }

  edit(id: number, genre: genreCreationDTO){
    return this.http.put(`${this.apiURL}/${id}`, genre);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
