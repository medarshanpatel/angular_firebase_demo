import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  constructor(public authService: AuthService, private router: Router) { }
  login() {
    //this.authService.login(this.email, this.password);
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }
 
  ngOnInit() {
  }

}
