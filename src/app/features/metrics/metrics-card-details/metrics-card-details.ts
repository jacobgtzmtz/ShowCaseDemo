import { Component, inject } from '@angular/core';
import { MetricsStore } from '../../../core/state/metrics-store';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-metrics-card-details',
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule, CurrencyPipe],
  templateUrl: './metrics-card-details.html',
  styles: `
    .trend-up{
      color: green;
    }
    .trend-down{
      color: red;
    }
  `,
})
export class MetricsCardDetails {
public store = inject(MetricsStore);

}
