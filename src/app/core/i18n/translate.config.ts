import { HttpClient } from '@angular/common/http';
import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslationObject } from '@ngx-translate/core';
import { Observable, catchError, of } from 'rxjs';

class JsonHttpLoader implements TranslateLoader {
  constructor(private readonly http: HttpClient) {}

  getTranslation(lang: string): Observable<TranslationObject> {
    return this.http
      .get<TranslationObject>(`/i18n/${lang}.json`)
      .pipe(catchError(() => of({} as TranslationObject)));
  }
}

export function httpLoaderFactory(http: HttpClient): TranslateLoader {
  return new JsonHttpLoader(http);
}

export function provideTranslate(): EnvironmentProviders {
  return importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  );
}
