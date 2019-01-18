import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TechEntry } from '../models/tech-entry.model';
import { handleHttpError } from './HttpErrorResponseUtility';

@Injectable({
  providedIn: 'root'
})
export class TechEntryService {
  private techEntries: TechEntry[];
  private techEntriesUpdate = new Subject<TechEntry[]>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getTechEntries() {
    const entries = this.http.get<{entries: any}>('http://localhost:3000/techentries/api');
    entries
    .pipe(
      catchError(handleHttpError),
      map((response) => {
        return response.entries.map(entry => {
          return {
            id: entry._id,
            device: {
               id: entry.device._id,
               deviceId: entry.device.deviceId,
               deviceName: entry.device.deviceName,
               deviceType: entry.device.deviceType,
               deviceSn: entry.device.deviceSn,
               description: entry.device.description
            },
            customer: {
              id: entry.customer._id,
              customerName: entry.customer.customerName,
              email: entry.customer.email,
              company: entry.customer.company,
              department: entry.customer.department,
              location: entry.customer.location
            },
            userId: entry.user
          };
        });
      })
    )
    .subscribe(techEntries => {
      // console.log('entries set');
      this.techEntries = techEntries;
      // console.log(this.techEntries);
      this.techEntriesUpdate.next([...this.techEntries]);
    });
  }

  getTodaysTechEntries() {
    this.http.get<{entries: any}>('http://localhost:3000/techentries/api/todaysentries')
      .pipe(
        catchError(handleHttpError),
        map((response) => {
          return response.entries.map(entry => {
            return {
              id: entry._id,
              device: {
                 id: entry.device._id,
                 deviceId: entry.device.deviceId,
                 deviceName: entry.device.deviceName,
                 deviceType: entry.device.deviceType,
                 deviceSn: entry.device.deviceSn,
                 description: entry.device.description
              },
              customer: {
                id: entry.customer._id,
                customerName: entry.customer.customerName,
                email: entry.customer.email,
                company: entry.customer.company,
                department: entry.customer.department,
                location: entry.customer.location
              },
              userId: entry.user
            };
          });
        })
      )
      .subscribe(techentries => {
        this.techEntries = techentries;
        this.techEntriesUpdate.next([...this.techEntries]);
      });
  }

  createTechEntry(techEntry: any) {
    console.log(techEntry);
    this.http.post<{entry: TechEntry}>('http://localhost:3000/techentries/api', techEntry)
      .subscribe(response => {
        if (response.entry) {
          this.router.navigate(['techentries']);
        }
      }, error => {
        console.log(error);
      });
  }

  getTechEntry(id: string) {
    return this.http.get<{techentry: TechEntry}>('http://localhost:3000/techentries/api/' + id);
  }

  updateTechEntry(techEntry: TechEntry) {
    console.log(techEntry);
    this.http.put<{message: string}>('http://localhost:3000/techentries/api/' + techEntry.id, techEntry)
      .subscribe((response) => {
        console.log(response.message);
        this.router.navigate(['techentries']);
      });
  }

  deleteTechEntry(techEntry: TechEntry) {
    console.log(techEntry);
    this.http.delete('http://localhost:3000/techentries/api/' + techEntry.id)
      .subscribe(result => {
        console.log(result);
        this.techEntries = this.techEntries.filter(entry => entry.id !== techEntry.id);
        this.techEntriesUpdate.next([...this.techEntries]);
        console.log(this.techEntries);
      });
  }

  getEntriesUpdated() {
    return this.techEntriesUpdate.asObservable();
  }

  setTechEntries(techEntries) {
    this.techEntries = techEntries;
  }
}
