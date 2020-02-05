namespace EIA2_W19 {
  export class Leg extends Drawable {
    constructor(
      private ctx: CanvasRenderingContext2D,
      private orientation: string = 'left',
      protected position: Vector = new Vector(ctx.canvas.width / 2, ctx.canvas.height * 0.6),
      public generalHeight: number = 5,
      private data: LegData = {
        width: 40,
        height: 30,
        color: Color.GREEN
      }
    ) {
      super()
    }

    draw() {
      const rotation = this.orientation === 'right' ? -25 : +25
      this.ctx.fillStyle = this.data.color
      this.ctx.beginPath()
      this.ctx.translate(this.getPosition().x - this.data.width / 2, this.getPosition().y)
      this.ctx.rotate(rotation / 180)
      this.ctx.rect(0, 0, this.data.width, this.getCalculatedHeight())
      this.ctx.closePath()
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.restore()
      this.ctx.resetTransform()
      this.ctx.save()
    }

    public getCalculatedHeight(): number {
      return this.data.height * (this.generalHeight ? this.generalHeight : 5 / 10)
    }

    public getCalculatedWidth(): number {
      return this.data.width
    }

    public getDistanceToMid(): number {
      return Math.sqrt(Math.pow((this.getCalculatedHeight() / Math.sin(90)) * Math.sin(25), 2))
    }

    public getData(): LegData {
      return this.data
    }

    public set(legData: LegData): void {
      this.data = Object.assign(this.data, legData)
    }
  }

  export interface LegData {
    color: Color
    width: number
    height: number
  }
}
