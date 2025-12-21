import { Component, inject } from '@angular/core';
import { MetricsStore } from '../../../core/state/metrics-store';
import { MetricsCard } from '../metrics-card/metrics-card';
import { MetricsCardDetails } from '../metrics-card-details/metrics-card-details';

@Component({
  selector: 'app-metrics-container',
  imports: [MetricsCard, MetricsCardDetails],
  templateUrl: './metrics-container.html',
  styles: ``,
})
export class MetricsContainer {

  public store = inject(MetricsStore)

  constructor(){
    this.store.getMetrics();
  }

}
