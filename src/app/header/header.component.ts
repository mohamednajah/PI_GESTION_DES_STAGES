import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // @ts-ignore
  @Input() buttonName: string;
  // @ts-ignore
  @Input() showFormField:boolean=true;
  @Input() showAnneeUniv:boolean=true;
  @Input() showtypestage:boolean=true;
  @Input() showfiliere:boolean=true;

}
