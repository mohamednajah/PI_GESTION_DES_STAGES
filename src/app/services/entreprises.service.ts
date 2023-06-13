import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { entreprise } from '../models/entreprise';

@Injectable({
  providedIn: 'root'
})
export class EntreprisesService {
  backend:String="http://localhost:8082";
  constructor(private http:HttpClient) { }

  getEntreprises():Observable<any> {
    return this.http.get(this.backend+ "/entreprises");
  }
  getNbrPartenaires():Observable<any>{
    return this.http.get(this.backend+"/indicators");
  }
  Addentreprise(entreprise:entreprise):Observable<entreprise>{
    return this.http.post<entreprise>(this.backend+"/entreprise",entreprise);
  }
  public searchentreprise(keyword : string):Observable<Array<entreprise>>{
    return this.http.get<Array<entreprise>>(this.backend+"/entreprises/search?keyword="+keyword)
  }
  
}

