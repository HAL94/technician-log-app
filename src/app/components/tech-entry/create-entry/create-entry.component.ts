import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TechEntryService } from 'src/app/services/tech-entry.service';
import { TechEntry } from 'src/app/models/tech-entry.model';
import { Status } from 'src/app/models/status';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.css']
})
export class CreateEntryComponent implements OnInit, OnDestroy {

  entryForm: FormGroup;
  submitTitle = 'Add Entry';
  isLoading = false;

  private editMode = false;
  private techEntry: TechEntry = {
    device: {
      deviceName: '',
      deviceSn: '',
      deviceType: '',
      description: ''
    },
    customer: {
      customerName: '',
      company: '',
      department: '',
      location: '',
      email: ''
    },
    status: Status.PENDING
  };

  paramSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private techEntryService: TechEntryService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.setForm();
    this.isLoading = true;

    this.paramSubscription = this.route.paramMap.subscribe(async (params) => {
      if (params.has('techentryId')) {
        const entryId = params.get('techentryId');
        const response = await this.techEntryService.getTechEntry(entryId);

        if (response) {
          const entry = response.techentry;
          this.techEntry = entry;
          this.editMode = true;
          this.submitTitle = 'Edit Entry';
          this.setForm();
          this.isLoading = false;
        }
      } else {
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    const entry = this.entryForm.value;
    if (entry !== null && typeof entry !== 'undefined') {
      this.setTechEntry();
      this.isLoading = true;
      if (this.editMode) {
        const params = {params: { operationCause: 'infoUpdate' }};
        this.techEntryService.updateTechEntry(this.techEntry, params);
      } else {
        this.techEntryService.createTechEntry(this.techEntry);
      }
    }
  }

  setForm() {
    this.entryForm = this.fb.group({
      customerName: [
         this.techEntry.customer.customerName,
         [Validators.required]
      ],
      email: [
        this.techEntry.customer.email,
        [Validators.required, Validators.email]
      ],
      company: [
        this.techEntry.customer.company,
        [Validators.required]
      ],
      department: [
        this.techEntry.customer.department,
        [Validators.required]
      ],
      location: [
        this.techEntry.customer.location,
        [Validators.required]
      ],
      deviceName: [
        this.techEntry.device.deviceName,
        [Validators.required]
      ],
      deviceType: [
        this.techEntry.device.deviceType,
        [Validators.required]
      ],
      deviceSn: [
        this.techEntry.device.deviceSn,
        [Validators.required]
      ],
      description: [this.techEntry.device.description]
    });
  }

  setTechEntry(): any {
    this.techEntry.device.deviceName = this.entryForm.value.deviceName;
    this.techEntry.device.deviceType = this.entryForm.value.deviceType;
    this.techEntry.device.deviceSn = this.entryForm.value.deviceSn;
    this.techEntry.device.description = this.entryForm.value.description;
    this.techEntry.customer.customerName =  this.entryForm.value.customerName;
    this.techEntry.customer.email = this.entryForm.value.email;
    this.techEntry.customer.company = this.entryForm.value.company;
    this.techEntry.customer.department = this.entryForm.value.department;
    this.techEntry.customer.location = this.entryForm.value.location;
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}
