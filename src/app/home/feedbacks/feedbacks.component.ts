import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedBack } from 'src/app/models/feedback.model';
import { SlideConfig } from 'src/app/models/slide-config.model';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  feedbacks: FeedBack[] = [];
  constructor(private httpClient: HttpClient) { }

  slideConfig = new SlideConfig()

  ngOnInit(): void {
    this.slideConfig.breakpoints = { sm: 1, md: 1, lg: 2, xl: 2 }
    this.slideConfig.showLeftRightArrow = false;
    this.slideConfig.showDots = true;
    this.getAllFeedbacks()
  }

  getAllFeedbacks() {
    this.httpClient.get('assets/data/feedbacks.json').subscribe({
      next: (feedbacks) => {
        this.feedbacks = feedbacks as FeedBack[];
      },
      error: (errors) => {
        console.log(errors)
      }
    })

}
}