import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { IMetricState } from "../models/imetricstate";
import { inject } from "@angular/core";
import { MetricsService } from "../services/metrics-service";


const initialState: IMetricState = {
    metrics: [],
    currentMetric: null,
    loading: true,
    error: false
}

export const MetricsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, metricsService = inject(MetricsService)) => ({
        getMetrics: () => {
            metricsService.getMetrics().subscribe(metrics => {
                patchState(store, {metrics: metrics, loading:false, error:false})
            })
        },

        selectMetric: (id: string) => {
            patchState(store, {
                currentMetric: store.metrics().find(metric => metric.id === id) ?? null
            })
        }
    }))

);


