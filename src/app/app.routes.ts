import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {LessonsComponent} from "./lessons/lessons.component";
import {ResourceDemoComponent} from "./resource-demo/resource-demo.component";
import {LinkedSignalDemoComponent} from "./linked-signal/linked-signal-demo.component";
import { isUserauthenticated } from './guards/auth-guards';
import { CourseComponent } from './course/course.component';
import { courseResolver } from './course/course.resolver';
import { courseLessonResolver } from './course/course-lesson.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, canActivate: [isUserauthenticated]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "course/:id",
    component: CourseComponent, canActivate: [isUserauthenticated],
    resolve: {
      course: courseResolver,
      lessons: courseLessonResolver
    }
  },
  {
    path: "lessons",
    component: LessonsComponent
  },
  {
    path:"shopping-cart",
    component: LinkedSignalDemoComponent
  },
  {
    path: "resource-demo",
    component: ResourceDemoComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
