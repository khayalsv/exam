import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeQuartz } from 'ag-grid-community';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-exam',
  imports: [ButtonModule, ToggleButtonModule, DividerModule, ButtonModule, AgGridAngular,
    CardModule, CommonModule, InputTextModule, ReactiveFormsModule, FormsModule, MenubarModule
  ],
  templateUrl: './exam.html',
  styleUrl: './exam.css'
})
export class Exam {
  protected title = 'app';

  theme = themeQuartz;

  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];

  colDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ];

  isDarkMode: boolean = false;

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    const element = document.querySelector('html');
    if (element) {
      if (theme === 'true') {
        element.classList.add('dark');
        this.isDarkMode = true;
      } else {
        this.isDarkMode = false;
      }
    }
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('dark');
      localStorage.setItem('theme', element.classList.contains('dark') ? 'true' : 'false');
    }
  }

}
