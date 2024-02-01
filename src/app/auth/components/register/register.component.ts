import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


interface UserData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  fileName: string = ""
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required]],
      profile: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  openFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  selectProfileImage(event:any) {
    this.fileName = event.target.value
    this.registerForm.get('profile')?.setValue(event.target.files[0])
  }

  createAccount() {
    const { password, passwordConfirm, ...userData } = this.registerForm.value as UserData;

    if (password === passwordConfirm) {
      const formData = this.createFormData(this.registerForm.value);
      this.registerUser(formData);
    } else {
      this.handlePasswordMismatchError();
    }
  }

  createFormData(userData: UserData): FormData {
    const formData = new FormData();

    Object.entries(userData).forEach(([key, value]) => {
      if(key !== "passwordConfirm"){
        if(key == 'profile'){
          formData.append('image', value)
        }else{
          formData.append(key, value);
        }
      }
    });

    formData.append("role", "user");

    return formData;
  }

  registerUser(formData: FormData) {
    this.authService.register(formData).subscribe(
      (res: any) => {
        this.handleRegistrationSuccess(res);
        this.router.navigate(['products']);
      },
      (error) => {
        this.handleRegistrationError(error);
      }
    );
  }

  handleRegistrationSuccess(res: any) {
    this.toastr.success("Registration successful");
    localStorage.setItem('token', res.token);
  }

  handleRegistrationError(error: any) {
    this.toastr.error("Error", "Registration failed");
    console.error("Registration failed:", error);
  }

  handlePasswordMismatchError() {
    this.toastr.error("Error", "Password does not match");
  }
}
