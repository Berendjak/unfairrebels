import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {textDef} from "@angular/core/src/view";
import {createText} from "@angular/core/src/view/text";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor() { }

  // Variables
  public audio = new Audio();
  public buttonStatus = 'MUTE';

  public toggle = true;

    ngOnInit() {
    // In here goes what needs to happen at the same time the page loads
    this.audio.src = '../assets/sounds/theme.mp3';
    this.audio.load();
    this.audio.play()
  }

  // Deze is geluid bij het laden van de pagina
  public sound() {
      this.toggle = !this.toggle;
      this.buttonStatus = this.toggle ? 'MUTE' : 'SOUND'

      if (this.toggle) {
        this.audio.src = '../assets/sounds/theme.mp3';
        this.audio.load();
        this.audio.play();
      } else {
        this.audio.src = '';
      }
  }
}
