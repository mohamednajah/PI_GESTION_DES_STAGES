import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { etudiants } from '../models/etudiant';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { EtudiantsService } from '../services/etudiants.service';
import { HeaderComponent } from "../header/header.component";
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.css']
})
export class RapportsComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'prenom', 'codeApogee', 'email', 'actions'];
  dataSource!: MatTableDataSource<etudiants>;
  listetudiants!: any;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  constructor(private http: HttpClient, private etudiantservice: EtudiantsService) {}

  ngOnInit(): void {
    this.etudiantservice.getEtudiants().subscribe(
      (etudiants: any[]) => {
        this.listetudiants = etudiants;
        this.dataSource = new MatTableDataSource(this.listetudiants);
      },
      error => {
        console.error('Erreur lors de la récupération des étudiants:', error);
      }
    );
    this.handleSearchEtudiants();

  }

 

  handleSearchEtudiants() {
    if (this.headerComponent && this.headerComponent.searchFormGroup) {
      const kw = this.headerComponent.searchFormGroup.value.keyword;
      this.listetudiants = this.etudiantservice.searchEtudiant(kw);
      this.dataSource = new MatTableDataSource(this.listetudiants);
        catchError(err => {
          return throwError(err);
        })
      
    }
  }
}
