
import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, AfterViewInit, HostListener, EventEmitter, Output, ContentChild, TemplateRef } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Course } from 'src/app/models/course.model';
import { FeedBack } from 'src/app/models/feedback.model';
import { SlideConfig } from 'src/app/models/slide-config.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit {

 
  


  @Input('items')
  items: string[] | FeedBack[] | Client[] = [];

  dots: number[] = [];
  activeSlideID = 1;

  @ContentChild('template')
  template: TemplateRef<any> | undefined;

  @ViewChild('slideContainer')
  slideContainer!: ElementRef;

  @Input('slideConfig')
  slideConfig = new SlideConfig();

  @Output('select')
  onSelect: EventEmitter<string> = new EventEmitter<string>()

  sliderContainerWidth = 0;
  slideWidth = 0;
  elementsToShow = 1;
  sliderWidth = 0;

  sliderMarginLeft = 0;
  isSlidesOver = false;

  @HostListener('window:Resize', ['$event'])
  onScreenResize(): void {
    this.setUpSlider()
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.dots)
  }

  getItems() {
    return this.items as any[]
  }

  ngAfterViewInit(): void {
    this.getCategories()
    this.setUpSlider()
  }


  setUpSlider() {
    if (window.innerWidth < 500)
      this.elementsToShow = this.slideConfig.breakpoints.sm;

    else if (window.innerWidth < 900)
      this.elementsToShow = this.slideConfig.breakpoints.md;
    else if (window.innerWidth < 1300)
      this.elementsToShow = this.slideConfig.breakpoints.lg;
    else
      this.elementsToShow = this.slideConfig.breakpoints.xl;

    if (this.items.length < this.elementsToShow) {
      this.elementsToShow = this.items.length;
    }

    this.dots = Array(this.items.length - this.elementsToShow + 1);

    let container = this.slideContainer.nativeElement as HTMLElement;

    this.sliderContainerWidth = container.clientWidth;
    this.slideWidth = this.sliderContainerWidth / this.elementsToShow;
    this.sliderWidth = this.slideWidth * this.items.length;

   // console.log(this.sliderContainerWidth)
   // console.log(this.sliderWidth)
   // console.log(this.slideWidth)

  }

  getCategories() {
    if(this.slideConfig.autoPlay) this.autoPlay()

  }
  prev() {
    console.log(this.sliderMarginLeft)
    if (this.sliderMarginLeft === 0) {
      return
    }
    this.activeSlideID--;
    this.sliderMarginLeft = this.sliderMarginLeft + this.slideWidth;
  }
  next() {
    const notShowingElementsCount = this.items.length - this.elementsToShow;
    const possibleMargin = -(notShowingElementsCount * this.slideWidth);
    if (this.sliderMarginLeft <= possibleMargin) {
      this.isSlidesOver = true;
      return
    }
    this.isSlidesOver = false;
    this.activeSlideID++;
    this.sliderMarginLeft = this.sliderMarginLeft - this.slideWidth;
  }
  move(slideID: number) {
    console.log("Slide ID" + slideID)
    console.log("activeSlideID" + this.activeSlideID)
    let difference = slideID - this.activeSlideID;
    if (difference > 0) {
      // Next
      for (let index = 0; index < difference; index++) {
        this.next()
      }
    } else if (difference < 0) {
      //prev
      for (let index = 0; index < Math.abs(difference); index++) {
        this.prev()
      }
    }
  }

  autoPlay(){
    setTimeout(() => {
      if(this.isSlidesOver === true){
        this.sliderMarginLeft = this.slideWidth;
      }
      this.next()
      this.autoPlay()
    }, 1000);
  }
  
}

