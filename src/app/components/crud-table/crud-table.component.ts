import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent implements OnInit {

  @Input() public dataSource: Observable<any[]>;
  @Input() public tableConfig: ICrudTableConfig<any>;
  public displayedColumns: (keyof any)[];

  constructor() { }

  public ngOnInit(): void {
    this.displayedColumns = this.tableConfig.displayedColumns.concat(['actions']);
  }

}

export interface ICrudTableConfig<DataType> {
  displayedColumns: Array<keyof DataType>;
  columnHeaders: Map<keyof DataType, string>;
  onEdit?: (entity: DataType) => void;
  onDelete?: (entity: DataType) => void;
}
