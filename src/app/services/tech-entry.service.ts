import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { TechEntry } from '../models/tech-entry.model';
import { MatSnackService } from './mat-snack.service';

@Injectable({
  providedIn: 'root'
})
export class TechEntryService {
  private techEntries: TechEntry[];
  private techEntriesUpdate = new Subject<{entries: TechEntry[], totalEntries: number}>();
  private HTTP_URLS = environment.TECHENTRY_URLS;
  private totalEntries;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBarService: MatSnackService
  ) { }

  async getTechEntriesAPI(filter: string, currentPage: number, pageSize: number) {
    try {
      const url = this.HTTP_URLS.getTechentries;
      const response = await this.http
      .get<{entries: TechEntry[], totalEntries: number}>(url,
        {params: {listFilter: filter, page: String(currentPage), pagesize: String(pageSize)}})
      .toPromise();

      this.setTechentriesAndTotal(response.entries, response.totalEntries);

    } catch (error) {
      console.log(error);
    }

  }

  async createTechEntry(techEntry: any) {
    try {
      const response = await this.http.post<{entry: TechEntry, totalEntries: number}>(this.HTTP_URLS.createTechentry, techEntry)
      .toPromise();

      this.totalEntries = response.totalEntries;

      this.snackBarService.openSnackBar('Added Successfully', 1000,
       this.snackBarService.snackbarSuccessConfig);

      this.router.navigate(['today-entries']);

    } catch (error) {
      console.log(error);
    }

  }

  async getTechEntry(id: string) {
    try {
      const url = this.HTTP_URLS.getTechentry + id;

      return await this.http.get<{techentry: TechEntry}>(url).toPromise();

    } catch (error) {
      console.log(error);
      this.router.navigate(['today-entries']);
    }
  }

  async updateTechEntry(techEntry: TechEntry, params?: any) {
    try {
      const url = this.HTTP_URLS.updateTechentry + techEntry.id;

      await this.http.patch(url, techEntry, params).toPromise();

      this.router.navigate(['today-entries']);

      this.snackBarService.openSnackBar('Edited Successfully', 1000, this.snackBarService.snackbarSuccessConfig);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTechEntry(techEntry: TechEntry, index: number) {
    try {
      const url = this.HTTP_URLS.deleteTechentry + techEntry.id;

      const response = await this.http
      .delete<{message: string, totalEntries: number}>(url)
      .toPromise();

      this.techEntries.splice(index, 1);
      this.setTechentriesAndTotal(this.techEntries, response.totalEntries);

      this.snackBarService.openSnackBar(response.message, 1000, this.snackBarService.snackbarSuccessConfig);
    } catch (error) {
      console.log(error);
    }
  }

  getEntriesUpdated() {
    return this.techEntriesUpdate.asObservable();
  }

  getTechEntries() {
    return this.techEntries;
  }

  getTotalEntries() {
    return this.totalEntries;
  }

  setTechentriesAndTotal(newTechentryList: TechEntry[], newTotalEntries: number) {
    this.techEntries = newTechentryList;
    this.totalEntries = newTotalEntries;
    this.techEntriesUpdate.next({entries: [...this.techEntries], totalEntries: this.totalEntries});
  }
}
