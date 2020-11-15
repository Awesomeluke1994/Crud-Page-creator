import {AfterContentChecked, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-crud-form-modal',
  templateUrl: './crud-form-dialog.component.html',
  styleUrls: ['./crud-form-dialog.component.scss']
})
export class CrudFormDialogComponent implements OnInit {

  public FormTypes = FormTypes;
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CrudFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: ICrudDialogConfig<any>) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({});
    this.config.formField.forEach(field => {
      this.formGroup.addControl(field.dataSelector.toString(), field.formControl);
    });
  }

  public getError(formControl: FormControl): string {
    for (const errorKey of this.config.fieldErrorMessagesByErrorKey.keys()) {
      if (formControl.hasError(errorKey)) {
        return this.config.fieldErrorMessagesByErrorKey.get(errorKey);
      }
    }
  }

  public confirm(): void {
    this.dialogRef.close(this.config.data);
  }
}

export interface ICrudDialogConfig<DataType> {
  title: string;
  formField: IFormField<DataType> [];
  data: DataType;
  fieldErrorMessagesByErrorKey?: Map<string, string>;
}

export interface IFormField<DataType> {
  formType: FormTypes;
  label: string;
  dataSelector: keyof DataType;
  required?: boolean;
  formControl: FormControl;
  placeholder?: string;
}

export enum FormTypes {
  text
}
