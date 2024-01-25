import { Component, OnInit, NgModule } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rate-change',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rate-change.component.html',
  styleUrl: './rate-change.component.css'
})


export class RateChangeComponent implements OnInit {
  exchangeRateData: any;
  baseCurrency: string = 'USD';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    // this.getCurrencyExchangeRate();
  }

  // getCurrencyExchangeRate(): void {
  //   this.currencyService.getExchangeRate(this.baseCurrency).subscribe(data => {
  //     this.exchangeRateData = data;
  //     // Puedes realizar lógica adicional aquí según tus necesidades
  //   });
  // }

  changeBaseCurrency(newBaseCurrency: string): void {
    this.baseCurrency = newBaseCurrency;
    // this.getCurrencyExchangeRate();
  }
}
