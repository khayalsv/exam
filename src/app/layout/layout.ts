import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { RouterOutlet } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [
    DrawerModule, ButtonModule, CommonModule, FormsModule,
    RouterOutlet, ToastModule, RippleModule,
    AvatarModule, StyleClassModule,
    ToolbarModule, MenuModule, DividerModule, ToggleButtonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})

export class Layout {
  visible: boolean = true;
  isDarkMode: boolean = false;
  items: MenuItem[] | undefined;

  onVisible() {
    this.visible = !this.visible;
  }
  ngOnInit() {

    this.items = [
      {
        label: 'About',
        icon: 'pi pi-address-book',
        routerLink: ['/'],
      },
      {
        label: 'To Do List',
        icon: 'pi pi-list',
        routerLink: ['/to-do-list'],
      },
      {
        label: 'Weather',
        icon: 'pi pi-cloud',
        routerLink: ['/weather'],
      },
      {
        label: 'Blog',
        icon: 'pi pi-pen-to-square',
        routerLink: ['/blog'],
      },
      {
        label: 'Map',
        icon: 'pi pi-map',
        routerLink: ['/map'],
      },
      {
        label: 'Chat',
        icon: 'pi pi-comment',
        routerLink: ['/chat'],
      },
      {
        label: 'Actions',
        icon: 'pi pi-file-edit',
        routerLink: ['/actions'],
      }
    ];
  }
}
