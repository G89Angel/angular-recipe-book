import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  constructor(private authService: AuthService) {
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBQ4DR0rs_TV8wDfuBagwAVKEYwugW5ajI',
      authDomain: 'ng-recipe-book-21151.firebaseapp.com'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(
            (token: string) => this.authService.token = token
        );
      }
    });
  }
}
