import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {etudiants} from "../models/etudiant";

@Injectable({
  providedIn: 'root'
})
export class EtudiantsService {
  private apiUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

  getEtudiants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/Etudiants");
  }
  // @ts-ignore
public addEtudiant(etudiant:etudiants):Observable<etudiants>{
  return this.http.post<etudiants>(this.apiUrl+"/Etudiants",etudiant);

  }
}
