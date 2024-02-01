import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../service/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ContactService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      subject: ["", [Validators.required]],
      body: ["", [Validators.required]]
    });
  }


  createFormData(): any {
    const formData = new FormData();

    Object.entries(this.contactForm.value).forEach(([key, value]: any) => {
      formData.append(key, value);
    });

    return formData;
  }

  createMessage() {
    let formData = this.createFormData();
    this.service.sendMessage(formData).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.router.navigate(['products']);
      },
      (error) => {
        console.error('Server error:', error);
        this.toastr.error('An error occurred while sending the message.');
      }
    );
  }


}
