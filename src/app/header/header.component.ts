import { Component,Input, OnInit } from '@angular/core';
import {  EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() searchFormSubmitted = new EventEmitter<FormGroup>();
  searchForm!: FormGroup;
 
  constructor(private fb:FormBuilder){
   
  }
  ngOnInit(): void {
    
  }



  
  // @ts-ignore
  @Input() buttonName: string;
  // @ts-ignore
  @Input() showFormField:boolean=true;
  @Input() showAnneeUniv:boolean=true;
  @Input() showtypestage:boolean=true;
  @Input() showfiliere:boolean=true;

}
