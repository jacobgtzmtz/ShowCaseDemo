import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable } from 'rxjs';
import { IMetric } from '../models/imetric';
import { handleError } from '../utils/http-error.handler';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {

  private http = inject(HttpClient);
  private metricsEndPoint = `${environment.APIURL}metrics`;

  getMetrics(): Observable<IMetric[]> {
    return this.http.get<IMetric[]>(this.metricsEndPoint).pipe(
      catchError(err => {
        console.log(err);
        return handleError(err);
      })
    );
  }
  
}
