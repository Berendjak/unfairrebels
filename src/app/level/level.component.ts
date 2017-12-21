import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AppComponent} from '../app.component';
import {SoundService} from "../services/sound.service";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LevelComponent implements OnInit {
  constructor(private sound:SoundService) {}


  // Variables

  ngOnInit() {}

  // Functions

}




