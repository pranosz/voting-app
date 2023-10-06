import { Component } from '@angular/core';
import { Voter } from '../models/voter.model';
import { VotingService } from '../services/voting.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent {

  dataSource$: Observable<Voter[]> = this.votingService.getVoters();
  displayedColumns = ['name','hasVoted'];

  constructor(
    private votingService: VotingService,
    public dialog: MatDialog
    ) { }

  onAddVoter(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: '', hasVoted: false},
    });
  
    dialogRef.afterClosed().subscribe(voterName => {
      if (voterName) {
        this.votingService.addOrUpdateVoter({name: voterName, hasVoted: false});
      }
    });

  }

}