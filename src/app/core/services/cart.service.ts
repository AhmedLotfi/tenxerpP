import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CheckoutPayload } from '../models/cart.model';
import { Solution } from '../models/solution.model';

const STORAGE_KEY = 'tenxerp.cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);

  private readonly _items = signal<CartItem[]>(this.read());
  readonly items = this._items.asReadonly();

  readonly count = computed(() => this._items().reduce((sum, i) => sum + i.seats, 0));

  readonly subtotal = computed(() =>
    this._items().reduce((sum, i) => sum + i.solution.pricePerSeat * i.seats, 0),
  );

  readonly discount = computed(() => {
    const len = this._items().length;
    if (len >= 5) return Math.round(this.subtotal() * 0.2);
    if (len >= 3) return Math.round(this.subtotal() * 0.12);
    return 0;
  });

  readonly total = computed(() => this.subtotal() - this.discount());

  has(solutionId: number): boolean {
    return this._items().some((i) => i.solution.id === solutionId);
  }

  add(solution: Solution, seats = 5): void {
    const existing = this._items().find((i) => i.solution.id === solution.id);
    if (existing) {
      this.update(solution.id, existing.seats + seats);
    } else {
      this._items.update((curr) => [...curr, { solution, seats }]);
      this.persist();
    }
  }

  remove(solutionId: number): void {
    this._items.update((curr) => curr.filter((i) => i.solution.id !== solutionId));
    this.persist();
  }

  update(solutionId: number, seats: number): void {
    if (seats <= 0) {
      this.remove(solutionId);
      return;
    }
    this._items.update((curr) => curr.map((i) => (i.solution.id === solutionId ? { ...i, seats } : i)));
    this.persist();
  }

  clear(): void {
    this._items.set([]);
    this.persist();
  }

  checkout(payload: Omit<CheckoutPayload, 'items'>): Observable<{ ok: boolean; quoteId: string }> {
    const full: CheckoutPayload = {
      ...payload,
      items: this._items().map((i) => ({ solutionId: i.solution.id, seats: i.seats })),
    };
    return this.http.post<{ ok: boolean; quoteId: string }>('/api/cart/checkout', full);
  }

  private persist(): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items()));
  }

  private read(): CartItem[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}
