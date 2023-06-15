import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuiviStagesService {

  backend:String="http://localhost:8082";
  constructor(private http:HttpClient) { }

  public getSuiviStages():Observable<any> {
    return this.http.get<any>(this.backend+"/suivi");

  }

  public getSuiviSearch(keyword : string):Observable<any> {
    return this.http.get<any>(this.backend+"/suiviSearch?keyword="+keyword);

  }
}
