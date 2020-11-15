import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ICrudTableConfig} from '../crud-table/crud-table.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.scss']
})
export class CrudPageComponent implements OnInit {

  @Input() crudPageConfig: ICrudPageConfig<any>;

  constructor() {
  }

  ngOnInit(): void {
  }

  public add(): void {
    this.crudPageConfig.onCreate();
  }
}

export interface ICrudPageConfig<DataType> {
  dataSource: Observable<DataType[]>;
  tableConfig: ICrudTableConfig<DataType>;
  onCreate: () => void;
}
