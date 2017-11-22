import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Character } from './helpers/canvas.character';
import { Maps } from './maps/maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit, OnInit {
  // Canvas
  public ctx;
  @ViewChild('myCanvas')
  public canvasRef: ElementRef;
  public canvas;

  // Map
  public maps: Maps;

  // Update interval
  private interval;

  // Character
  private character: Character;

  // Sound
  public audio = new Audio();
  public buttonStatus = 'MUTE';
  public toggle = true;

  public clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 1000;
    this.canvas.height = 650;
    this.ctx = this.canvas.getContext('2d');
  }
  ngOnInit() {
    this.audio.src = '../assets/sounds/theme.mp3';
    this.audio.load();
    this.audio.play();
  }

  // Function for toggling the sound
  public Sound() {
    this.toggle = !this.toggle;
    this.buttonStatus = this.toggle ? 'MUTE' : 'SOUND';

    if (this.toggle) {
      this.audio.src = '../assets/sounds/theme.mp3';
      this.audio.load();
      this.audio.play();
    } else {
      this.audio.src = '';
    }
  }

  public updateGameArea() {
    this.clear();
    this.character.update();
    this.character.draw();
    this.maps = new Maps(this.ctx);
  }

  public startGame() {
    this.character = new Character(this.ctx, 10, 30, this.canvas.width / 2 - 30, 600, 'red');
    this.interval = setInterval(() => this.updateGameArea(), 15);
  }

  @HostListener('document:keydown', ['$event'])
  public Controls(event: KeyboardEvent) {
    if (!event.altKey) {
      if (event.keyCode === 38) {
        this.character.moveup();
      }
      if (event.keyCode === 39) {
        this.character.moveright();
      }
      if (event.keyCode === 37) {
        this.character.moveleft();
      }
    }
  }
  @HostListener('document:keyup', ['$event'])
  public ControlsStop(event: KeyboardEvent) {
    if (event.keyCode === 39) {
      this.character.stopright();
    }
    if (event.keyCode === 37) {
      this.character.stopleft();
    }
  }
}
