import {Component, EventEmitter, Input, OnInit,Output} from '@angular/core';
import {ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() searchClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute) {}
  // @ts-ignore
  @Input() buttonName: string;
  // @ts-ignore
  @Input() showFormField:boolean=true;
  @Input() showAnneeUniv:boolean=true;
  @Input() showtypestage:boolean=true;
  @Input() showfiliere:boolean=true;
  // @ts-ignore
  currentRoute: string
  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      this.currentRoute = urlSegments[0].path;
      console.log("currentRoute: "+this.currentRoute);
    });
  }

  onChercherClick(event: Event){
    event.preventDefault();
    if (this.currentRoute === 'etudiants') {
      this.searchClicked.emit();
      //todo for others
    } else if (this.currentRoute === 'route2') {
    } else if (this.currentRoute === 'route3') {
    } else {
      // handling for other routes
    }
  }
}
