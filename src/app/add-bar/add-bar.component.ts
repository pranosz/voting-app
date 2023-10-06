import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-bar',
  templateUrl: './add-bar.component.html',
  styleUrls: ['./add-bar.component.scss']
})
export class AddBarComponent {

  @Input() title = '';
  @Output() addRecordEvent = new EventEmitter();

  constructor() { }

  onAddRecord(): void {
    this.addRecordEvent.emit();
  }

}
