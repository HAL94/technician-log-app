import { Component, OnInit, EventEmitter, Input, Output, Inject } from '@angular/core';
import { Subtask } from 'src/app/models/dashboard/subtask.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaskListService } from 'src/app/services/task-list.service';
import { Task } from 'src/app/models/dashboard/task.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-subtask-edit',
  templateUrl: './subtask-edit.component.html',
  styleUrls: ['./subtask-edit.component.css']
})
export class SubtaskEditComponent implements OnInit {

  subtask: Subtask;
  subtaskForm: FormGroup;
  selectedDate: Date;
  toggleDatePicker = false;

  constructor(private fb: FormBuilder,
  private taskListService: TaskListService,
  @Inject(MAT_DIALOG_DATA) public editObj: any,
  private dialogRef: MatDialogRef<SubtaskEditComponent>) { }

  ngOnInit() {
    this.subtask = this.editObj.subtask;
    console.log(this.subtask);
    this.subtaskForm = this.fb.group({
      title: [this.subtask.title],
      details: [this.subtask.details],
      date: [this.subtask.date]
    });
    if (this.subtask.date) {
      this.selectedDate = new Date(this.subtask.date);
    }
  }

  onBack() {
    this.saveFormChange();
  }

  saveFormChange() {

    this.subtask.title = this.subtaskForm.get('title').value;
    this.subtask.details = this.subtaskForm.get('details').value;
    this.subtask.date = this.subtaskForm.get('date').value;

    this.editObj.subtask = this.subtask;

  }

  delete() {
    this.taskListService.deleteSubtaskAPI(this.editObj.tindex, this.editObj.stindex, this.subtask);
    this.dialogRef.close();
  }

  onDateSelection(value) {
    this.subtaskForm.get('date').setValue(value);
    this.selectedDate = value;
  }

  clearDate(event) {
    event.stopPropagation();
    this.subtaskForm.get('date').setValue(null);
    this.selectedDate = null;
  }

  toggleDateSelector() {
    this.toggleDatePicker = !this.toggleDatePicker;
  }
}
