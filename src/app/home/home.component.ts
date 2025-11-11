import {Component, computed, effect, inject, signal, viewChild} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

@Component({
    selector: 'home',
    imports: [
        MatTabGroup,
        MatTab,
        CoursesCardListComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    #courses= signal<Course[]>([]);
    courseServices= inject(CoursesService);
    dialog= inject(MatDialog);
    loadingService= inject(LoadingService);
    messagesService= inject(MessagesService);
     beginnersList = viewChild<CoursesCardListComponent>('beginnersList');

    beginnerCourses= computed(()=>{
        return this.#courses().filter(c=> c.category === "BEGINNER")
    });

    advancedCourses= computed(()=>{
        return this.#courses().filter(c=> c.category === "ADVANCED")
    });

    constructor() {
        const courses$= toObservable(this.#courses);
       
        effect(()=>{
            //console.log("Beginners lists",this.beginnersList());
            console.log("courses observable", courses$);
        });
        
        effect(()=> {
            // console.log("Beginner Courses: ", this.beginnerCourses())
            // console.log("Advanced Courses", this.advancedCourses())
        }); 
        this.loadAllCourses()
        .then(()=>console.log("Courses loaded", this.#courses()));
    }

      async loadAllCourses(){
        try {
           // this.loadingService.loadingOn();
           const courseResponse = await this.courseServices.loadAllCourses();
           this.#courses.set(courseResponse.sort(sortCoursesBySeqNo));
        } catch (error) {
            this.messagesService.showMessage("error", "Error loading courses");
           console.error("Error loading courses", error);
        }
        finally {
           // this.loadingService.loadingOff();
        }
    }

    async onCourseUpdated(updatedCourse: Course) {
        console.log("Course updated in HomeComponent:", updatedCourse);
        const courses = this.#courses();
        const newCourses = courses.map(course =>
            course.id === updatedCourse.id ? updatedCourse : course
        );
        this.#courses.set(newCourses);
    }
    
    async onCourseDeleted(deletedCourseId: string) {
        try {
        console.log("Course deleted in HomeComponent:", deletedCourseId);
        this.courseServices.deleteCourse(deletedCourseId);
        const courses = this.#courses();
        const newCourses = courses.filter(course => course.id !== deletedCourseId);
        this.#courses.set(newCourses);
        } catch (error) {
            console.error("Error deleting course", error);
            alert("Error deleting course: ");
        }
    }

    async onCourseCreated() {
        console.log("Creating new course");
        const newCourse= openEditCourseDialog(this.dialog, {
            mode: 'create',
            title: 'Create New Course'
        });

        const newCourses= [...this.#courses(), await newCourse];
        this.#courses.set(newCourses);
    }
       
//    async loadAllCoursesfromFetch(){
//         try {
//            const courseResponse = await this.courseServices.loadAllCourses();
//            this.courses.set(courseResponse);
//         } catch (error) {
//             alert("Error loading courses" + error);
//             console.error("Error loading courses", error);
//         }
//     }
//     loadAllCoursesByA(){
//         this.courseServices.loadAllCourses()
//         .then(c=> this.courses.set(c))
//         .catch(err=> console.log("Error loading courses", err)
//         );
//     }
}
