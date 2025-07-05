import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { RouterOutlet } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { Popover } from 'primeng/popover';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../core/services/theme-service';

@Component({
  selector: 'app-layout',
  imports: [
    DrawerModule, ButtonModule, CommonModule, FormsModule,
    RouterOutlet, ToastModule, RippleModule, Popover,
    ToolbarModule, MenuModule, DividerModule, ToggleButtonModule],
  templateUrl: './layout.html',
})

export class Layout {
  constructor(private themeService: ThemeService) { }

  visible: boolean = true;
  items: MenuItem[] | undefined;
  isMobile: boolean = false;
  onVisible() {
    this.visible = !this.visible;
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnInit() {

    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
    this.items = [
      {
        label: 'Fənnlər',
        icon: 'pi pi-book',
        routerLink: ['/subject'],
      },
      {
        label: 'Şagirdlər',
        icon: 'pi pi-address-book',
        routerLink: ['/student'],
      },
      {
        label: 'İmtahanlar',
        icon: 'pi pi-file-edit',
        routerLink: ['/'],
      },
    ];
  }

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }
}
