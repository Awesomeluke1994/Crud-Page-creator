import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {takeUntil} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() public dataSource$: Observable<any[]>;
  @Input() public tableConfig: ICrudTableConfig<any>;
  public displayedColumns: (keyof any)[];
  public matDataSource: MatTableDataSource<any>;
  private destroyed$ = new Subject<void>();


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

  }

  public ngOnInit(): void {
    this.displayedColumns = this.tableConfig.displayedColumns.concat(['actions']);
    this.matDataSource = new MatTableDataSource<any>();
    this.dataSource$.pipe(takeUntil(this.destroyed$)).subscribe(value => {
      this.matDataSource.data = value;
      this.matDataSource.paginator = this.paginator;
      this.matDataSource.sort = this.sort;
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  public ngAfterViewInit(): void {
    // this.sort.sortChange.pipe(takeUntil(this.destroyed$)).subscribe(() => this.paginator.pageIndex = 0);
  }
}

export interface ICrudTableConfig<DataType> {
  displayedColumns: Array<keyof DataType>;
  columnHeaders: Map<keyof DataType, string>;
  onEdit?: (entity: DataType) => void;
  onDelete?: (entity: DataType) => void;
}
