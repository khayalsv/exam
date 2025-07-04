import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-delete-button-renderer',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <button
      pButton
      type="button"
      icon="pi pi-trash"
      class="p-button-rounded p-button-danger p-button-sm"
      (click)="onClick()"
      [style.width.px]="30"
      [style.height.px]="30">
    </button>
  `
})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onClick() {
    if (this.params?.onDelete) {
      this.params.onDelete(this.params.data);
    }
  }
}
