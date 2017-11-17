import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

export class Character {
  public width;
  public height;
  public speedleftX;
  public speedrightX;
  public speedY;
  public x;
  public y;
  public color;
  public gravity;
  public gravitySpeed;

  constructor(public ctx, width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedleftX = 0;
    this.speedrightX = 0;
    this.speedY = 0;

    this.color = color;
    this.x = x;
    this.y = y;
    this.gravity = 0.1;
    this.gravitySpeed = 0;
  }

  public update() {
    this.newPos();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  public newPos() {
    if (this.y >= 230 && this.gravitySpeed >= 0) {
      // this.gravity = 0;
      this.gravitySpeed = 0;
    } else if (this.gravitySpeed < 3) {
      this.gravitySpeed += this.gravity;
    }

    this.x += this.speedleftX;
    this.x += this.speedrightX;
    this.y += this.speedY + this.gravitySpeed;
  }

  public moveup() {
    this.gravitySpeed = -3;
    // this.speedY = - 3;
  }

  public movedown() {
    this.speedY = 1;
  }

  public moveleft() {
    this.speedleftX = -1;
  }

  public moveright() {
    this.speedrightX = +1;
  }

  public stop() {
    this.speedleftX = 0;
    this.speedrightX = 0;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
  public ctx;
  private character: Character;

  @ViewChild('myCanvas')
  public canvasRef: ElementRef;
  public canvas;
  private interval;

  public clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.ctx = this.canvas.getContext('2d');
  }

  public updateGameArea() {
    this.clear();
    this.character.update();
  }

  public startGame(character) {
    this.character = character;
    this.interval = setInterval(() => this.updateGameArea(), 20);

  }
}
