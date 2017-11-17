import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';

import * as firebase from 'firebase/app';// import for image upload
import { FirebaseApp } from 'angularfire2'; // import for image upload

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})

export class ImageuploadComponent implements OnInit {
  fileData: File;

  @Input()
  count: number = 0;
  inProgress: number = 0;
  progress: number = 0;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  constructor(public authService: AuthService, private firebaseApp: FirebaseApp) { }
  onFileChanged(event) {
    this.fileData = event.srcElement.files[0];
  }

  uploadImage() {
    if (this.fileData) {
      var uploadTask = this.firebaseApp.storage().ref("upload").child("" + this.fileData.name + "").put(this.fileData);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress
          
          this.inProgress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
          console.log('Upload is ' + Math.round(this.inProgress) + '% done');

          this.progress  = Math.round(this.inProgress);
          this.change.emit(this.progress);
        },
        function () {
          // Handle unsuccessful uploads
          console.log("Upload unsuccessful");
        },
        function () {
          // Handle successful uploads on complete
          console.log("Upload completed successfully");
        });
        
      //this.authService.upload(this.fileData);
    } else {
      console.error("No file data");
    }
  }
  ngOnInit() {
  }

}
