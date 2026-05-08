import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Meta } from '@angular/platform-browser';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, UiButtonComponent],
  template: `
    <section class="section nf">
      <div class="container-x nf__inner">
        <span class="nf__code">404</span>
        <h1 class="nf__h1">{{ 'notFound.title' | translate }}</h1>
        <p class="lead nf__sub">{{ 'notFound.subtitle' | translate }}</p>
        <ui-button link="/" variant="primary" size="lg" icon="arrow-right">
          {{ 'notFound.home' | translate }}
        </ui-button>
      </div>
    </section>
  `,
  styles: [
    `
      .nf {
        padding-block: clamp(96px, 12vw, 160px);
      }
      .nf__inner {
        max-width: 560px;
        text-align: center;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 18px;
        align-items: center;
      }
      .nf__code {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: clamp(6rem, 16vw, 10rem);
        line-height: 1;
        letter-spacing: -0.04em;
        background: linear-gradient(180deg, var(--color-amber) 0%, var(--color-amber-2) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .nf__h1 {
        margin-top: 8px;
        max-width: 520px;
      }
      .nf__sub {
        max-width: 480px;
      }
    `,
  ],
})
export class NotFoundComponent implements OnInit {
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }
}
