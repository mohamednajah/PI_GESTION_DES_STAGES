import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private currentRouteSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setCurrentRoute(route: string) {
    this.currentRouteSubject.next(route);
  }

  getCurrentRoute(): Observable<string> {
    return this.currentRouteSubject.asObservable();
  }
}
