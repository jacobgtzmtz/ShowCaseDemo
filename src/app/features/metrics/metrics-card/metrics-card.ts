import { Component, inject, input } from '@angular/core';
import { IMetric } from '../../../core/models/imetric';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MetricsStore } from '../../../core/state/metrics-store';


@Component({
  selector: 'app-metrics-card',
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule, CurrencyPipe],
  templateUrl: './metrics-card.html',
  styles: [`
    .metric-card {
      height: 200px;
    }

    .metric-value{
      font-size: 2.2rem;
      font-weight: 600;
      text-align: center;
    }
  `],
})
export class MetricsCard {
  metric = input<IMetric>();

  private store = inject(MetricsStore);


  /**
   * selectMetric
   */
  public selectMetric() {
    this.store.selectMetric(this.metric()!.id);
  }

}
