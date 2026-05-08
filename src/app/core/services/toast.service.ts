import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();
  private nextId = 1;

  show(type: Toast['type'], message: string, ttl = 4000): void {
    const id = this.nextId++;
    this._toasts.update((curr) => [...curr, { id, type, message }]);
    setTimeout(() => this.dismiss(id), ttl);
  }

  success(message: string): void {
    this.show('success', message);
  }
  error(message: string): void {
    this.show('error', message);
  }
  info(message: string): void {
    this.show('info', message);
  }

  dismiss(id: number): void {
    this._toasts.update((curr) => curr.filter((t) => t.id !== id));
  }
}
