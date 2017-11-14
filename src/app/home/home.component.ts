import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor() { }

  // Variables

  ngOnInit() {
    // In here goes what needs to happen at the same time the page loads
  }

  // Functions

}
