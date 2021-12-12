import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  insurance: FormGroup;
  premiumAmount: number = 130;
  installmentMultiplier: number | string = '';
  stateMultiplier: number | string = 0.95;
  finalAmount: number;

  ngOnInit() {
    this.insurance = new FormGroup({
      amount: new FormControl(5050, Validators.required),
      installment: new FormControl(
        this.installmentMultiplier,
        Validators.required
      ),
      state: new FormControl(this.stateMultiplier),
    });
  }

  postData() {
    if (this.insurance.value.amount <= 1000) {
      this.premiumAmount = 20;
    } else if (
      this.insurance.value.amount > 1000 &&
      this.insurance.value.amount <= 3000
    ) {
      this.premiumAmount = 70;
    } else if (
      this.insurance.value.amount > 3000 &&
      this.insurance.value.amount <= 6000
    ) {
      this.premiumAmount = 130;
    } else if (
      this.insurance.value.amount > 6000 &&
      this.insurance.value.amount <= 9000
    ) {
      this.premiumAmount = 180;
    } else if (
      this.insurance.value.amount > 9000 &&
      this.insurance.value.amount <= 10000
    ) {
      this.premiumAmount = 200;
    }

    this.installmentMultiplier = parseFloat(this.insurance.value.installment);
    this.stateMultiplier = parseFloat(this.insurance.value.state);

    console.log('SKŁADKA: ', this.premiumAmount);
    console.log('MNOŻNIK RATY: ', this.installmentMultiplier);
    console.log('MNOŻNIK SZKODY: ', this.stateMultiplier);

    this.finalAmount = Math.ceil(
      this.premiumAmount * this.stateMultiplier * this.installmentMultiplier
    );
    console.log(this.finalAmount);
  }
}
