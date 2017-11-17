import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { NgModel } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { ImageuploadComponent } from './imageupload/imageupload.component';


@Component({
  selector: 'app-root',
  templateUrl : './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  email: string;
  password: string;
  items: FirebaseListObservable<any>;
  loggedInUser: firebase.User;
  notLoggedInUser;
  userItemsRef: firebase.database.Reference;
  constructor(private db: AngularFireDatabase, public authService: AuthService, private router: Router, public dialog: MdDialog) {}
  
  /**
   * 
   * @open image uplaod dialog box
   */
  openDialog() {
    const dialogRef = this.dialog.open(ImageuploadComponent, {
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

 
  ngOnInit() {
    this.authService.user.subscribe(
      user => {
        if(user){
          this.loggedInUser = user;
          this.notLoggedInUser = null;
        }else{
          this.notLoggedInUser = "0";
        }
      },
      e => console.log('onError: %s', e),
      () => console.log('onCompleted')
    );
  }
}