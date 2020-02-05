namespace EIA2_W19 {
  export abstract class Drawable {
    protected position: Vector = new Vector(0, 0)
    constructor() {}
    public abstract draw(): void

    public setPosition(position: Vector): void {
      this.position = position
    }

    public getPosition(): Vector {
      return this.position
    }
  }
}
