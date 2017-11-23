import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private router: Router) {
  }

  private _token: string;

  set token(value: string) {
    this._token = value;
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
          this._token = data;
        });
      }
    });
    return this._token;
  }

  isAuthenticated() {
    return this._token != null;
  }

  logout() {
    firebase.auth().signOut();
    this._token = null;
    this.router.navigate(['/']);
  }
}
