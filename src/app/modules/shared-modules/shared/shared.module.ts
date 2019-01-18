import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [DatePipe]
})
export class SharedModule { }
