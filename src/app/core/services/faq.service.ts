import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Faq } from '../models/faq.model';

@Injectable({ providedIn: 'root' })
export class FaqService {
  private readonly http = inject(HttpClient);

  list(): Observable<Faq[]> {
    return this.http.get<Faq[]>('/api/faqs');
  }
}
