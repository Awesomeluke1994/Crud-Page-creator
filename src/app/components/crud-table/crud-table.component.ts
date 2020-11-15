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
  public displayedColumns: string[] = ['firstName', 'lastName', 'emailAddress', 'actions'];

  constructor() { }

  public ngOnInit(): void {
  }

}

export interface ICrudTableConfig<DataType> {
  displayedColumns: Array<keyof DataType>;
  columnHeaders: Map<keyof DataType, string>;
  onEdit?: (entity: DataType) => void;
  onDelete?: (entity: DataType) => void;
}
