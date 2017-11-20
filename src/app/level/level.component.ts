import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LevelComponent implements OnInit {
  constructor(private appComponent: AppComponent) {}

  // Variables

  ngOnInit() {}

  // Functions

}




