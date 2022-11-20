import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubSink } from 'subsink/dist/subsink';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private subs = new SubSink();

  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('userToken', '');
    localStorage.setItem('userData', '');
  }

  onSubmit() {
    console.log('seb', this.loginForm.value);
    this.loginService.getToken(this.loginForm.value).subscribe(
      (data: any) => {
        Swal.fire({
          title: 'User Valid',
          text: data.data.Login.message,
          icon: 'success',
        });
        console.log('set', this.loginForm.value);
        let userData = data.data.Login.user.usertype;
        let userToken = data.data.Login.token;
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('userData', JSON.stringify(userData));
      },
      (err) => {
        Swal.fire({
          title: 'Invalid User',
          text: err.message,
          icon: 'error',
        });
      }
    );
    this.loginForm.reset();
  }
}
