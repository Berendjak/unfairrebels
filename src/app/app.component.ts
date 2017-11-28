import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Character } from './helpers/character.canvas';
import { Maps } from './maps/maps';
import { Controls } from './helpers/controls.canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(private controls: Controls) {}

  // Canvas
  public ctx;

  @ViewChild('myCanvas')
  public canvasRef: ElementRef;
  public canvas;

  // Map
  public maps: Maps;

  // Update interval
  private interval;

  // this.character
  private character: Character;

  // Sound
  public audio = new Audio();
  public buttonStatus = 'MUTE';
  public toggle = true;

  // For collisions platform with this.character
  public platformY = [];
  public platformX = [];
  public platformWidth = [];
  public platformHeight = [];

  public colFloor: boolean;
  public yFloor: number;
  // public colCeil: boolean;
  public yCeil: number;
  public ySideRight: number;
  public ySideLeft: number;
  // public colSideRight: boolean;
  // public colSideLeft: boolean;

  public char = {width: 10, height: 30, x: 0, y: 0, color: ''};

  // Clears the last position of the this.character
  public clearCharacter = () => {
    this.ctx.clearRect(this.character.x, this.character.y, this.character.width, this.character.height);
  }
  // Happens after the page is loaded
  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 1000;
    this.canvas.height = 650;
    this.ctx = this.canvas.getContext('2d');
  }
  // Happens parallel with the page load
  ngOnInit(): void {
    this.audio.src = '../assets/sounds/theme.mp3';
    this.audio.load();
    this.audio.play();
  }
  // Function for toggling the sound
  public sound() {
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
  // Gets the positions of the notMovingGameObjects
  public platformPos() {
    // Puts every element of a notMovingGameObject object in a separate array together
    for (const obj of this.maps.notMovingGameObjects) {
      this.platformY.push(obj.y);
      this.platformX.push(obj.x);
      this.platformWidth.push(obj.width);
      this.platformHeight.push(obj.height);
    }
    this.char.x = Math.min.apply(null, this.platformX);
    this.char.y = this.platformY[this.platformX.indexOf(this.char.x)] - this.char.height;
    this.yFloor = Math.min.apply(null, this.platformY);
  }
  // Calculates if there is a collision with the FLOOR of the GameObject and the this.this.character
  public colliderFloor() {
    for (const obj of this.maps.notMovingGameObjects) {
      if (this.character.y + this.character.height <= obj.y &&
        this.character.y < obj.y + obj.height &&
        this.character.x + this.character.width > obj.x &&
        this.character.x < obj.width + obj.x) {
        this.yFloor = obj.y;
        break;
      }
    }
    for (const obj of this.maps.notMovingGameObjects) {
      if (this.character.y + this.character.height === this.yFloor &&
        this.character.y < obj.y + obj.height &&
        this.character.x + this.character.width > obj.x &&
        this.character.x < obj.width + obj.x) {
        this.colFloor = true;
        break;
      } else {
        this.colFloor = false;
      }
    }
  }
  // Calculates if there is a collision with the CEILING of the GameObject and the this.character
  public colliderCeil() {
    const reversed = this.maps.notMovingGameObjects.slice();
    reversed.sort((a: any, b: any) => {
      if (a.y > b.y) {
        return -1;
      } else if (a.y < b.y) {
        return 1;
      } else {
        return 0;
      }
    });
    for (const obj of reversed) {
      if (obj.y + obj.height <= this.character.y &&
        this.character.x + this.character.width > obj.x &&
        this.character.x < obj.width + obj.x) {
        this.yCeil = obj.height + obj.y;
        break;
      } else {
        this.yCeil = 0;
      }
    }
  }
  // Calculates if there is a collision with a side of the GameObject and the this.character
  public colliderSide() {
    // Right side of the object with the left side of the this.character
    for (const obj of this.maps.notMovingGameObjects) {
      if (obj.x + obj.width <= this.character.x &&
        obj.y + obj.height >= this.character.y &&
        obj.y <= this.character.y + this.character.height) {
        this.ySideRight = obj.x + obj.width;
        break;
      } else {
        this.ySideRight = 0;
      }
    }
    // Left side of the object with the right side og the this.character
    for (const obj of this.maps.notMovingGameObjects) {
      if (obj.x >= this.character.x + this.character.width &&
        obj.y + obj.height > this.character.y &&
        obj.y < this.character.y + this.character.height) {
        this.ySideLeft = obj.x;
        break;
      } else {
        this.ySideLeft = undefined;
      }
    }
  }

  public collider() {
    this.colliderFloor();
    this.colliderCeil();
    this.colliderSide();
  }

  public startGame() {
    this.maps = new Maps(this.ctx);
    this.platformPos();
    this.character = new Character(this.ctx, this.char.width, this.char.height, this.char.x + 600, this.char.y, 'green');
      this.interval = setInterval(() => this.updateGameArea(), 15);
  }

  public updateGameArea() {
    this.clearCharacter();
    this.collider();
    this.character.newPos(this.colFloor, this.yFloor, this.yCeil, this.ySideRight, this.ySideLeft);
    this.character.draw();
  }

  @HostListener('document:keydown', ['$event'])
  public KeyDown(event: KeyboardEvent) {
    this.controls.Move(event, this.character, this.colFloor);
  }

  @HostListener('document:keyup', ['$event'])
  public KeyUp(event: KeyboardEvent) {
    this.controls.StopMove(event, this.character);
  }
}
