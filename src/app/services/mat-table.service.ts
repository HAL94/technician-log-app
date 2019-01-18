import { Injectable } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MatTableService {

  static pageSize = 10;
  static pageSizeOptions = [5, 10, 25, 100];

  private columns: string[] = ['actions', 'customerName', 'company', 'department', 'location', 'deviceType', 'deviceSn'];
  private techEntryTable: MatTableDataSource<any>;

  constructor() {

  }

  getColumns() {
    return this.columns;
  }

  initializeTable(dataTable: any, paginator: MatPaginator, matSort: MatSort) {
    this.techEntryTable = new MatTableDataSource(dataTable);
    this.techEntryTable.paginator = paginator;
    this.techEntryTable.filterPredicate = (data, filter) => {
      // console.log(data.customer);
      return this.columns.some(prop => {
        if (prop !== 'actions') {
          if (data.customer[prop]) {
            return data.customer[prop].toLowerCase().indexOf(filter) !== -1;
          } else if (data.device[prop]) {
            return data.device[prop].toLowerCase().indexOf(filter) !== -1;
          }
        }
      });
    };
    this.techEntryTable.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'customerName': return item.customer.customerName;
        case 'location': return item.customer.location;
        case 'company': return item.customer.company;
        case 'department': return item.customer.department;
        case 'deviceType': return item.device.deviceType;
        case 'deviceSn': return item.device.deviceSn;
        default: return item[property];
      }
    };
    this.techEntryTable.sort = matSort;
    return this.techEntryTable;
  }

  clearSearch() {

  }
}
