import * as firebase from 'firebase';

export class AuthService {
  token: string;

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
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
}
