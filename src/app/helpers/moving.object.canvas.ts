import { CanvasObject } from './object.canvas';

const gravity = 1;

export class MovingObject extends CanvasObject{
  public speedleftX: number;
  public speedrightX: number;
  public speedY: number;
  public gravitySpeed: number;

  constructor(ctx, width, height, x, y, color){
    super(ctx, width, height, x, y, color);
    this.speedleftX = 0;
    this.speedrightX = 0;
    this.speedY = 0;
    this.gravitySpeed = 0;
  }

  public newPos(colFloor, floor, ceil, sideRight, sideLeft, finishObject) {
    if (this.y + this.height > floor && this.gravitySpeed >= 0) {
      this.gravitySpeed = 0;
    } else if (this.gravitySpeed < 20 && !colFloor) {
      this.gravitySpeed += gravity;
    }

    // Checks for the side collisions
    console.log(finishObject, this.x + this.width + this.speedrightX)
    if (finishObject.x <= this.x + this.width + this.speedrightX &&
        finishObject.x + finishObject.width >= this.x + this.speedleftX &&
    finishObject.y < this.y + this.gravitySpeed + this.height && finishObject.y + finishObject.height > this.y + this.gravitySpeed ) {
      alert('finish!');
    }

    if (sideRight >= this.x + this.speedleftX) {
      // Move right only
      this.x += this.speedrightX;
    } else if (sideLeft <= this.x + this.width + this.speedrightX) {
      // Move left only
      this.x += this.speedleftX;
    } else {
      // Move both sides
      this.x += this.speedleftX + this.speedrightX;
    }

    // Checks for the floor collisions
    if (this.y + this.gravitySpeed + this.height > floor){
        this.y = floor - this.height;
        this.gravitySpeed = 0;
    } else {
        this.y += this.gravitySpeed;
    }
    // Check for the ceiling collisions
    if (this.y + this.gravitySpeed < ceil) {
      this.y = ceil;
      this.gravitySpeed = 0;
    }
  }

  public stopright() {
    this.speedrightX = 0;
  }
  public stopleft() {
    this.speedleftX = 0;
  }
}
