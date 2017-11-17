import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MdDialogModule, MdMenuModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdSidenavModule, MdProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'firebase/storage'; // import for image upload

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ItemComponent } from './item/item.component';

import { AuthService } from './auth.service';
import ActivateGuard from './activate-guard';

@NgModule({
  imports: [
    BrowserModule,
    MdSidenavModule,
    MdButtonModule,
    MdProgressBarModule,
    MdDialogModule,
    MdInputModule,
    MdCheckboxModule,
    MdMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    RouterModule.forRoot([
      { path: '', redirectTo: '/signin', pathMatch: 'full' },
      { path: 'imageupload', component: ImageuploadComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'items', component: ItemComponent},
    ])
  ],
  providers: [AuthService],
  declarations: [AppComponent, ImageuploadComponent, SigninComponent, SignupComponent, ItemComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }