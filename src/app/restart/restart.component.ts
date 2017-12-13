import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RestartComponent implements OnInit {
  constructor(private activeRoute: ActivatedRoute) {}

  public checkpoint: number;
  public level: number;

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.checkpoint = params.checkpoint;
      this.level = params.level;
    });
  }
}
