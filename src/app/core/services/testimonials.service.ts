import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Testimonial } from '../models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  private readonly http = inject(HttpClient);

  list(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>('/api/testimonials');
  }
}
