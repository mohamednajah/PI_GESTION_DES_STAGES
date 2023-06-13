import { Component, OnInit, ViewChild } from '@angular/core';
import { EntreprisesService } from '../services/entreprises.service';
import {NgFor} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { HeaderComponent } from '../header/header.component';


export interface PeriodicElement {
  nomEntreprise: string;
  type: string;
  activite: string;
  partenaire: string;
}

@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css'],
})

export class EntreprisesComponent implements OnInit {
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent | undefined;

  nbrEntreprises!:number;
  nbrPartenaires!:number;
  displayedColumns: string[] = ['nomEntreprise', 'type', 'activite', 'partenaire'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data!:Observable<any>;
  myForm!:FormGroup;
  showForm:boolean=false;
  constructor(private entrepriseService:EntreprisesService,private formbuilder:FormBuilder,private snackBar: MatSnackBar){
    this.myForm = this.formbuilder.group({
      nomEntreprise: this.formbuilder.control(""),
      type: this.formbuilder.control(""),
      activite: this.formbuilder.control(""),
      partenaire: this.formbuilder.control("")
    });
  }
  ngOnInit(): void {
    this.getnumbentreprises();
    this.getnumbPartenaires();
    this.getentreprises();
  }

  getnumbentreprises(){
    this.entrepriseService.getEntreprises().subscribe(data=>{
      this.nbrEntreprises=data.length;
    })
  }
  getnumbPartenaires(){
    this.entrepriseService.getNbrPartenaires().subscribe(data=>{
      this.nbrPartenaires=data['Entreprises_partenaires'].length;
   
    })
  }
  getentreprises(){
    this.entrepriseService.getEntreprises().subscribe(data=>{
      this.data=data;
    })
  }
 
 
  

  convertToCSV(data: any[]): string {
    const headers = ['Nom Entreprise', 'Type', 'Activité', 'Partenaire'];
    const rows = data.map(entreprise => [
      entreprise.nomEntreprise,
      entreprise.type,
      entreprise.activite,
      entreprise.partenaire ? 'Oui' : 'Non'
    ]);
    const csvData = [headers, ...rows].map(row => row.join(',')).join('\n');
    return csvData;
  }
  
  exportToCSV() {
    this.entrepriseService.getEntreprises().subscribe((entreprises: any[]) => {
      const csvData = this.convertToCSV(entreprises);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const downloadLink = document.createElement('a');
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'entreprise.csv';
      downloadLink.click();
      URL.revokeObjectURL(url);
    });
  }
  
  
  
  
  onSubmit(){
    const formData = this.myForm.value;
     this.entrepriseService.Addentreprise(formData).subscribe(
      response => {
        // Handle the successful response from the server
        console.log('Data successfully added to the database:', response);
        this.snackBar.open('L\'entreprise a été ajoutée avec succès', 'Fermer', {
          duration: 3000 // Duration in milliseconds for which the pop-up will be displayed
        });
        this.getentreprises();
      },
      error => {
        // Handle any errors that occurred during the request
        console.error('Error adding data to the database:', error);
      }
    );
  }
  
  handleSearchEtudiants(){
    // @ts-ignore
    let kw = this.headerComponent.searchFormGroup?.value.keyword;
    this.data=this.entrepriseService.searchentreprise(kw).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
    console.log(this.data);
  }

}
