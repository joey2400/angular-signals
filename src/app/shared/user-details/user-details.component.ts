import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/core/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, pluck, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/core/user.interface';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input() userDetail$: Observable<User>;
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      age: new FormControl(null),
    });
  }

  updateUser(id: string) {
    this.userService.update(id, this.userForm.value);
  }
}
