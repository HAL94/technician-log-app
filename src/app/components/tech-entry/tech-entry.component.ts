import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { TechEntryService } from 'src/app/services/tech-entry.service';
import { TechEntry } from 'src/app/models/tech-entry.model';
// import { UserService } from 'src/app/services/user.service';
// import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { MatTableService } from 'src/app/services/mat-table.service';


@Component({
  selector: 'app-tech-entry',
  templateUrl: './tech-entry.component.html',
  styleUrls: ['./tech-entry.component.css']
})
export class TechEntryComponent implements OnInit {
  techEntries: TechEntry[];
  // user: User;

  columns: string[];
  techEntryTable: MatTableDataSource<any>;
  filter: string;

  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageSize = MatTableService.pageSize;
  pageSizeOptions = MatTableService.pageSizeOptions;

  constructor(
    private techentryService: TechEntryService,
    private router: Router,
    private matTableService: MatTableService
  ) { }

  ngOnInit() {
    // this.user = this.userService.getUser();
    // this.userService.getUserUpdate().subscribe(user => {
    //   this.user = user;
    //   console.log(this.user);
    // });
    this.columns = this.matTableService.getColumns();
    this.techentryService.getTechEntries();
    this.techentryService.getEntriesUpdated().subscribe(techEntries => {
      this.techEntries = techEntries;
      this.techEntryTable = this.matTableService.initializeTable(this.techEntries, this.paginator, this.matSort);
    });
  }

  onSearchClear() {
    this.filter = '';
    this.filterTable('');
  }

  filterTable(filter: string) {
    this.techEntryTable.filter = filter.trim().toLowerCase();
  }

  onEditNavigate(techentry: TechEntry) {
    this.router.navigate(['edit-entry', techentry.id]);
  }

  onDelete(techEntry: TechEntry) {
    this.techentryService.deleteTechEntry(techEntry);
  }

}
