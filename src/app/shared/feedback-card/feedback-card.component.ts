import { Component, OnInit,Input } from '@angular/core';
import { FeedBack } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.css']
})
export class FeedbackCardComponent implements OnInit {
  
  @Input('item')
  item!:FeedBack;
  
  constructor() { }

  ngOnInit(): void {
  }
}
