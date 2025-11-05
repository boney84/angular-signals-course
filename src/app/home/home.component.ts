import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagesService} from "../messages/messages.service";
import {catchError, from, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

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
    beginnerCourses= computed(()=>{
        return this.#courses().filter(c=> c.category === "BEGINNER")
    });

    advancedCourses= computed(()=>{
        return this.#courses().filter(c=> c.category === "ADVANCED")
    });

    constructor() {
        effect(()=> {
            console.log("Beginner Courses: ", this.beginnerCourses())
            console.log("Advanced Courses", this.advancedCourses())
        }); 
        this.loadAllCourses().then(()=>console.log("Courses loaded", this.#courses()));
    }

      async loadAllCourses(){
        try {
           const courseResponse = await this.courseServices.loadAllCourses();
           this.#courses.set(courseResponse.sort(sortCoursesBySeqNo));
        } catch (error) {
            alert("Error loading courses" + error);
            console.error("Error loading courses", error);
        }
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
