import { XMovingObject } from '../helpers/x.moving.canvas';

export class CheckpointObject extends XMovingObject {
  public img = new Image();
  public hasPassed: boolean;

  constructor(params){
    super(params);
    this.width = 30;
    this.height = 130;
    this.img.src = '../../assets/images/props/checkpoint.png';
    this.hasPassed = false;
  }
}
