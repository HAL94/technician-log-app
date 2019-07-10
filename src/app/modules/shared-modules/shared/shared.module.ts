import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModalComponent } from '../../../components/spinner-modal/spinner-modal.component';

import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  declarations: [
    SpinnerModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SpinnerModalComponent
  ],
  entryComponents: [SpinnerModalComponent],
  providers: [DatePipe]
})
export class SharedModule { }
