import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { SingleCandidateComponent } from './components/single-candidate/single-candidate.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { SharedModule } from '../shared/shared.module';
import { CandidatesService } from './services/candidates.service';

@NgModule({
  declarations: [SingleCandidateComponent, CandidateListComponent],
  imports: [
    CommonModule,
    ReactiveStateRoutingModule,
    SharedModule
  ],
  providers: [CandidatesService]
})
export class ReactiveStateModule {}
