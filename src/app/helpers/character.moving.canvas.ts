import { CanvasObject } from './object.canvas';

const gravity = 1;
export class CharacterMovement extends CanvasObject{
  public gravitySpeed: number;

  constructor(params){
    super(params);
    this.gravitySpeed = 0;
  }

  public newPosY(colFloor) {
    if (this.gravitySpeed < 20 && !colFloor) {
      this.gravitySpeed += gravity;
    } else if (colFloor) {
      this.y += this.gravitySpeed;
    }
  }
  public moveUp(ceil) {
    if (this.y - ceil < 20) {
      this.gravitySpeed = -(this.y - ceil);
    } else {
      this.gravitySpeed = -20;
    }
  }
}

