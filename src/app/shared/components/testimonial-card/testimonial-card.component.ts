import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Testimonial } from '../../../core/models/testimonial.model';

const AVATAR_PALETTE = [
  ['#25255C', '#FFFFFF'],
  ['#ED1C3A', '#FFFFFF'],
  ['#077765', '#FFFFFF'],
  ['#0B163F', '#F5C6CD'],
  ['#1D1D4A', '#FFD4B5'],
  ['#3A3A78', '#FFFFFF'],
];

@Component({
  selector: 'app-testimonial-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="testimonial">
      <span class="testimonial__quote-mark" aria-hidden="true">"</span>
      <blockquote class="testimonial__quote">{{ testimonial().quote }}</blockquote>
      <figcaption class="testimonial__caption">
        <span
          class="testimonial__avatar"
          [style.background]="palette()[0]"
          [style.color]="palette()[1]"
          aria-hidden="true"
        >
          {{ initials() }}
        </span>
        <div>
          <div class="testimonial__author">{{ testimonial().author }}</div>
          <div class="testimonial__role">
            {{ testimonial().role }} · {{ testimonial().company }}
          </div>
        </div>
      </figcaption>
    </figure>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .testimonial {
        position: relative;
        padding: 36px 32px 32px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        transition:
          transform var(--duration-base) var(--ease-out),
          box-shadow var(--duration-base) var(--ease-out);
      }
      .testimonial:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-md);
      }
      .testimonial__quote-mark {
        position: absolute;
        top: 8px;
        inset-inline-start: 22px;
        font-family: var(--font-display);
        font-size: 96px;
        line-height: 1;
        color: var(--color-amber);
        font-weight: 700;
        pointer-events: none;
      }
      .testimonial__quote {
        font-family: var(--font-display);
        font-size: 1.05rem;
        line-height: 1.55;
        color: var(--color-text);
        margin: 0;
        font-weight: 500;
        letter-spacing: -0.01em;
        flex: 1;
        position: relative;
        z-index: 1;
        padding-top: 8px;
      }
      .testimonial__caption {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0;
        padding-top: 18px;
        border-top: 1px solid var(--color-border);
      }
      .testimonial__avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-display);
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.02em;
        flex-shrink: 0;
      }
      .testimonial__author {
        font-weight: 600;
        color: var(--color-navy);
        font-size: 14.5px;
      }
      .testimonial__role {
        font-size: 13px;
        color: var(--color-muted);
      }
    `,
  ],
})
export class TestimonialCardComponent {
  readonly testimonial = input.required<Testimonial>();

  readonly initials = computed(() => {
    const name = this.testimonial().author;
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
  });

  readonly palette = computed<readonly [string, string]>(() => {
    // Stable hash from id so each testimonial keeps the same palette across renders.
    const id = this.testimonial().id;
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
    const idx = Math.abs(hash) % AVATAR_PALETTE.length;
    return AVATAR_PALETTE[idx] as [string, string];
  });
}
