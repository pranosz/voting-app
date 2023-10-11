import { Component, OnInit } from '@angular/core';
import { VotingService } from '../services/voting.service';
import { Candidate } from '../models/candidate.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from '../services/unsubscribe';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent extends Unsubscribe implements OnInit {

  dataSource = new MatTableDataSource<Candidate>();
  displayedColumns = ['name','votes'];

  constructor(
    private votingService: VotingService,
    public dialog: MatDialog) {
      super();
  }

  ngOnInit(): void {
    this.votingService.getCandidates().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => { this.dataSource.data = data },
      error: (err) => { console.log("Error caught at getCandidates subscriber :" + err) }
    });
  }

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
