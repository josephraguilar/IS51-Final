import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private router: Router, private toastService: ToastService) { }

  async ngOnInit() {
    
  
  }

  showAbout() {
    this.toastService.showToast('success', 2000, 'this application was developed by Joseph Aguilar. (C) 2018')
  };

  

}
