import { YMovingObject } from './y.moving.object.canvas';

export class Character extends YMovingObject{
  public moveup(ceil) {
    if (this.y - ceil < 20) {
      this.gravitySpeed = -(this.y - ceil);
      console.log(this.gravitySpeed);
    }else {
      this.gravitySpeed = -20;
    }
  }
}

