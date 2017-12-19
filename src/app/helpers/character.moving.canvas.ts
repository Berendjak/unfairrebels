import { ObjectCanvas } from './object.canvas';

const gravity = 1;
export class CharacterMovement extends ObjectCanvas{
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
  public moveUp(ceil, gravitySpeed = -20) {
    if (this.y - ceil < -gravitySpeed) {
      this.gravitySpeed = -(this.y - ceil);
    } else {
      this.gravitySpeed = gravitySpeed;
    }
  }
}

