import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export default class ActivateGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
 
  canActivate() {
    console.log('i am checking to see if you are logged in');
    //this.router.navigate(['/items']);
    return true;
  }

  ngOnInit() {

  }
 
}