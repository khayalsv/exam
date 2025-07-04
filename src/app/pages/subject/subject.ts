import { Component } from '@angular/core';
import { Subject } from '../../core/models/Subject';
import { SubjectService } from '../../core/services/subject-service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ColDef, themeQuartz } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { DeleteButtonRendererComponent } from '../../components/delete-button/delete-button';

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

  colDefs: ColDef[] = [
    {
      headerName: 'Əməliyyat',
      field: 'actions',
      cellRenderer: DeleteButtonRendererComponent,
      cellRendererParams: {
        onDelete: (data: Subject) => this.onDeleteSubject(data)
      },
      width: 100,
      suppressMovable: true
    },
    { field: 'code', headerName: 'Fənn Kodu' },
    { field: 'name', headerName: 'Fənn Adı' },
    { field: 'schoolClass', headerName: 'Sinif' },
    { field: 'teacherFirstName', headerName: 'Müəllimin Adı' },
    { field: 'teacherLastName', headerName: 'Müəllimin Soyadı' }
  ];

  onDeleteSubject(subject: Subject) {
    this.subjects = this.subjects.filter(s => s !== subject);
  }
}
