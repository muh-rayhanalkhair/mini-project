import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  token = new BehaviorSubject('');
  token$ = this.token.asObservable();

  constructor(private apollo: Apollo) {}

  getToken(loginForm: any) {
    const email = loginForm.email;
    const password = loginForm.password;
    return this.apollo.mutate({
      mutation: gql`
        mutation Login($email: String, $password: String) {
          Login(data: { email: $email, password: $password }) {
            token
            message
            user {
              usertype {
                name
                view
                slug
              }
            }
          }
        }
      `,
      variables: { email, password },
    });
  }
}