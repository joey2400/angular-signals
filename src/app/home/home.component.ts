import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserDetailsComponent } from '../shared/user-details/user-details.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../core/user.interface';
import { UserService } from '../core/user.service';
import { TableComponent } from '../shared/table/table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, UserDetailsComponent, TableComponent, MatFormFieldModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  users: User[];
  users$: Observable<User[]>;
  currentUser$: Observable<User>;

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.users$;
    this.currentUser$ = this.users$.pipe(
      map(users => users[0])
    );
  }

  showTaskDetail(uid: string) {
    this.currentUser$ = this.userService.get(uid);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddModal);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


@Component({
  selector: 'add-modal',
  templateUrl: './add-modal.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class AddModal {
  constructor(private fb: FormBuilder, private userService: UserService) { }
  userForm: FormGroup;
  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      age: new FormControl(null),
    });
  }

  addUser() {
    this.userService.create(this.userForm.value);
  }
}
