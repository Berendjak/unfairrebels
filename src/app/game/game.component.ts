import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Character } from './../helpers/character.canvas';
import { Maps } from './../maps/maps';
import { Controls } from './../helpers/controls.canvas';
import { SoundService } from '../services/sound.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements AfterViewInit, OnInit {

  constructor(private controls: Controls,
              private sound: SoundService,
              private router: Router,
              private activeRoute: ActivatedRoute) {}

  // Canvas
  public ctx;

  @ViewChild('myCanvas')
  public canvasRef: ElementRef;
  public canvas;

  // Map
  public maps: Maps;

  // Update interval
  private interval;

  // character
  private character: Character;

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

  public finishObject;
  public checkpointObjects = [];
  public checkpoint;
  public activeCheckpoint: number;
  public activeCheckpointObject;

  public char = {width: 10, height: 30, x: 0, y: 0, color: 'green'};

  // Clears the last position of the this.character
  public clearCharacter = () => {
    this.ctx.clearRect(this.character.x, this.character.y, this.character.width, this.character.height);
  }
  public clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  ngOnInit(): void {
  }

  // Happens after the page is loaded
  ngAfterViewInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.activeCheckpoint = params.checkpoint;
      // this.activeCheckpoint;
    });
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 1000;
    this.canvas.height = 650;
    this.ctx = this.canvas.getContext('2d');
    this.startGame();
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

    this.yFloor = Math.min.apply(null, this.platformY);

    this.finishObject = this.maps.notMovingGameObjects.find(x => x.finish);
    this.checkpointObjects = this.maps.notMovingGameObjects.filter(x => x.isCheckpoint);
    this.activeCheckpointObject = this.checkpointObjects[this.activeCheckpoint];

    if (this.activeCheckpoint <= -1 || this.activeCheckpoint >= this.checkpointObjects.length) {
      this.char.x = this.checkpointObjects.some(x => x.hasPassed) ?
        Math.max.apply(null, this.checkpointObjects.filter(x => x.hasPassed)) :
        Math.min.apply(null, this.platformX);
      this.char.y = this.checkpoint ? this.checkpoint : this.platformY[this.platformX.indexOf(this.char.x)] - this.char.height;
    } else if (this.activeCheckpoint >= 0) {
      this.char.x = this.activeCheckpointObject.x;
      this.char.y = this.activeCheckpointObject.y - this.char.height;
    }

  }

  public Checkpoint() {
    this.checkpoint = this.checkpointObjects.filter(x => x.hasPassed)
      .find(a => a.x === (this.checkpointObjects
        .filter(x => x.hasPassed).length === 1 ? a.x : Math.max
        .apply(null, Array.from(this.checkpointObjects, b => b.x))) && a.hasPassed);
    for (const checkpoint of this.checkpointObjects) {
      if (this.character.x + this.character.width >= checkpoint.x) {
        checkpoint.hasPassed = true;
      }
    }
  }

  // Calculates the collision with thi finishObject and the character
  public colliderFinish(){
    // Checks for the side collisions
    if (this.finishObject.x <= this.character.x + this.character.width + this.character.speedrightX &&
      this.finishObject.x + this.finishObject.width >= this.character.x + this.character.speedleftX &&
      this.finishObject.y <= this.character.y + this.character.gravitySpeed + this.character.height &&
      this.finishObject.y + this.finishObject.height >= this.character.y + this.character.gravitySpeed ) {
      clearInterval(this.interval);
      this.router.navigate(['/finish']);
    }
  }
  // Calculates if there is a collision with the FLOOR of the GameObject and the character
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
    // Checks for the floor collisions
    if (this.character.y + this.character.gravitySpeed + this.character.height > this.yFloor){
      this.character.y = this.yFloor - this.character.height;
      this.character.gravitySpeed = 0;
    } else {
      this.character.y += this.character.gravitySpeed;
    }
  }
  // Calculates if there is a collision with the CEILING of the GameObject and the character
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
    // Check for the ceiling collisions
    if (this.character.y + this.character.gravitySpeed < this.yCeil) {
      this.character.y = this.yCeil;
      this.character.gravitySpeed = 0;
    }
  }
  // Calculates if there is a collision with a side of the GameObject and the character
  public colliderSide() {
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
    // Right side of the object with the left side of the this.character
    for (const obj of reversed) {
      if (obj.x + obj.width <= this.character.x &&
        obj.y + obj.height >= this.character.y &&
        obj.y < this.character.y + this.character.height) {
        this.ySideRight = obj.x + obj.width;
        break;
      } else {
        this.ySideRight = 0;
      }
    }
    // Left side of the object with the right side of the this.character
    for (const obj of this.maps.notMovingGameObjects) {
      if (obj.x >= this.character.x + this.character.width &&
        obj.y + obj.height >= this.character.y &&
        obj.y < this.character.y + this.character.height) {
        this.ySideLeft = obj.x;
        break;
      } else {
        this.ySideLeft = undefined;
      }
    }
    if (this.ySideRight >= this.character.x + this.character.speedleftX) {
      // Move right only
      this.character.x += this.character.speedrightX;
    } else if (this.ySideLeft <= this.character.x + this.character.width + this.character.speedrightX) {
      // Move left only
      this.character.x += this.character.speedleftX;
    } else {
      // Move both sides
      this.character.x += this.character.speedleftX + this.character.speedrightX;
    }
  }

  public collider() {
    this.Checkpoint();
    this.colliderFloor();
    this.colliderCeil();
    this.colliderSide();
    this.colliderFinish();
  }

  public startGame() {
    this.maps = new Maps(this.ctx);
    this.platformPos();
    this.character = new Character(this.ctx, this.char.width, this.char.height, this.char.x, this.char.y, this.char.color);
    this.interval = setInterval(() => this.updateGameArea(), 15);
  }
  public GameOver(){
    if (this.character.y >= this.canvas.height){
      clearInterval(this.interval);
      this.clearCanvas();
      this.router.navigate(['/restart', this.checkpointObjects.indexOf(this.checkpoint)]);
    }
  }

  public updateGameArea() {
    this.clearCharacter();
    this.collider();
    this.character.newPos(this.colFloor, this.yFloor);
    this.character.draw();
    this.GameOver();
    console.log(this.character.x, this.character.y)
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
