import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {catchError, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EntreprisesService} from "../services/entreprises.service";
import {DashbordService} from "../services/dashbord.service";
import {SuiviStagesService} from "../services/suivi-stages.service";

@Component({
  selector: 'app-suivi-stages',
  templateUrl: './suivi-stages.component.html',
  styleUrls: ['./suivi-stages.component.css']
})
export class SuiviStagesComponent implements OnInit {
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent | undefined;

  obtenusStage!:number;
  embauches!:number;
  displayedColumns: string[] = ['code_apogee', 'nom', 'prenom', 'date_debut', 'date_fin','ville','embauche'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data_!:Observable<any>;
  constructor(private entrepriseService:EntreprisesService,private suiviStagesService: SuiviStagesService,private formbuilder:FormBuilder){}
  ngOnInit(): void {
    this.suiviStagesService.getSuiviStages().subscribe(data=>{
      this.obtenusStage=data["obtenusStage"];
      console.log(this.obtenusStage)

    });
    this.suiviStagesService.getSuiviStages().subscribe(data=>{
      this.embauches=data["embauches"];

    })

    this.suiviStagesService.getSuiviStages().subscribe(data=>{
      this.data_=data["getAll"];

    })

  }





  convertToCSV(data: any[]): string {
    const headers = ['code_apogee', 'nom', 'prenom', 'date_debut', 'date_fin','ville','embauche?'];
    const rows = data.map(suivi => [
      suivi.code_apogee,
      suivi.nom,
      suivi.prenom,
      suivi.date_debut,
      suivi.date_fin,
      suivi.ville,
      suivi.embauche ? 'Oui' : 'Non'
    ]);
    const csvData = [headers, ...rows].map(row => row.join(',')).join('\n');
    return csvData;
  }

  exportToCSV() {
    this.suiviStagesService.getSuiviStages().subscribe((data) => {
      const csvData = this.convertToCSV(data["getAll"]);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const downloadLink = document.createElement('a');
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'suivi.csv';
      downloadLink.click();
      URL.revokeObjectURL(url);
    });
  }



  handleSearchStages(){
    // @ts-ignore
    let kw = this.headerComponent.searchFormGroup?.value.keyword;
    let data = this.suiviStagesService.getSuiviSearch(kw);
    // @ts-ignore
    this.data_= data["result"];
    // @ts-ignore
    console.log(data["result"]);
  }

}
