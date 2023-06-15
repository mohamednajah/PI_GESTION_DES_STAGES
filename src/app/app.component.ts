import {Component, OnInit} from '@angular/core';
import { RouteService } from '../app/services/route-service.service';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Frontend';
  isAuthRoute!: boolean;

  constructor(private routeService: RouteService,private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAuthRoute = this.router.url === '/auth';
      }
    });
  }
}
