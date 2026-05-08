import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Stat } from '../models/stats.model';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private readonly http = inject(HttpClient);

  list(): Observable<Stat[]> {
    return this.http.get<Stat[]>('/api/stats');
  }
}
