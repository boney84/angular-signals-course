import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../models/course.model";
import {EditCourseDialogData} from "./edit-course-dialog.data.model";
import {CoursesService} from "../services/courses.service";
import {LoadingIndicatorComponent} from "../loading/loading.component";
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CourseCategoryComboboxComponent} from "../course-category-combobox/course-category-combobox.component";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {
  dialogRef= inject(MatDialogRef);
  data: EditCourseDialogData= inject<EditCourseDialogData>(MAT_DIALOG_DATA);
  fb= inject(FormBuilder);
  courseService= inject(CoursesService);

  form= this.fb.group({
    title: [''],
    longDescription: [''],
    category:[''],
    iconUrl: ['']
  });

  constructor() {
    console.log(this.data?.course)
    this.form.patchValue({
      title: this.data?.course?.title || '',
      longDescription: this.data?.course?.longDescription || '',
      category: this.data?.course?.category || '',
      iconUrl: this.data?.course?.iconUrl || ''})
  }
  onClose() {
    this.dialogRef.close({title:'Hello World'});
  }
  
  async onSave() {
   const courseProps = this.form.value as Partial<Course>;
    if (this.data.mode === 'update') {
     await this.saveCourse(this.data.course!.id, courseProps);
  }
  else if (this.data.mode === 'create') {
    await this.createCourse(courseProps);
   }
}


  async saveCourse(courseId:string, course: Partial<Course>) {
    try {
     const updatedCourse= await this.courseService.saveCourse(courseId, course);
      this.dialogRef.close(updatedCourse);
      
    } catch (error) {
        console.error('Error saving course:', error);
        alert('An error occurred while saving the course. Please try again.');
    }
   
  }

  async createCourse(course: Partial<Course>) {
  // Implementation for creating a course
  try{
  const newCourse= this.courseService.createCourse(course);
  this.dialogRef.close(newCourse);
  } 
  catch (error) {
    console.error('Error creating course:', error);
    alert('An error occurred while creating the course. Please try again.');
  }
}


}



export async function openEditCourseDialog(dialog:MatDialog,data: EditCourseDialogData) {
  const config= new MatDialogConfig();
  config.width= '400px';
  config.data= data;
  config.disableClose= true;
  config.autoFocus= true;

  const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed();
  return await firstValueFrom(close$);
}

