import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';// import for image upload
import { FirebaseApp } from 'angularfire2'; // import for image upload

import { CanActivate } from '@angular/router';

@Injectable()
export class AuthService  {

  auth: any = {};

  user: Observable<firebase.User>;
  progress: number;

  constructor(private users: AngularFireAuth, private firebaseApp: FirebaseApp,private router: Router) {
    this.user = users.authState;
  }

  /**
   * 
   * @user Sign Up
   */
  signup(email: string, password: string) {
    this.users.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Successfully Register!');
      })
      .catch(error => {
        console.log('Error : ', error.message);
      });
  }

  /**
   * 
   * @upload file 
   */
  upload(file: File) {
    var uploadTask = this.firebaseApp.storage().ref("upload").child("" + file.name + "").put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress
        var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log('Upload is ' + Math.round(progress) + '% done');
      },
      function () {
        // Handle unsuccessful uploads
        console.log("Upload unsuccessful");
      },
      function () {
        // Handle successful uploads on complete
        console.log("Upload completed successfully");
      });
  }

  /**
   * 
   * @user Sign In
   */
  login(email: string, password: string) {
    this.users.auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Login Successfully!',);
        //this.router.navigate(['/items']);
        return true;
      })
      .catch(error => {
        console.log('Error :', error.message);
        return false;  
      });
  }

  /**
   * 
   * @user Logout
   */
  logout() {
    this.users.auth.signOut();
    console.log('Logout Successfully!');
  }

  /**
   * 
   * @redirect
   */
}