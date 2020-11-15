import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudTableComponent } from './crud-table/crud-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CrudFormDialogComponent } from './crud-form-dialog/crud-form-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { CrudPageComponent } from './crud-page/crud-page.component';



@NgModule({
  declarations: [CrudTableComponent, CrudFormDialogComponent, CrudPageComponent],
  exports: [
    CrudTableComponent,
    CrudPageComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class ComponentsModule { }
