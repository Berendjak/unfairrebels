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
  public yCeil: number;
  public ySideRight: number;
  public ySideLeft: number;

  public finishObject;
  public checkpointObjects = [];
  public checkpointHasPassed;
  public activeCheckpoint: number;
  public activeCheckpointObject;

  public diffLeft = -5;
  public diffRight = 5;

  public char = {width: 10, height: 30, x: 0, y: 0, color: 'green'};

  // Clears the last position of the this.character
  public clearCharacter = () => {
    this.ctx.clearRect(this.character.x, this.character.y, this.character.width, this.character.height);
  }
  public clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  ngOnInit(): void { }

  // Happens after the page is loaded
  ngAfterViewInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.activeCheckpoint = params.checkpoint;
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
    this.platformY = Array.from(this.maps.notMovingGameObjects, x => x.y);
    this.platformX = Array.from(this.maps.notMovingGameObjects, x => x.x);
    this.platformWidth = Array.from(this.maps.notMovingGameObjects, x => x.width);
    this.platformHeight = Array.from(this.maps.notMovingGameObjects, x => x.height);
    // The finish object
    this.finishObject = this.maps.notMovingGameObjects.find(x => x.finish);
    // Array with all the checkpoint objects
    this.checkpointObjects = this.maps.notMovingGameObjects.filter(x => x.isCheckpoint);

    // First X of the character
    this.char.x = this.canvas.width / 2;

    // First Y floor
    this.yFloor = Math.min.apply(null, this.platformY);
    // The current checkpoint object
    this.activeCheckpointObject = this.checkpointObjects[this.activeCheckpoint];

    const firstObject = this.maps.notMovingGameObjects.find(x => x.x === 0);

    if (this.activeCheckpoint <= -1 || this.activeCheckpoint >= this.checkpointObjects.length) {
      for (const obj of this.maps.notMovingGameObjects) {
        obj.x += this.char.x - 20;
      }
      this.char.y = firstObject.y - this.char.height;
    } else if (this.activeCheckpoint >= 0) {
      const del = this.activeCheckpointObject.x - this.char.x;
      for (const obj of this.maps.notMovingGameObjects) {
        obj.x -= del;
      }
      this.char.y = this.activeCheckpointObject.y - this.char.height;
    }

  }

  // Calculates if the character hasPassed a specific checkpoint for the restart
  public Checkpoint() {
    // Checks if character has passed a checkpoint and sets has passed to true
    for (const checkpoint of this.checkpointObjects) {
      if (this.character.x + this.character.width >= checkpoint.x) {
        checkpoint.hasPassed = true;
      }
    }
    // Gets the furthest checkpoint which the character has passed
    this.checkpointHasPassed = this.checkpointObjects.filter(x => x.hasPassed)
      .find(a => a.x === (this.checkpointObjects
        .filter(x => x.hasPassed).length === 1 ? a.x : Math.max
        .apply(null, Array.from(this.checkpointObjects, b => b.x))) && a.hasPassed);
  }
  // Calculates the collision with thi finishObject and the character
  public colliderFinish(){
    // Checks for the side collisions
    if (this.finishObject.x <= this.character.x + this.character.width - this.maps.notMovingGameObjects[0].speedrightX &&
      this.finishObject.x + this.finishObject.width >= this.character.x + this.maps.notMovingGameObjects[0].speedleftX &&
      this.finishObject.y <= this.character.y + this.character.gravitySpeed + this.character.height &&
      this.finishObject.y + this.finishObject.height >= this.character.y + this.character.gravitySpeed ) {
      clearInterval(this.interval);
      this.router.navigate(['/finish']);
    }
  }
  // Calculates if there is a collision with the FLOOR of the GameObject and the character
  public colliderFloor() {
    const reversed2 = this.maps.notMovingGameObjects.slice();
    reversed2.sort((a: any, b: any) => {
      if (a.y < b.y) {
        return -1;
      } else if (a.y > b.y) {
        return 1;
      } else {
        return 0;
      }
    });
    for (const obj of reversed2) {
      if (this.character.y + this.character.height <= obj.y &&
        this.character.y < obj.y + obj.height &&
        this.character.x + this.character.width > obj.x &&
        this.character.x < obj.width + obj.x) {
        this.yFloor = obj.y;
        break;
      }
    }
    for (const obj of reversed2) {
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
    // console.log(this.character.y, this.yCeil, this.character.y - this.yCeil > 20);
    if (this.character.y + this.character.gravitySpeed <= this.yCeil) {
      this.character.y = this.yCeil;
      this.character.gravitySpeed = 0;
    }
  }
  // Calculates if there is a collision with a side of the GameObject and the character
  public colliderSide() {
    const reversed = this.maps.notMovingGameObjects.slice();
    const reversed2 = this.maps.notMovingGameObjects.slice();
    reversed.sort((a: any, b: any) => {
      if (a.x > b.x) {
        return -1;
      } else if (a.x < b.x) {
        return 1;
      } else {
        return 0;
      }
    });
    reversed2.sort((a: any, b: any) => {
      if (a.x < b.x) {
        return -1;
      } else if (a.x > b.x) {
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
        console.log( obj.x + obj.width <= this.character.x,
          obj.y + obj.height >= this.character.y,
          obj.y < this.character.y + this.character.height);
        this.ySideRight = obj.x + obj.width;
        if (this.character.x - this.ySideRight < 5) {
          this.diffRight = this.character.x - this.ySideRight;
        }
        break;
      } else {
        this.ySideRight = 0;
        this.diffRight = 5;
      }
    }
    // Left side of the object with the right side of the this.character
    for (const obj of reversed2) {
      if (obj.x >= this.character.x + this.character.width &&
          obj.y + obj.height >= this.character.y &&
          obj.y < this.character.y + this.character.height) {
        console.log(obj.x >= this.character.x + this.character.width,
          obj.y + obj.height >= this.character.y,
          obj.y < this.character.y + this.character.height);
        this.ySideLeft = obj.x;
        if (this.character.x + this.character.width - this.ySideLeft > -5) {
          this.diffLeft = this.character.x + this.character.width - this.ySideLeft;
        }
        break;
      } else {
        this.ySideLeft = undefined;
        this.diffLeft = -5;
      }
    }
    if (this.ySideRight > this.character.x - this.maps.notMovingGameObjects[0].speedleftX) {
      // Move right only
      this.maps.newPosAll('right');
    } else if (this.ySideLeft < this.character.x + this.character.width - this.maps.notMovingGameObjects[0].speedrightX) {
      // Move left only
      this.maps.newPosAll('left');
    } else {
      // Move both sides
      this.maps.newPosAll('both');
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
      this.router.navigate(['/restart', this.checkpointObjects.indexOf(this.checkpointHasPassed)]);
    }
  }

  public updateGameArea() {
    this.clearCanvas();
    this.character.newPos(this.colFloor, this.yFloor);
    this.character.draw();
    this.maps.drawAll();
    this.collider();
    this.GameOver();
  }

  @HostListener('document:keydown', ['$event'])
  public KeyDown(event: KeyboardEvent) {
    this.controls.Move(event, this.character, this.colFloor, this.maps.notMovingGameObjects, this.yCeil, this.diffLeft, this.diffRight);
  }

  @HostListener('document:keyup', ['$event'])
  public KeyUp(event: KeyboardEvent) {
    this.controls.StopMove(event, this.maps.notMovingGameObjects);
  }

}
