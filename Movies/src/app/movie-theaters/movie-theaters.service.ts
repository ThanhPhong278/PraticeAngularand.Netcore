import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { movieTheatersCreationDTO, movieTheatersDTO } from './movie-theaters.model';

@Injectable({
  providedIn: 'root'
})
export class MovieTheatersService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/movieTheaters';

  create(movieTheatersDTO: movieTheatersCreationDTO){
    return this.http.post(this.apiURL, movieTheatersDTO);
  }

  get(page: number, recordsPerPage: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<movieTheatersDTO[]>(this.apiURL, {observe: 'response', params});
  }

  getById(id: number): Observable<movieTheatersDTO>{
    return this.http.get<movieTheatersDTO>(`${this.apiURL}/${id}`);
  }

  edit(id: number, movieTheaterDTO:movieTheatersCreationDTO){
    return this.http.put(`${this.apiURL}/${id}`,movieTheaterDTO);
  }

  delete(id: number){
    return this.http.delete(`${this.apiURL}/${id}`)
  }
}
