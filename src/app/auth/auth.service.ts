import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
          this.router.navigate(['/']);
          this.getToken();
        })
        .catch((response) => {
          console.log(response);
        });
  }

  getToken() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((data) => {
          this.token = data;
        });
      }
    });
    return this.token;
  }

  isAuthenticated() {
    return this.token !== null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
