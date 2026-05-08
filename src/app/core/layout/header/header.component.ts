import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LangService } from '../../i18n/lang.service';
import { IconComponent } from '../../../shared/icon/icon.component';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, TranslatePipe, IconComponent, UiButtonComponent],
  template: `
    <header class="hdr" [class.is-scrolled]="scrolled()" [class.is-open]="menuOpen()">
      <div class="container-x hdr__inner">
        <a class="hdr__brand" routerLink="/" aria-label="TenxERP home">
          <img src="images/tenx-logo.png" alt="TenxERP" class="hdr__logo" width="124" height="42" />
        </a>

        <nav class="hdr__nav" [attr.aria-label]="'Primary'">
          <a class="hdr__link" routerLink="/" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="is-active"
            ><span class="underline-grow">{{ 'nav.home' | translate }}</span></a
          >
          <a class="hdr__link" routerLink="/about" routerLinkActive="is-active"
            ><span class="underline-grow">{{ 'nav.about' | translate }}</span></a
          >
          <a class="hdr__link" routerLink="/" fragment="solutions" [class.is-active]="false"
            ><span class="underline-grow">{{ 'nav.solutions' | translate }}</span></a
          >
          <a class="hdr__link" routerLink="/faqs" routerLinkActive="is-active"
            ><span class="underline-grow">{{ 'nav.faqs' | translate }}</span></a
          >
          <a class="hdr__link" routerLink="/contact" routerLinkActive="is-active"
            ><span class="underline-grow">{{ 'nav.contact' | translate }}</span></a
          >
        </nav>

        <div class="hdr__actions">
          <button class="hdr__icon-btn hdr__lang" (click)="toggleLang()" [attr.aria-label]="'lang.label' | translate">
            <app-icon name="globe" [size]="18" />
            <span class="hdr__lang-label">{{ 'lang.switchTo' | translate }}</span>
          </button>

          <ui-button class="hdr__cta" link="/contact" variant="primary" size="sm" icon="arrow-right">
            {{ 'nav.getStarted' | translate }}
          </ui-button>

          <button
            class="hdr__menu-btn"
            (click)="toggleMenu()"
            [attr.aria-label]="(menuOpen() ? 'nav.closeMenu' : 'nav.openMenu') | translate"
            [attr.aria-expanded]="menuOpen()"
          >
            @if (menuOpen()) {
              <app-icon name="x" [size]="22" />
            } @else {
              <app-icon name="menu" [size]="22" />
            }
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <nav class="hdr__drawer" aria-label="Mobile">
          <a class="hdr__drawer-link" routerLink="/" (click)="closeMenu()">{{ 'nav.home' | translate }}</a>
          <a class="hdr__drawer-link" routerLink="/about" (click)="closeMenu()">{{ 'nav.about' | translate }}</a>
          <a class="hdr__drawer-link" routerLink="/" fragment="solutions" (click)="closeMenu()">{{ 'nav.solutions' | translate }}</a>
          <a class="hdr__drawer-link" routerLink="/faqs" (click)="closeMenu()">{{ 'nav.faqs' | translate }}</a>
          <a class="hdr__drawer-link" routerLink="/contact" (click)="closeMenu()">{{ 'nav.contact' | translate }}</a>
          <button type="button" class="hdr__drawer-link" (click)="toggleLang(); closeMenu()">
            {{ 'lang.label' | translate }} — {{ 'lang.switchTo' | translate }}
          </button>
        </nav>
      }
    </header>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      .hdr {
        position: fixed;
        top: 0;
        inset-inline: 0;
        z-index: 90;
        height: var(--header-height);
        background: transparent;
        -webkit-backdrop-filter: saturate(140%) blur(0px);
        backdrop-filter: saturate(140%) blur(0px);
        border-bottom: 1px solid transparent;
        transition:
          background var(--duration-base) var(--ease-out),
          backdrop-filter var(--duration-base) var(--ease-out),
          border-color var(--duration-base) var(--ease-out),
          box-shadow var(--duration-base) var(--ease-out);
      }
      .hdr.is-scrolled {
        background: rgba(255, 255, 255, 0.94);
        -webkit-backdrop-filter: saturate(140%) blur(14px);
        backdrop-filter: saturate(140%) blur(14px);
        border-bottom-color: var(--color-border);
        box-shadow: var(--shadow-xs);
      }
      /* Initial (top of page, dark hero behind): white text */
      .hdr:not(.is-scrolled) .hdr__link {
        color: rgba(255, 255, 255, 0.9);
      }
      .hdr:not(.is-scrolled) .hdr__link:hover,
      .hdr:not(.is-scrolled) .hdr__link.is-active {
        color: #ffffff;
      }
      .hdr:not(.is-scrolled) .hdr__icon-btn {
        color: #ffffff;
      }
      .hdr:not(.is-scrolled) .hdr__icon-btn:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .hdr:not(.is-scrolled) .hdr__menu-btn {
        color: #ffffff;
      }
      .hdr:not(.is-scrolled) .hdr__logo {
        filter: brightness(0) invert(1);
      }
      .hdr__inner {
        height: 100%;
        display: flex;
        align-items: center;
        gap: 32px;
      }
      .hdr__brand {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
        height: 42px;
      }
      .hdr__logo {
        height: 42px;
        width: auto;
        object-fit: contain;
        display: block;
      }

      .hdr__nav {
        display: flex;
        align-items: center;
        gap: 28px;
        flex: 1;
        justify-content: center;
      }
      .hdr__link {
        font-family: var(--font-display);
        font-size: 15px;
        font-weight: 500;
        letter-spacing: -0.01em;
        color: var(--color-text-soft);
        transition: color var(--duration-base) var(--ease-out);
        padding-block: 4px;
      }
      .hdr__link:hover {
        color: var(--color-navy);
      }
      .hdr__link.is-active {
        color: var(--color-navy);
        font-weight: 600;
      }
      .hdr__link.is-active .underline-grow::after {
        transform: scaleX(1);
      }

      .hdr__actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      .hdr__icon-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 40px;
        height: 40px;
        color: var(--color-navy);
        border-radius: var(--radius-md);
        transition: background var(--duration-base) var(--ease-out);
      }
      .hdr__icon-btn:hover {
        background: var(--color-navy-soft);
      }
      .hdr__lang {
        width: auto;
        padding-inline: 12px;
        font-size: 13px;
        font-weight: 500;
      }
      .hdr__lang-label {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.05em;
      }
      .hdr__cart-badge {
        position: absolute;
        top: 4px;
        inset-inline-end: 4px;
        background: var(--color-amber);
        color: var(--color-navy);
        font-size: 10px;
        font-weight: 700;
        min-width: 16px;
        height: 16px;
        padding: 0 4px;
        border-radius: 8px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .hdr__menu-btn {
        display: none;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        color: var(--color-navy);
        border-radius: var(--radius-md);
      }

      .hdr__drawer {
        position: absolute;
        top: var(--header-height);
        inset-inline: 0;
        background: white;
        border-bottom: 1px solid var(--color-border);
        padding: 16px;
        display: flex;
        flex-direction: column;
        animation: hdr-drawer-in var(--duration-base) var(--ease-out);
      }
      .hdr__drawer-link {
        padding: 16px 12px;
        font-family: var(--font-display);
        font-size: 17px;
        font-weight: 600;
        letter-spacing: -0.015em;
        color: var(--color-navy);
        border-bottom: 1px solid var(--color-border);
        text-align: start;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .hdr__drawer-link:last-child {
        border-bottom: none;
      }
      .hdr__drawer-badge {
        background: var(--color-amber);
        color: var(--color-navy);
        font-size: 11px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 10px;
      }

      @keyframes hdr-drawer-in {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }

      @media (max-width: 960px) {
        .hdr__nav,
        .hdr__lang-label {
          display: none;
        }
        .hdr__cta {
          display: none;
        }
        .hdr__menu-btn {
          display: inline-flex;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  private readonly langService = inject(LangService);

  protected readonly scrolled = signal<boolean>(false);
  protected readonly menuOpen = signal<boolean>(false);

  @HostListener('window:scroll')
  onScroll(): void {
    if (typeof window === 'undefined') return;
    this.scrolled.set(window.scrollY > 16);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleLang(): void {
    this.langService.toggle();
  }
}
