import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { CharacterMovement} from '../helpers/character.moving.canvas';
import { Maps} from './../maps/maps';
import { Controls} from './../helpers/controls.canvas';
import { SoundService} from '../services/sound.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { TrapObject} from '../objects/trap.object';
import { XMovingObject } from '../helpers/x.moving.canvas';
import { BulletObject } from '../objects/bullet.object';
import { CheckpointObject } from '../objects/checkpoint.object';
import { Message } from '../helpers/message.canvas';
import { FinishObject } from '../objects/finish.object';
import { JumpObject } from '../objects/jump.object';
import { EnemyMovingObject } from '../objects/enemy.moving.object';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements AfterViewInit, OnInit {

  constructor(private controls: Controls,
              private sound: SoundService,
              private router: Router,
              private activeRoute: ActivatedRoute ) {}

  // Canvas
  public ctx;

  @ViewChild('myCanvas')
  public canvasRef: ElementRef;
  public canvas;
  public backgroundUrl: string;

  // Map
  public maps: Maps;

  // Update interval
  private interval;

  // character
  private character: CharacterMovement;

  // For collisions platform with this.character
  public platformY = [];
  public platformX = [];
  public platformWidth = [];
  public platformHeight = [];

  public colFloor: boolean;
  public curFloorObject: XMovingObject;
  public curCeilObject: XMovingObject;
  public curRightObject: XMovingObject;
  public curLeftObject: XMovingObject;

  public checkpointHasPassed: CheckpointObject;
  public activeCheckpoint: number;
  public activeCheckpointObject;

  public activeLevel: number;

  public diffLeft = -5;
  public diffRight = 5;

  public char = {width: 40, height: 55, x: 0, y: 0};
  public charImg = new Image();

  public gameOverCalled = false;

  public message: Message;
  public currentSeconds;
  public checkpointSec: number;

  public hasCollided = (obj) => {
    return obj.x <= this.character.x + this.character.width - this.maps.allObjects[0].speedRightX &&
      obj.x + obj.width >= this.character.x + this.maps.allObjects[0].speedLeftX &&
      obj.y <= this.character.y + this.character.gravitySpeed + this.character.height &&
      obj.y + obj.height >= this.character.y + this.character.gravitySpeed;
  }

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
      this.activeLevel = params.level;
    });
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 1000;
    this.canvas.height = 650;
    this.ctx = this.canvas.getContext('2d');
    this.startGame();
    this.backgroundUrl = '../../assets/images/canvas_background_' + this.activeLevel + '.jpg';
  }

  public clearInterval() {}

  // Gets the positions of the allObjects
  public platformPos() {
    // Puts every element of a notMovingGameObject object in a separate array together
    this.platformY = Array.from(this.maps.allObjects, x => x.y);
    this.platformX = Array.from(this.maps.allObjects, x => x.x);
    this.platformWidth = Array.from(this.maps.allObjects, x => x.width);
    this.platformHeight = Array.from(this.maps.allObjects, x => x.height);

    // First X of the character
    this.char.x = this.canvas.width / 2;

    // The current checkpoint object
    this.activeCheckpointObject = this.maps.checkpointObjects[this.activeCheckpoint];

    const firstObject = this.maps.allObjects.find(x => x.x === 0);

    if (this.activeCheckpoint <= -1 || this.activeCheckpoint >= this.maps.checkpointObjects.length) {
      for (const obj of this.maps.allObjects) {
        obj.x += this.char.x - 20;
      }
      this.char.y = firstObject.y - this.char.height;
    } else if (this.activeCheckpoint >= 0) {
      const del = this.activeCheckpointObject.x - this.char.x;
      for (const obj of this.maps.allObjects) {
        obj.x -= del;
      }
      this.char.y = this.activeCheckpointObject.y - this.char.height + this.activeCheckpointObject.height;
    }
  }
  // Calculates if the character hasPassed a specific checkpoint for the restart
  public checkpoints() {
    this.currentSeconds = new Date().getTime() / 1000;
    // Gets the furthest checkpoint which the character has passed
    const checkpointsHasPassed = this.maps.checkpointObjects.filter(obj => obj.hasPassed);
    this.checkpointHasPassed = checkpointsHasPassed[checkpointsHasPassed.length - 1];
    // Checks if character has passed a checkpoint and sets has passed to true
    for (const checkpoint of this.maps.checkpointObjects) {
      if (this.activeCheckpointObject && checkpoint.x < this.activeCheckpointObject.x) {
        checkpoint.hasPassed = true;
      }
      // console.log( this.character.y < checkpoint.y + checkpoint.height)
      if (this.character.x + this.character.width >= checkpoint.x && this.character.y < checkpoint.y + checkpoint.height) {
        // console.log(checkpoint.hasPassed)
        if (!checkpoint.hasPassed) {
          this.checkpointSec = new Date().getTime() / 1000;
          this.message = new Message({ctx: this.ctx, msg: 'Checkpoint Passed', x: this.canvas.width / 2 - 150, y: 50, color: '#08c9fb'});
        }
        checkpoint.hasPassed = true;
      } if (this.checkpointSec + 3 >= this.currentSeconds && checkpoint.hasPassed) this.message.draw();
    }

  }
  // Calculates the collision with thi finishObject and the character
  public colliderFinish() {
    // Checks for the side collisions
    if (this.hasCollided(this.maps.finishObject)) {
      this.gameOverCalled = true;
      for (const obj of this.maps.shootingObjects) {
        clearInterval(obj.interval);
      }
      setTimeout(() => {
        clearInterval(this.interval),
          this.clearInterval();
        this.router.navigate(['/finish', this.activeLevel]);
      }, 200);
    }
  }
  // Calculates if there is a collision with the FLOOR of the GameObject and the character
  public colliderFloor() {
    for (const obj of this.maps.yAsc) {
      if (this.character.y + this.character.height <= obj.y &&
        this.character.y < obj.y + obj.height &&
        this.character.x + this.character.width > obj.x &&
        this.character.x < obj.width + obj.x &&
        !(obj instanceof FinishObject) && !(obj instanceof CheckpointObject) && !(obj instanceof EnemyMovingObject)) {
        this.curFloorObject = obj;
        break;
      }
    }
    for (const obj of this.maps.yAsc) {
      if (this.character.y + this.character.height === this.curFloorObject.y &&
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
    if (this.character.y + this.character.gravitySpeed + this.character.height >= this.curFloorObject.y) {
      this.character.gravitySpeed = 0;
      this.character.y = this.curFloorObject.y - this.character.height;

      if (this.curFloorObject instanceof TrapObject) {
        this.curFloorObject.isTouched = true;
      } if (this.curFloorObject instanceof BulletObject && !this.gameOverCalled) {
        this.gameOver();
      } if (this.curFloorObject instanceof JumpObject) {
        this.character.moveUp(this.curCeilObject, -30);
      }
    } else {
      this.character.newPosY(true);
    }
  }
  // Calculates if there is a collision with the CEILING of the GameObject and the character
  public colliderCeil() {
    for (const obj of this.maps.yDesc) {
      if (obj.y + obj.height <= this.character.y &&
        this.character.x + this.character.width > obj.x &&
        this.character.x < obj.width + obj.x &&
        !(obj instanceof FinishObject) && !(obj instanceof CheckpointObject) && !(obj instanceof EnemyMovingObject)) {
        this.curCeilObject = obj;
        break;
      }
    }
    // Check for the ceiling collisions
    if (this.character.y + this.character.gravitySpeed <= this.curCeilObject.height + this.curCeilObject.y) {
      this.character.y = this.curCeilObject.height + this.curCeilObject.y;
      this.character.gravitySpeed = 0;
      if (this.curCeilObject instanceof BulletObject && !this.gameOverCalled) {
        this.gameOver();
      }
    }
  }
  // Calculates if there is a collision with a SIDE of the GameObject and the character
  public colliderSides() {
    // Right side of the object with the left side of the this.character
    for (const obj of this.maps.xDesc) {
      if (obj.x + obj.width <= this.character.x &&
        obj.y + obj.height >= this.character.y &&
        obj.y < this.character.y + this.character.height) {
        this.curRightObject = obj;
        break;
      }
    }
    // Left side of the object with the right side of the this.character
    for (const obj of this.maps.xAsc) {
      if (obj.x >= this.character.x + this.character.width &&
        obj.y + obj.height >= this.character.y &&
        obj.y < this.character.y + this.character.height) {
        this.curLeftObject = obj;
        break;
      }
    }
    if (this.curRightObject.x + this.curRightObject.width > this.character.x - this.maps.allObjects[this.maps.allObjects.indexOf(this.curRightObject)].speedLeftX -
      (this.maps.allObjects[this.maps.allObjects.indexOf(this.curRightObject)].velocity ? this.maps.allObjects[this.maps.allObjects.indexOf(this.curRightObject)].velocity : 0) &&
      !(this.curRightObject instanceof CheckpointObject) && !(this.curRightObject instanceof FinishObject) && !(this.curRightObject instanceof EnemyMovingObject)) {
      this.maps.newPosAll('right');
      if (this.curRightObject instanceof BulletObject && !this.gameOverCalled) {
        this.gameOver();
      }
    } else if (this.curLeftObject.x < this.character.x + this.character.width - this.maps.allObjects[this.maps.allObjects.indexOf(this.curLeftObject)].speedRightX -
      (this.maps.allObjects[this.maps.allObjects.indexOf(this.curLeftObject)].velocity ? this.maps.allObjects[this.maps.allObjects.indexOf(this.curLeftObject)].velocity : 0) &&
      !(this.curLeftObject instanceof CheckpointObject) && !(this.curLeftObject instanceof FinishObject) && !(this.curLeftObject instanceof EnemyMovingObject)) {
      this.maps.newPosAll('left');
      if (this.curLeftObject instanceof BulletObject && !this.gameOverCalled) {
        this.gameOver();
      }
    } else {
      this.maps.newPosAll('both');
    }
  }

  public collider() {
    this.checkpoints();
    this.colliderFloor();
    this.colliderCeil();
    this.colliderSides();
    this.colliderFinish();
  }

  public startGame() {
    this.maps = new Maps(this.ctx, this.activeRoute);
    this.platformPos();
    this.charImg.src = '../../assets/characters/r2d2.png';
    this.character = new CharacterMovement({ctx: this.ctx, x: this.char.x, y: this.char.y, width: this.char.width, height: this.char.height, img: this.charImg});
    this.interval = setInterval(() => this.updateGameArea(), 15);
  }

  public gameOver() {
    this.gameOverCalled = true;
    this.sound.soundChar('../../assets/sounds/r2d2_scream.mp3');
    this.character.moveUp(0);
    const interval = setInterval(() => {
      this.character.newPosY(true);
      this.character.draw();
    }, 15);
    for (const obj of this.maps.shootingObjects) {
      clearInterval(obj.interval);
    }
    setTimeout(() => {
      clearInterval(this.interval),
      clearInterval(interval);
      this.clearCanvas(),
      this.router.navigate(['/restart', this.activeLevel, this.maps.checkpointObjects.indexOf(this.checkpointHasPassed)]);
    }, 1000);
  }

  public updateGameArea() {
    this.clearCanvas();
    if (!this.gameOverCalled) { this.collider(); }
    this.maps.drawAll(this.canvas);
    if (!this.gameOverCalled) { this.character.newPosY(this.colFloor);
                                this.character.draw(); }
    if (this.character.y >= this.canvas.height && !this.gameOverCalled) {
      this.gameOver();
    }
  }

  @HostListener('document:keydown', ['$event'])
  public keyDown(event: KeyboardEvent) {
    this.controls.Move(event, this.character, this.colFloor, this.maps.allObjects, this.curCeilObject.y + this.curCeilObject.height, this.diffLeft, this.diffRight);
  }

  @HostListener('document:keyup', ['$event'])
  public keyUp(event: KeyboardEvent) {
    this.controls.StopMove(event, this.maps.allObjects);
  }
}
