export abstract class CanvasObject {
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
  public draw(y) {
    this.y = y ? y : this.y;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
