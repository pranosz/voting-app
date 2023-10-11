import { Component, OnInit } from '@angular/core';
import { Voter } from '../models/voter.model';
import { VotingService } from '../services/voting.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Unsubscribe } from '../services/unsubscribe';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent extends Unsubscribe implements OnInit {

  dataSource = new MatTableDataSource<Voter>();
  displayedColumns = ['name','hasVoted'];

  constructor(
    private votingService: VotingService,
    public dialog: MatDialog
    ) { 
      super();
    }

  ngOnInit(): void {
    this.votingService.getVoters().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => { this.dataSource.data = data },
      error: (err) => { console.log("Error caught at getVoters subscriber :" + err); }
    });
  }

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