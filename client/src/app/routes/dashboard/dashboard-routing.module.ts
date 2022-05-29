import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnAroundTimeComponent } from './turn-around-time/turn-around-time.component';
import { SamplesComponent } from './samples/samples.component';
import { PendingCasesComponent } from './pending-cases/pending-cases.component';
import { AssetdivComponent } from './assetdiv/assetdiv.component';
import { AnnualRepComponent } from './annual-rep/annual-rep.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'samples',
  },
  {
    path: 'samples',
    component: SamplesComponent,
  },
  { path: 'tat', component: TurnAroundTimeComponent },
  { path: 'pending-cases', component: PendingCasesComponent },
  { path: 'annual-rep', component: AnnualRepComponent },
  { path: 'assetdiv', component: AssetdivComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
