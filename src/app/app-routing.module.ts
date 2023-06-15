import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashbordComponent} from "./dashbord/dashbord.component";
import {RapportsComponent} from "./rapports/rapports.component";
import {EtudiantsComponent} from "./etudiants/etudiants.component";
import { EntreprisesComponent } from './entreprises/entreprises.component';
import {AuthComponent} from "./auth/auth.component";

import {SuiviStagesComponent} from "./suivi-stages/suivi-stages.component";
const routes: Routes = [
  {path:"",redirectTo:"auth",pathMatch:"full"},
  {path:"dashbord",component:DashbordComponent},
  {path:"rapports",component:RapportsComponent},
  {path:"etudiants",component:EtudiantsComponent},
  {path:"entreprises",component:EntreprisesComponent},
  {path:"auth",component:AuthComponent}
  {path:"suivi",component:SuiviStagesComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
