import { Component } from '@angular/core';
import { Subject } from '../../core/models/Subject';
import { SubjectService } from '../../core/services/subject-service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ColDef, themeQuartz } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-subject',
  imports: [CommonModule, CardModule, ButtonModule, Dialog, AgGridAngular],
  templateUrl: './subject.html',
})
export class SubjectComponent {
  subjects: Subject[] = [];
  visible: boolean = false;

  constructor(private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  onAddSubject() {
    this.visible = true;
  }

  theme = themeQuartz;

  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];

  colDefs: ColDef[] = [
    { field: 'code', headerName: 'Fənn Kodu' },
    { field: 'name', headerName: 'Fənn Adı' },
    { field: 'schoolClass', headerName: 'Sinif' },
    { field: 'teacherFirstName', headerName: 'Müəllimin Adı' },
    { field: 'teacherLastName', headerName: 'Müəllimin Soyadı' }
  ];
}
