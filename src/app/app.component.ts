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
  installmentMultiplier: number;
  stateMultiplier: number = 0.95;
  finalAmount: number;
  isSubmitted: boolean = false;

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

  increaseInsVal() {
    if (this.insurance.value.amount < 10000) {
      this.insurance.value.amount++;
    }
  }
  decreaseInsVal() {
    if (this.insurance.value.amount > 100) {
      this.insurance.value.amount--;
    }
  }

  update() {
    if (
      this.insurance.controls['amount'].value !== this.insurance.value.amount
    ) {
      this.insurance
        .get('amount')
        .setValue(this.insurance.value.amount, { emitEvent: false });
    }
    return this.insurance.value.amount;
  }

  displayInSpan() {
    let helper = String(this.insurance.value.amount);
    if (
      this.insurance.value.amount >= 1000 &&
      this.insurance.value.amount !== 10000
    ) {
      return helper.slice(0, 1) + ' ' + helper.slice(1);
    }
    if (this.insurance.value.amount === 10000) {
      return helper.slice(0, 2) + ' ' + helper.slice(2);
    }
    return helper;
  }

  postData() {
    this.isSubmitted = true;
    const insValue: number = this.insurance.value.amount;

    if (insValue <= 1000) {
      this.premiumAmount = 20;
    } else if (insValue > 1000 && insValue <= 3000) {
      this.premiumAmount = 70;
    } else if (insValue > 3000 && insValue <= 6000) {
      this.premiumAmount = 130;
    } else if (insValue > 6000 && insValue <= 9000) {
      this.premiumAmount = 180;
    } else if (insValue > 9000 && insValue <= 10000) {
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
