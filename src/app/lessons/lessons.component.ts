import {Component, ElementRef, inject, signal, viewChild, ViewChildren} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';

@Component({
    selector: 'lessons',
    imports: [
        LessonDetailComponent
    ],
    templateUrl: './lessons.component.html',
    styleUrl: './lessons.component.scss'
})
export class LessonsComponent {
    lessonsService= inject(LessonsService);
    lessonSignal= signal<Lesson[]>([]);
    mode= signal<'master' | 'detail'>('master');
courseCards= ViewChildren('C')

    selectedLesson= signal<Lesson | null>(null);

    searchInput= viewChild.required<ElementRef>('search');
    onSearch(){
        const query= this.searchInput()?.nativeElement.value;    
        console.log(`${query}`);                                                                                              
    }


}
