import { Injectable } from '@angular/core';
import { themeQuartz, colorSchemeDark, Theme } from 'ag-grid-community';

@Injectable({ providedIn: 'root' })

export class ThemeService {
  private isDark: boolean = false;

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    this.isDark = savedTheme === 'true';
    this.applyHtmlClass();
  }

  getTheme(): Theme {
    return this.isDark ? themeQuartz.withPart(colorSchemeDark) : themeQuartz;
  }

  isDarkMode(): boolean {
    return this.isDark;
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'true' : 'false');
    this.applyHtmlClass();
  }

  applyHtmlClass(): void {
    const element = document.querySelector('html');
    if (!element) return;

    if (this.isDark) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }
}
