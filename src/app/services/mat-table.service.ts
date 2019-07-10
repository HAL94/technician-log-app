import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MatTableService {

  static pageSize = 10;
  static pageSizeOptions = [MatTableService.pageSize, 25, 50, 100];

  constructor() {

  }

  initTable(dataTable: any, columns: string[]) {
    const table = new MatTableDataSource(dataTable);

    table.filterPredicate = (data, filter) => {
      return columns.some(prop => {
        if (prop !== 'actions') {
          // if direct child property
          if (data.hasOwnProperty(prop)) {
            return data[prop].toLowerCase().indexOf(filter) !== -1;
          }

          // else a nested child property
          for (const key in (<any>data)) {
            if (key.length > 0 && typeof data[key][prop] !== 'undefined') {
              return data[key][prop].toLowerCase().indexOf(filter) !== -1;
            }
          }

          return null;

        }
      });
    };
    table.sortingDataAccessor = (item, property) => {
      // direct child property
      if (item.hasOwnProperty(property)) {
        return item[property];
      }
      // nested property
      for (const key in (<any>item)) {
        if (key.length > 0 && typeof item[key][property] !== 'undefined') {
          return item[key][property];
        }
      }

      return null;
    };
    return table;
  }
}
