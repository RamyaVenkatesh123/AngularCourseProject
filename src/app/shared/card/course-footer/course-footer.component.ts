import { Component,Input,OnInit} from '@angular/core';
import { Course } from 'src/app/models/course.model';


@Component({
  selector: 'app-course-footer',
  templateUrl: './course-footer.component.html',
  styleUrls: ['./course-footer.component.css']
})
export class CourseFooterComponent {

  @Input('course')
  course!:Course;

  constructor(){}
  
  ngOninit():void{}
}
