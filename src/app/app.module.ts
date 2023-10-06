import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { VotersComponent } from './voters/voters.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { VoteComponent } from './vote/vote.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { AddBarComponent } from './add-bar/add-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    VotersComponent,
    CandidatesComponent,
    VoteComponent,
    DialogComponent,
    AddBarComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
