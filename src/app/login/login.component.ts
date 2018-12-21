import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  defaultUsername: string;
  defaultPassword: string;
  usernameInput: string;
  passwordInput: string;

  constructor(private router: Router, private toastService: ToastService) {
    this.defaultPassword = 'joseph123';
    this.defaultUsername = 'joseph';
    this.passwordInput = '';
    this.usernameInput = '';
  }

  ngOnInit() {

  }

  passCheck() {
    if (this.passwordInput === '' || this.usernameInput === '') {
      this.toastService.showToast('warning', 2000, 'Must fill in both fields!');
    } else if(this.defaultUsername === this.usernameInput && this.defaultPassword === this.passwordInput) {
      this.toastService.showToast('success', 2000, 'Success!');
      this.router.navigate(['cart']);
    } else {
      this.toastService.showToast('warning', 2000, 'incorrect username/password!');
    }

  }

}
