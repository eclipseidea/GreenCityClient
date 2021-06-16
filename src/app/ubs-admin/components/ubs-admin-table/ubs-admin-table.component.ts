import { AdminTableService } from '../../services/admin-table.service';
import { CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-ubs-admin-table',
  templateUrl: './ubs-admin-table.component.html',
  styleUrls: ['./ubs-admin-table.component.scss']
})
export class UbsAdminTableComponent implements OnInit {
  columns: any[] = [];
  displayedColumns: string[] = [];
  orderInfo: string[] = [];
  customerInfo: string[] = [];
  orderDetails: string[] = [];
  sertificate: string[] = [];
  detailsOfExport: string[] = [];
  responsiblePerson: string[] = [];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  arrayOfHeaders: string[] = [];
  previousIndex: number;
  isLoading = true;
  destroy: Subject<boolean> = new Subject<boolean>();
  arrowDirection: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private adminTableService: AdminTableService) {}

  ngOnInit() {
    this.getTable();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setDisplayedColumns() {
    this.columns.forEach((colunm, index) => {
      colunm.index = index;
      this.displayedColumns[index] = colunm.field;
    });
  }

  dragStarted(event: CdkDragStart, index: number) {
    this.previousIndex = index;
  }

  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.columns, this.previousIndex, index);
      this.setDisplayedColumns();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.orderId + 1}`;
  }

  showAllColumns(): void {
    this.getTable();
  }

  changeColumns(field: string, i: number) {
    const beforeColumnsLength = this.columns.length;
    this.columns = this.columns.filter((el) => el.field !== field);
    const afterColumnsLength = this.columns.length;
    if (beforeColumnsLength === afterColumnsLength) {
      const newObjectForHeader = Object.create({});
      newObjectForHeader.field = field;
      newObjectForHeader.index = i;
      newObjectForHeader.field === 'orderid' || newObjectForHeader.field === 'order_status' || newObjectForHeader.field === 'order_date'
        ? (newObjectForHeader.sticky = true)
        : (newObjectForHeader.sticky = false);
      this.columns = [...this.columns.slice(0, i), newObjectForHeader, ...this.columns.slice(i, this.columns.length)];
      this.setDisplayedColumns();
    } else {
      this.setDisplayedColumns();
    }
  }

  getTable(columnName = 'orderid', sortingType = 'desc') {
    this.isLoading = true;
    this.adminTableService
      .getTable(columnName, sortingType)
      .pipe(takeUntil(this.destroy))
      .subscribe((item) => {
        const arrayOfValues = item;
        this.dataSource = new MatTableDataSource(arrayOfValues);
        const requiredColumns = [{ field: 'select', sticky: true }];
        const dynamicallyColumns = [];
        const arrayOfproperties = Object.keys(arrayOfValues[0]);
        arrayOfproperties.map((elem) => {
          const objectOfValue = Object.create({});
          objectOfValue.field = elem;
          objectOfValue.field === 'orderid' || objectOfValue.field === 'order_status' || objectOfValue.field === 'order_date'
            ? (objectOfValue.sticky = true)
            : (objectOfValue.sticky = false);
          dynamicallyColumns.push(objectOfValue);
        });
        this.columns = [].concat(requiredColumns, dynamicallyColumns);
        this.setDisplayedColumns();
        this.isLoading = false;
        this.arrayOfHeaders = dynamicallyColumns;
        this.orderInfo = dynamicallyColumns.slice(0, 3);
        this.customerInfo = dynamicallyColumns.slice(3, 10);
        this.orderDetails = dynamicallyColumns.slice(10, 18);
        this.sertificate = dynamicallyColumns.slice(18, 22);
        this.detailsOfExport = dynamicallyColumns.slice(22, 27);
        this.responsiblePerson = dynamicallyColumns.slice(27, 33);
      });
  }

  getSortingDate(columnName, sortingType) {
    this.arrowDirection === columnName ? (this.arrowDirection = null) : (this.arrowDirection = columnName);
    this.getTable(columnName, sortingType);
  }
}
