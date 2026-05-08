import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Solution } from '../models/solution.model';

@Injectable({ providedIn: 'root' })
export class SolutionsService {
  private readonly http = inject(HttpClient);

  list(): Observable<Solution[]> {
    return this.http.get<Solution[]>('/api/solutions');
  }

  byId(id: number): Observable<Solution> {
    return this.http.get<Solution>(`/api/solutions/${id}`);
  }
}
