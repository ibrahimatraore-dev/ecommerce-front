import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: false,
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html'
})
export class UsersComponent {
  registerForm: FormGroup;
  success = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.registerForm.valid) {
      console.log('Payload envoyé :', this.registerForm.value); // DEBUG
      this.userService.register(this.registerForm.value).subscribe(() => {
        this.success = true;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      });
    }
  }
}
