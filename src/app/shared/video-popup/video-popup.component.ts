import { Component,EventEmitter,Input,OnChanges,OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.css']
})
export class VideoPopupComponent implements OnInit,OnChanges{
  
  @Input('youtubeUrl')
  youtubeUrl:string | undefined = undefined;

  @Input('show')
  show = true;

  @Output('close')
  onClose = new EventEmitter()

  safeUrl!:SafeResourceUrl;

  disableBodyScrolling(){
    document.body.style.setProperty('overflow','hidden')
  }
  enableBodyScrolling(){
    document.body.style.setProperty('overflow','scroll')
  }


  constructor(private sanitizer:DomSanitizer){}

  ngOnInit(): void {
   this.Init()
  }

  ngOnChanges(): void {
   this.Init() 
  }
  
  Init(){
    if(this.show)
    this.disableBodyScrolling()
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrl as string)
  }
  close(){
    this.enableBodyScrolling()
    this.onClose.emit()
  }
}
