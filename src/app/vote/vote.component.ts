import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { VotingService } from '../services/voting.service';
import { Voter } from '../models/voter.model';
import { Candidate } from '../models/candidate.model';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {

  hasVoted$ = new BehaviorSubject<boolean>(true);
  voters$: Observable<Voter[]> = this.votingService.getVoters();
  candidates$: Observable<Candidate[]> = this.votingService.getCandidates();

  votesForm = this.fb.group({
    voter: new UntypedFormControl([], [Validators.required]),
    candidate: new UntypedFormControl([], [Validators.required])
  });

  constructor(
    private fb: UntypedFormBuilder,
    private votingService: VotingService
    ) { }

  onVoterChange(event: MatSelectChange): void {
    this.hasVoted$.next(event.value.hasVoted);
  }

  onSubmitVote(): void {
    this.updateVoterAndCandidateObject();

    const voter = this.votesForm.value.voter;
    const candidate = this.votesForm.value.candidate;

    this.votingService.addOrUpdateVoter(voter);
    this.votingService.addOrUpdateCandidate(candidate);
    
    this.hasVoted$.next(voter.hasVoted);
  }

  private updateVoterAndCandidateObject(): void {
    this.votesForm.value.voter.hasVoted = true;
    this.votesForm.value.candidate.votes += 1;
  }

}
