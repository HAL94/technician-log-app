import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tech-entry',
  templateUrl: './tech-entry.component.html',
  styleUrls: ['./tech-entry.component.css']
})
export class TechEntryComponent implements OnInit {
  techEntryTableRequest = 'AllEntries';

  constructor(
  ) { }

  ngOnInit() {
  }

}
