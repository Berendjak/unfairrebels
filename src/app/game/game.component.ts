import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

class Ball {
  constructor(private ctx) {
  }

  public x = 325;
  public y = 350;
  public radius = 25;
  public color = 'blue';

  public draw() {
    this.x += 1;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class GameComponent implements OnInit {
  constructor() {
  }

  @ViewChild('myCanvas') canvasRef: ElementRef;

  private ctx;

  ngOnInit() {

    this.ctx = this.canvasRef.nativeElement.getContext('2d');

    const ball = new Ball(this.ctx);
    ball.draw();
  }

  // Functions

}
