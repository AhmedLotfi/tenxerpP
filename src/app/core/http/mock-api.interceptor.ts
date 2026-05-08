import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { MOCK_SOLUTIONS } from './mock-data/solutions.mock';
import { MOCK_TESTIMONIALS } from './mock-data/testimonials.mock';
import { MOCK_TEAM } from './mock-data/team.mock';
import { MOCK_FAQS } from './mock-data/faqs.mock';
import { MOCK_CLIENTS } from './mock-data/clients.mock';
import { MOCK_STATS } from './mock-data/stats.mock';

const ok = <T>(body: T, ms = 320): Observable<HttpEvent<T>> =>
  of(new HttpResponse<T>({ status: 200, body })).pipe(delay(ms));

const err = (status: number, message: string, ms = 200): Observable<never> => {
  return throwError(() => ({ status, error: { message } })).pipe(delay(ms)) as Observable<never>;
};

export const mockApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (!environment.useMockApi) return next(req);

  const url = req.url.replace(environment.apiBaseUrl, '');
  const method = req.method.toUpperCase();

  if (url === '/api/solutions' && method === 'GET') {
    return ok(MOCK_SOLUTIONS, 280);
  }

  const solutionMatch = url.match(/^\/api\/solutions\/(\d+)$/);
  if (solutionMatch && method === 'GET') {
    const id = Number(solutionMatch[1]);
    const solution = MOCK_SOLUTIONS.find((s) => s.id === id);
    return solution ? ok(solution, 220) : err(404, 'Solution not found');
  }

  if (url === '/api/testimonials' && method === 'GET') return ok(MOCK_TESTIMONIALS, 320);
  if (url === '/api/team' && method === 'GET') return ok(MOCK_TEAM, 280);
  if (url === '/api/faqs' && method === 'GET') return ok(MOCK_FAQS, 240);
  if (url === '/api/clients' && method === 'GET') return ok(MOCK_CLIENTS, 200);
  if (url === '/api/stats' && method === 'GET') return ok(MOCK_STATS, 320);

  if (url === '/api/contact' && method === 'POST') {
    const body = req.body as { email?: string; honeypot?: string } | undefined;
    if (body?.honeypot) return err(400, 'Spam detected');
    if (!body?.email) return err(400, 'Email is required');
    return ok({ ok: true, ticketId: 'tn-' + Date.now() }, 700);
  }

  if (url === '/api/newsletter' && method === 'POST') {
    return ok({ ok: true }, 480);
  }

  if (url === '/api/cart/checkout' && method === 'POST') {
    return ok({ ok: true, quoteId: 'q-' + Date.now() }, 800);
  }

  return next(req);
};
