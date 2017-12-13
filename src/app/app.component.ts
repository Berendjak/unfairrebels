// import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
// import { Character } from './helpers/character.canvas';
// import { Maps } from './maps/maps';
// import { Controls } from './helpers/controls.canvas';

import {Component, OnInit} from '@angular/core';
import { SoundService } from './services/sound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  constructor(private sound: SoundService) {}

  // Happens parallel with the page load
  ngOnInit(): void {
    this.sound.soundBack('../assets/sounds/theme.mp3');
  }
}
