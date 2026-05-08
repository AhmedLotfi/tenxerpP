import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactSubmission } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  send(payload: ContactSubmission & { honeypot?: string }): Observable<{ ok: boolean; ticketId: string }> {
    return this.http.post<{ ok: boolean; ticketId: string }>('/api/contact', payload);
  }

  subscribeNewsletter(email: string): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>('/api/newsletter', { email });
  }
}
