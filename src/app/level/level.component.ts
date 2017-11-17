import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LevelComponent implements OnInit {
  constructor(private canvas: AppComponent) { }

  private ctx;

  ngOnInit() {
    // this.ctx = this.canvas.canvasRef.nativeElement.getContext('2d');
  }

  // Functions
}
