import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from 'src/app/models/course.model';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  filteredCourses: Course[] = [];
  categories: string[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getAllCourses()
  }

  getAllCourses() {
    this.httpClient.get('assets/data/courses.json').subscribe({
      next: (courses) => {
        this.courses = courses as Course[];
        this.filteredCourses = courses as Course[];
      },
      error: (errors) => {
        console.log(errors)
      }
    })
  }
  filterCourses(category:string) {
this.filteredCourses = this.courses.filter(course=>course.category === category)
  }
}
