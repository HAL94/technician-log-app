import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { Task } from 'src/app/models/dashboard/task.model';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControlName } from '@angular/forms';
import { TaskListService } from 'src/app/services/task-list.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  task: Task;
  taskForm: FormGroup;
  selectedDate: Date;
  toggleDatePicker = false;

  constructor(private fb: FormBuilder,
  private taskListService: TaskListService,
  private dialogRef: MatDialogRef<TaskEditComponent>,
  @Inject(MAT_DIALOG_DATA) public editObj: any) { }

  ngOnInit() {


    this.task = { ...this.editObj.task };

    this.taskForm = this.fb.group({
      title: [this.task.title],
      details: [this.task.details],
      date: [this.task.date],
      subtasks: this.fb.array([])
    });
    if (this.task.date) {
      this.selectedDate = new Date(this.task.date);
    }
  }

  get subtasksForm() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask() {
    const subtaskForm = this.fb.group({
      title: ['', ]
    });

    this.subtasksForm.push(subtaskForm);
  }

  deleteSubtaskForm(i: number) {
    this.subtasksForm.removeAt(i);
    this.task.subtasks.splice(i, 1);
    console.log(this.editObj);
  }

  onDateSelection(value) {
    this.taskForm.get('date').setValue(value);
    this.selectedDate = value;
  }

  clearDate(event) {
    event.stopPropagation();
    this.taskForm.get('date').setValue(null);
    this.selectedDate = null;
  }

  toggleDateSelector() {
    this.toggleDatePicker = !this.toggleDatePicker;
  }

  saveFormChange() {
    this.task.title = this.taskForm.get('title').value;
    this.task.details = this.taskForm.get('details').value;
    this.task.date = this.taskForm.get('date').value;
    this.taskForm.get('subtasks').value.forEach(element => {
      const st = { title: element.title, parent: this.task.id, status: Status.PENDING };
      this.task.subtasks.push(st);
    });
    this.editObj.task = this.task;
  }

  delete() {
    this.taskListService.deleteTaskAPI(this.task, this.editObj.index);
    this.dialogRef.close();
  }


}
