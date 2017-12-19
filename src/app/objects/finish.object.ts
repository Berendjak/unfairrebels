import { XMovingObject } from '../helpers/x.moving.canvas';

export class FinishObject extends XMovingObject {
  public img = new Image();
  public width = 180;
  public height = 100;

  constructor(params){
    super(params);
    this.img.src = '../../assets/images/props/finish.png';
  }
}
