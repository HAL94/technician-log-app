import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { TechEntryService } from 'src/app/services/tech-entry.service';
import { TechEntry } from 'src/app/models/tech-entry.model';
import { Router } from '@angular/router';
import { MatTableService } from 'src/app/services/mat-table.service';

@Component({
  selector: 'app-today-entries',
  templateUrl: './today-entries.component.html',
  styleUrls: ['./today-entries.component.css']
})
export class TodayEntriesComponent implements OnInit {
  techEntries: TechEntry[];

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
    private matTableService: MatTableService) { }

  ngOnInit() {
    this.columns = this.matTableService.getColumns();
    this.techentryService.getTodaysTechEntries();
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
