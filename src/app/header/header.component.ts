
import {Component, EventEmitter, Input, OnInit,Output} from '@angular/core';
import {ActivatedRoute } from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})




  
export class HeaderComponent implements OnInit{
  @Output() searchClicked: EventEmitter<any> = new EventEmitter<any>();
  public searchFormGroup : FormGroup | undefined;

  constructor(private route: ActivatedRoute,private fb: FormBuilder) {}
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
    if(this.currentRoute==='etudiants'){
      this.searchFormGroup=this.fb.group({
        keyword : this.fb.control("")
      });
      // @ts-ignore
      this.onChercherClick(event);
    }
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
