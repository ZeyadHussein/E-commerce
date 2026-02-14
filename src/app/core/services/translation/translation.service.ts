import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translate = inject(TranslateService);


  setLanguage(lang: string = "en") {
    this.translate.use(lang);

    //defualt part
    this.translate.setFallbackLang(lang);

    localStorage.setItem('lang', lang);

    //change the direction 
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  }
  get currentLanguage(): string {
    return this.translate.getCurrentLang() || this.translate.getFallbackLang() || 'en';

  }

}
