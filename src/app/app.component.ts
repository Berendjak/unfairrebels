import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

export class Character {
  public width;
  public height;
  public speedX;
  public speedY;
  public x;
  public y;
  public color;

  constructor(public ctx, width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  public update() {
    this.newPos();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  public newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  public moveup() {
    this.speedY = -1;
  }

  public movedown() {
    this.speedY = 1;
  }

  public moveleft() {
    this.speedX = -1;
  }

  public moveright() {
    this.speedX = 1;
  }

  public stopbitch() {
    this.speedY = 0;
    this.speedX = 0;
  }
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit{
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
