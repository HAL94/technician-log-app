import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TechEntryService } from 'src/app/services/tech-entry.service';
import { TechEntry } from 'src/app/models/tech-entry.model';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.css']
})
export class CreateEntryComponent implements OnInit {

  entryForm: FormGroup;
  submitTitle = 'Add Entry';

  private editMode = false;
  private techEntry: TechEntry;

  constructor(private fb: FormBuilder,
    private techEntryService: TechEntryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.entryForm = this.fb.group({
      customerName: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      company: new FormControl('', [
        Validators.required
      ]),
      department: new FormControl('', [
        Validators.required
      ]),
      deviceName: new FormControl('', [
        Validators.required
      ]),
      deviceType: new FormControl('', [
        Validators.required
      ]),
      deviceSn: new FormControl('', [
        Validators.required
      ]),
      location: new FormControl('', [
        Validators.required
      ]),
      description: ''
    });

    this.route.paramMap.subscribe(params => {
      if (params.has('techentryId')) {
        const techentryId = params.get('techentryId');
        this.techEntryService.getTechEntry(techentryId).subscribe((response: {techentry: TechEntry}) => {
          const entry = <TechEntry> (response.techentry);
          this.techEntry = entry;
          this.editMode = true;
          this.entryForm.setValue({
              'customerName': entry.customer.customerName,
              'email': entry.customer.email,
              'company': entry.customer.company,
              'department': entry.customer.department,
              'location': entry.customer.location,
              'deviceName': entry.device.deviceName,
              'deviceType': entry.device.deviceType,
              'deviceSn': entry.device.deviceSn,
              'description': entry.device.description
            });
          this.submitTitle = 'Edit Entry';
        }, error => {
          console.log(error);
          this.router.navigate(['add-entry']);
        });
      }
    });
  }

  onSubmit() {
    const entry = this.entryForm.value;
    if (entry !== null || typeof entry !== 'undefined') {
      this.setTechEntry();
      if (this.editMode) {
        this.techEntryService.updateTechEntry(this.techEntry);
      } else {
        this.techEntryService.createTechEntry(this.techEntry);
      }
    }
  }

  setTechEntry(): any {
    if (this.editMode) {
      this.techEntry.device.deviceName = this.entryForm.value.deviceName;
      this.techEntry.device.deviceType = this.entryForm.value.deviceType;
      this.techEntry.device.deviceSn = this.entryForm.value.deviceSn;
      this.techEntry.device.description = this.entryForm.value.description;
      this.techEntry.customer.customerName =  this.entryForm.value.customerName;
      this.techEntry.customer.email = this.entryForm.value.email;
      this.techEntry.customer.company = this.entryForm.value.company;
      this.techEntry.customer.department = this.entryForm.value.department;
      this.techEntry.customer.location = this.entryForm.value.location;

    } else {
      this.techEntry = {
        device: {
           deviceName: this.entryForm.value.deviceName,
           deviceType: this.entryForm.value.deviceType,
           deviceSn: this.entryForm.value.deviceSn,
           description: this.entryForm.value.description
        },
        customer: {
          customerName: this.entryForm.value.customerName,
          email: this.entryForm.value.email,
          company: this.entryForm.value.company,
          department: this.entryForm.value.department,
          location: this.entryForm.value.location
        }
      };
    }
  }




}
