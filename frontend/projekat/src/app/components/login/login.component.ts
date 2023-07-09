import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

  }
  ngOnInit(): void {
    
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.getRawValue()).subscribe((response) => {
      console.log(response);
      localStorage.setItem('token', response.access_token);
      this.router.navigate(['accommodations']);      
    });
    
    
  }
}
