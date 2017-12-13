import { XMovingObject } from '../helpers/x.moving.canvas';

export class CheckpointObject extends XMovingObject {
  public hasPassed: boolean;

  constructor(params){
    super(params);
    this.hasPassed = false;
  }
}
