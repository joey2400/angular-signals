import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() data$: Observable<User[]>;
  @Output() rowClick: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[] = ['firstname', 'lastname', 'age'];

  onRowClick(id: string) {
    this.rowClick.emit(id);
  }
}
