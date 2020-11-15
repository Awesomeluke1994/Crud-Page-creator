import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-crud-form-modal',
  templateUrl: './crud-form-dialog.component.html',
  styleUrls: ['./crud-form-dialog.component.scss']
})
export class CrudFormDialogComponent implements OnInit {

  public FormTypes = FormTypes;
  constructor(@Inject(MAT_DIALOG_DATA) public config: ICrudDialogConfig<any>) {
  }

  ngOnInit(): void {
  }

}

export interface ICrudDialogConfig<DataType> {
  title: string;
  formField: IFormField<DataType>[];
  data: DataType;
}

export interface IFormField<DataType> {
  formType: FormTypes;
  label: string;
  dataSelector: keyof DataType;
}

export enum FormTypes {
  text
}
