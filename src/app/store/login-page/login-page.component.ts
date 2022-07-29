import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;

  canSubmit: boolean = false;
  loading: boolean = false;

  constructor(private authService:AuthenticationService, private formBuilder: FormBuilder,private router: Router) { 
    this.authService.isAuthenticated.subscribe((isAuthenticated)=>{
      if(isAuthenticated){
        this.router.navigate(["/home"]);
      }
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.authService.setCsrfCookie().subscribe(() => {
      this.canSubmit = true;
    });
  }

  ngOnInit(): void {}
  
  login(data:any){
    this.loading = true;
    
    this.authService.login(data.email,data.password)
    .pipe(finalize(()=>{this.loading = false;})).subscribe();
  }

}
