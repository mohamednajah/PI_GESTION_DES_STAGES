import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashbordComponent} from "./dashbord/dashbord.component";
import {RapportsComponent} from "./rapports/rapports.component";
import {EtudiantsComponent} from "./etudiants/etudiants.component";
import { EntreprisesComponent } from './entreprises/entreprises.component';
const routes: Routes = [
  {path:"",redirectTo:"dashbord",pathMatch:"full"},
  {path:"dashbord",component:DashbordComponent},
  {path:"rapports",component:RapportsComponent},
  {path:"etudiants",component:EtudiantsComponent},
  {path:"entreprises",component:EntreprisesComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }