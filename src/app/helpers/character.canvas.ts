import { MovingObject } from './moving.object.canvas';

export class Character extends MovingObject{
  public moveup()     { this.gravitySpeed = -20; }
  public moveleft()   { this.speedleftX = -5; }
  public moveright()  { this.speedrightX = 5; }
}
