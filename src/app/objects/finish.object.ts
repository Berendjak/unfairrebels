import { XMovingObject } from '../helpers/x.moving.canvas';

export class FinishObject extends XMovingObject {
  public img = new Image();

  constructor(params){
    super(params);
    this.width = 200;
    this.height = 100;
    this.img.src = '../../assets/images/props/finish.png';
  }
}
