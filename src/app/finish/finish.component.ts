import { SoundService } from '../services/sound.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FinishComponent implements OnInit {

  constructor( private activeRoute: ActivatedRoute,
              public sound: SoundService){}


  public level: number;
  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.level = parseInt(params.level) + 1;
    });
  }
}
