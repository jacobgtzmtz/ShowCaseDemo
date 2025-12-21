import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MetricsService } from './metrics-service';
import { IMetric } from '../models/imetric';

describe('MetricsService', () => {
  let service: MetricsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MetricsService]
    });
    service = TestBed.inject(MetricsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMetrics', () => {
    it('should return an array of metrics on successful GET', ()=> {
      const mockMetrics: IMetric[] = [
        {
          id: '1',
          title: '',
          value: 0,
          icon: '',
          iconColor: ''
        }
      ];

      service.getMetrics().subscribe(metrics => {
        expect(metrics).toEqual(mockMetrics);
      });

      const req = httpTestingController.expectOne(service['metricsEndPoint']);
      expect(req.request.method).toEqual('GET');
      req.flush(mockMetrics);
    })

  });







});
