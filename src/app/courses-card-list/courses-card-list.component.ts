import {Component, inject, input, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog} from "@angular/material/dialog";
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
    selector: 'courses-card-list',
    imports: [
        RouterLink
    ],
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
    courses = input.required<Course[]>();
    courseUpdated = output<Course>();
    courseDeleted = output<string>();
    dialog= inject(MatDialog);
    
   async  onEditCourse(course: Course) {
        console.log('Editing course with ID:', course.id);
      const newCourse  = await openEditCourseDialog(
        this.dialog, {
            mode: 'update',
            title: 'Update Existing Course',
            course: course
        });
        console.log('Edited course:', newCourse);
        this.courseUpdated.emit(newCourse);
        // Here you can add logic to open a dialog or navigate to an edit page
    }

    async onDeleteCourse(course: Course) {
        console.log('Deleting course with ID:', course.id);
        this.courseDeleted.emit(course.id);
        // Here you can add logic to delete the course
    }
}
