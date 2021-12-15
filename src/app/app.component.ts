import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  insurance: FormGroup;
  // Initial value
  premiumAmount: number = 130;
  // This is where validator kicks in
  installmentAmount: number;
  // Optional value - 0.95 is default
  stateMultiplier: number = 0.95;
  finalAmount: number;
  isSubmitted: boolean = false;

  ngOnInit() {
    this.insurance = new FormGroup({
      amount: new FormControl(5050, Validators.required),
      installment: new FormControl(this.installmentAmount, Validators.required),
      state: new FormControl(this.stateMultiplier),
    });
  }

  // Functions to call on arrow button clicks
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
      // This instruction prevents changing the insurance value
      // on radio button click when changed the insur. value with arrow btns earlier
      this.insurance
        .get('amount')
        .setValue(this.insurance.value.amount, { emitEvent: false });
    }
    return this.insurance.value.amount;
  }

  // Function to display insurance amount in a prettier way, for example:
  // 5050 -> 5 050
  // 10000 -> 10 000

  displayInSpan() {
    const helper = String(this.insurance.value.amount);
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

  // After clicking submit
  postData() {
    this.isSubmitted = true;

    if (!this.insurance.value.installment) return;

    this.installmentAmount = parseFloat(this.insurance.value.installment);
    this.stateMultiplier = parseFloat(this.insurance.value.state);

    const insuranceValue: number = this.insurance.value.amount;
    const installments: number = this.installmentAmount;
    let multiplier: number;

    if (insuranceValue <= 1000) {
      this.premiumAmount = 20;
    } else if (insuranceValue > 1000 && insuranceValue <= 3000) {
      this.premiumAmount = 70;
    } else if (insuranceValue > 3000 && insuranceValue <= 6000) {
      this.premiumAmount = 130;
    } else if (insuranceValue > 6000 && insuranceValue <= 9000) {
      this.premiumAmount = 180;
    } else if (insuranceValue > 9000 && insuranceValue <= 10000) {
      this.premiumAmount = 200;
    }

    switch (installments) {
      case 1:
        multiplier = 0.98;
        break;
      case 2:
        multiplier = 1;
        break;
      case 3:
        multiplier = 1;
        break;
      case 4:
        multiplier = 1.04;
        break;
    }

    const totalPremium = Math.ceil(
      this.premiumAmount * this.stateMultiplier * multiplier
    );

    this.finalAmount = parseFloat(
      (totalPremium / this.installmentAmount).toFixed(2)
    );

    //  Display all form values values if you want :)
    console.log('SKŁADKA PODSTAWOWA: ', this.premiumAmount);
    console.log('ILOŚĆ RAT: ', this.installmentAmount);
    console.log('MNOŻNIK RATY: ', multiplier);
    console.log('MNOŻNIK SZKODY: ', this.stateMultiplier);
    console.log('SKŁADKA CAŁKOWITA: ', totalPremium);
    console.log('RATA: ', this.finalAmount);
  }
}
