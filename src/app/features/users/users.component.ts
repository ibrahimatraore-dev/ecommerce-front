
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/users/user.service';
import { UserRegisterDTO } from 'src/app/core/models/users/user-register.model';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  form: FormGroup;
  success = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const user: UserRegisterDTO = this.form.value;

    this.userService.register(user).subscribe({
      next: () => {
        this.success = true;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = 'Inscription échouée. Vérifie les champs ou réessaie plus tard.';
      }
    });
  }
}