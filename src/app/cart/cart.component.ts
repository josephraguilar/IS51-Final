import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IBike {
  id: number;
  image: any;
  description: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  nameParams = '';
  bikes: Array<IBike>;
  firstName: string;
  lasName: string;
  fullName: string;

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const savedData = JSON.parse(localStorage.getItem('bikes'));
    if (savedData && savedData.length > 0) {
      this.bikes = savedData;
    } else {
      this.bikes = await this.loadDataFromFile();
    }
  }

  async loadDataFromFile() {
    const inventory = await this.http.get('assets/inventory.json').toPromise();
    return inventory.json();
  }

  addBike1() {
    this.bikes.unshift({
      "id": 1,
      "image": "../../assets/bike1.jpeg",
      "description": "Bike Model 1",
      "price": 5000,
      "quantity": 1
    })
  }

  addBike2() {
    this.bikes.unshift({
      "id": 2,
      "image": "../../assets/bike2.jpeg",
      "description": "Bike Model 2",
      "price": 4000,
      "quantity": 2
    })
  }

  addBike3() {
    this.bikes.unshift({
      "id": 3,
      "image": "../../assets/bike3.jpeg",
      "description": "Bike Model 3",
      "price": 3000,
      "quantity": 3
    })
  }

  removeBike(index: number) {
    this.bikes.splice(index, 1);
    this.saveToLocalStorage('bikes', this.bikes)
  }

  saveToLocalStorage(key: string, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  compute() {
    if (this.nameParams == null || this.nameParams === '') {
      this.toastService.showToast('warning', 2000, 'Name must be defined')
    } else if (this.nameParams.indexOf(', ') === -1) {
      this.toastService.showToast('warning', 2000, 'Name must have a comma - space!')
    } else {
      this.toastService.showToast('success', 2000, 'Success!')
      let firstName, lastName, fullName, indexOfComma, subTotal, total, tax;
      indexOfComma = this.nameParams.indexOf(', ');
      firstName = this.nameParams.slice(indexOfComma + 1, this.nameParams.length);
      lastName = this.nameParams.slice(0, indexOfComma);
      fullName = firstName + ' ' + lastName;
      console.log(fullName);

      subTotal = 0;
      for ( let i = 0; i < this.bikes.length; i++) {
        subTotal += this.bikes[i].price * this.bikes[i].quantity;
      }
      total = subTotal + subTotal * .15;
      tax = subTotal * .15;

      this.router.navigate(['invoice', {
        subTotal: subTotal,
        total: total,
        fullName: fullName,
        tax: tax
      }
      ]
      );

    }
  }



}
