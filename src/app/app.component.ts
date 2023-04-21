import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('albumCover') albumCover!: ElementRef;

  ngOnInit() {
  }
  
}
