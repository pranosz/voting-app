import { Injectable } from "@angular/core";
import { Voter } from "../models/voter.model";
import { Candidate } from "../models/candidate.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root'})

export class VotingService {   
    
    private voters: Voter[] = [
        {
            name: 'Zofia',
            hasVoted: false
          },
          {
            name: 'Robert',
            hasVoted: false
          },
          {
            name: 'Ola',
            hasVoted: false
          }
    ];
    private candidates: Candidate[] = [
        {
            name: 'Superman',
            votes: 0
          },
          {
            name: 'Batman',
            votes: 0
          }
    ];

    private voters$ = new BehaviorSubject<Voter[]>(this.voters);
    private candidates$ = new BehaviorSubject<Candidate[]>(this.candidates);

    constructor(){}

    getVoters(): Observable<Voter[]> {
        return this.voters$;
    }

    getCandidates(): Observable<Candidate[]> {
        return this.candidates$;
    }

    addOrUpdateVoter(voter: Voter): void {
       const fVoters = this.voters.find(v => v.name === voter.name);

       if (fVoters) {
        fVoters.hasVoted = voter.hasVoted;
       } else {
        this.voters.push(voter);
        this.voters$.next([...this.voters]);
       }
    }

    addOrUpdateCandidate(candidate: Candidate): void {
        const fCandidate = this.candidates.find(v => v.name === candidate.name);
        
        if (fCandidate) {
          fCandidate.votes = candidate.votes;
        } else {
          this.candidates.push(candidate);
          this.candidates$.next([...this.candidates]);
        }
    }

}