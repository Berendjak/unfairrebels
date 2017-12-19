import { XMovingObject } from '../helpers/x.moving.canvas';

export class CheckpointObject extends XMovingObject {
  public hasPassed: boolean;
  public img = new Image();

  constructor(params){
    super(params);
    this.img.src = '../../assets/images/props/checkpoint.png';
    this.hasPassed = false;
  }
}
