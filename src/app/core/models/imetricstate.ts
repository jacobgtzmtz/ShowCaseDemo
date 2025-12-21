import { IMetric } from "./imetric";

export interface IMetricState {
    metrics: IMetric[];
    currentMetric: IMetric | null;
    loading: boolean;
    error: boolean;
}