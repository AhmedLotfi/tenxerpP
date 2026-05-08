import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-stat-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stat">
      <div class="stat__value display-number">
        @if (prefix()) {
          <span class="stat__prefix">{{ prefix() }}</span>
        }
        <span>{{ formatted() }}</span>
        @if (suffix()) {
          <span class="stat__suffix">{{ suffix() }}</span>
        }
      </div>
      <div class="stat__label">{{ label() }}</div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .stat {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 8px 0;
      }
      .stat__value {
        font-size: clamp(2.6rem, 4vw, 3.6rem);
        color: var(--color-navy);
        display: inline-flex;
        align-items: baseline;
        gap: 2px;
      }
      .stat__prefix,
      .stat__suffix {
        font-size: 0.7em;
        color: var(--color-amber);
        font-weight: 700;
      }
      .stat__label {
        font-family: var(--font-mono);
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-muted);
      }
    `,
  ],
})
export class StatCounterComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly value = input.required<number>();
  readonly label = input.required<string>();
  readonly prefix = input<string>('');
  readonly suffix = input<string>('');
  readonly decimals = input<number>(0);
  readonly duration = input<number>(1600);

  private readonly current = signal<number>(0);
  private observer?: IntersectionObserver;
  private rafId?: number;

  readonly formatted = computed(() => {
    const v = this.current();
    if (this.decimals() > 0) {
      return v.toFixed(this.decimals());
    }
    if (v >= 1000) {
      return Math.round(v).toLocaleString('en-US');
    }
    return Math.round(v).toString();
  });

  ngAfterViewInit(): void {
    const el = this.host.nativeElement;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      this.current.set(this.value());
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.run();
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private run(): void {
    const target = this.value();
    const dur = this.duration();
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      this.current.set(target * eased);
      if (t < 1) {
        this.rafId = requestAnimationFrame(tick);
      } else {
        this.current.set(target);
      }
    };

    this.rafId = requestAnimationFrame(tick);
  }
}
