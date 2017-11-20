import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor(private appComponent: AppComponent) { }

  ngOnInit() {

  }
}
