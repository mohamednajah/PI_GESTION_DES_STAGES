import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {
   backend:String="http://localhost:8082";
  constructor(private http:HttpClient) { }

  public getIndicators():Observable<any> {
    return this.http.get<any>(this.backend+"/indicators");

  }

}
