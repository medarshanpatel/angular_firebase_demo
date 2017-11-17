import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../auth.service';
import { NgModel } from '@angular/forms';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})


export class ItemComponent implements OnInit {
  loggedInUser: firebase.User;
  items: FirebaseListObservable<any>;
  userItemsRef: firebase.database.Reference;
  constructor(private db: AngularFireDatabase, public authService: AuthService) { }

  /**
   * 
   * @Add New Items
   */
  addItem(newName: string) {
    if (this.userItemsRef && newName) {
      this.userItemsRef.push({
        text: newName,
        isCompleted: false
      });
    } else {
      console.log("Something wrong");
    }
  }
  
  /**
   * 
   * @Update items
   */
  updateItem(key: string, newText) {
    if (newText === true) {
      this.items.update(key, { isCompleted: false });
    }
    else {
      this.items.update(key, { isCompleted: true });
    }
  }

  /**
   * 
   * @subscribe
   */
  ngOnInit() {
    this.authService.user.subscribe(
      user => {
        this.loggedInUser = user;
        
        
        if (user) {
          this.userItemsRef = this.db.database.ref('useritems').child(user.uid).child('items');
          this.items = this.db.list(
            this.userItemsRef,
            {
              preserveSnapshot: true,
              query: {
                orderByChild: "text"
              }
            }
          );
        } else {
          this.userItemsRef = null;
          this.items = null;
        }
      },
      function (e) {
        console.log('onError: %s', e);
      },
      function () {
        console.log('onCompleted');
      }
    );
  }

}