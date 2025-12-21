export interface IMetric {
    id:              string;
    title:           string;
    value:           number;
    currencysymbol?: string;
    trend?:          Trend;
    icon:            string;
    iconColor:       string;
}

export interface Trend {
    percentage: number;
    period:     string;
}
