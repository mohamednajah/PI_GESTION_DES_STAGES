import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../services/dashbord.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit{

  nombrePartenaires!: number;
  repartitionParVille!: any[];
  nombreStagesTotal!: number;
  preembauchees!: any;
  tauxConversion!: number;
  constructor(private dashbordService: DashbordService) {
  }
  ngOnInit(): void {
    this.getNombrePartenaires();
    this.getNombreStages();
    this.getPreembauche();

   
  }
  getNombrePartenaires() {
    this.dashbordService.getIndicators().subscribe(data => {
      this.nombrePartenaires = data['Entreprises_partenaires'].length;
    });
  }

    getNombreStages(){
      this.dashbordService.getIndicators().subscribe(data => {
        this.repartitionParVille = data['Repartition_par_ville'];
        this.calculateNombreStagesTotal();
      });
  }
  calculateNombreStagesTotal(){
    this.nombreStagesTotal = this.repartitionParVille.reduce((total, city) => total + city.nombre_stages, 0);
  }
  getPreembauche(){
    this.dashbordService.getIndicators().subscribe(data => {
      this.tauxConversion = data['Taux_conversion'];
    
    });
  }
  
}

