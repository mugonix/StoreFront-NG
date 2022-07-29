import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit {

  user:User|null = null;

  constructor(private authService: AuthenticationService,private router: Router) { 
    authService.isAuthenticated.subscribe(()=>{
        this.user = authService.user;
    });
  }

  ngOnInit(): void {
  }

  logout(): void{
    this.authService.logout().subscribe(()=>{
      this.router.navigate(["/home"]);
    });
  }

}
