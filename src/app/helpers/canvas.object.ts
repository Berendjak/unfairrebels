export class CanvasObject {
  public ctx;
  public width;
  public height;
  public x;
  public y;
  public color;

  constructor(ctx, width, height, x, y, color){
    this.ctx = ctx;
    this.color = color;
    this.x =  x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
