import { Component, OnInit } from '@angular/core';
import { VotingService } from '../services/voting.service';
import { Candidate } from '../models/candidate.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {

  dataSource$: Observable<Candidate[]> = this.votingService.getCandidates();
  displayedColumns = ['name','votes'];

  constructor(
    private votingService: VotingService,
    public dialog: MatDialog) { }

  onAddCandidate(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: '', votes: 0},
    });
  
    dialogRef.afterClosed().subscribe(candidateName => {
      if (candidateName) {
        this.votingService.addOrUpdateCandidate({name: candidateName, votes: 0});
      }
    });

  }

}
