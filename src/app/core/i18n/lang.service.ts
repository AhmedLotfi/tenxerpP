import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

export type Lang = 'en' | 'ar';

const LANG_KEY = 'tenxerp.lang';

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  private readonly _lang = signal<Lang>(this.readLang());
  readonly lang = this._lang.asReadonly();

  init(): void {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setFallbackLang('en');
    this.apply(this._lang());
  }

  set(lang: Lang): void {
    this._lang.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LANG_KEY, lang);
    }
    this.apply(lang);
  }

  toggle(): void {
    this.set(this._lang() === 'en' ? 'ar' : 'en');
  }

  private apply(lang: Lang): void {
    this.translate.use(lang);
    const html = this.document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }

  private readLang(): Lang {
    if (typeof localStorage === 'undefined') return environment.defaultLang;
    const v = localStorage.getItem(LANG_KEY) as Lang | null;
    return v === 'en' || v === 'ar' ? v : environment.defaultLang;
  }
}
