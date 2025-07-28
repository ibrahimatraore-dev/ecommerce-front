import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone:false,
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contactForm: FormGroup;
  success = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  submit() {
    if (this.contactForm.valid) {
      // Simuler envoi
      this.success = true;
      this.contactForm.reset();
    }
  }
}
