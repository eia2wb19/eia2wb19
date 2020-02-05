namespace EIA2_W19 {
  export class Head extends Drawable {
    private baseEyeSize: number = 1
    private baseMouthWidth: number = 3
    constructor(
      private ctx: CanvasRenderingContext2D,
      protected position: Vector = new Vector(ctx.canvas.width / 2, ctx.canvas.height * 0.6),
      private data: HeadData = {
        skinColor: Color.YELLOW,
        mouthSize: 5,
        eyeSize: 5,
        eyeColor: Color.WHITE,
        width: 40,
        height: 50
      }
    ) {
      super()
      if (!this.position) this.position = new Vector(this.ctx.canvas.width / 2, this.ctx.canvas.height * 0.6)
    }

    draw() {
      this.drawHead()
      this.drawEyes()
      this.drawMouth()
    }

    private drawHead() {
      this.ctx.fillStyle = this.data.skinColor
      this.ctx.beginPath()
      this.ctx.ellipse(this.position.x, this.position.y, this.data.width, this.data.height, 0, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.restore()
      this.ctx.save()
    }

    private drawEyes() {
      this.ctx.fillStyle = this.data.eyeColor
      this.ctx.beginPath()
      const leftEyeX = this.position.x - this.data.width * 0.3
      const rightEyeX = this.position.x + this.data.width * 0.3
      const eyeY = this.position.y - this.data.height * 0.2

      this.ctx.ellipse(
        leftEyeX,
        eyeY,
        this.baseEyeSize * this.data.eyeSize,
        this.baseEyeSize * this.data.eyeSize,
        0,
        0,
        2 * Math.PI
      )
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.beginPath()
      this.ctx.ellipse(
        rightEyeX,
        eyeY,
        this.baseEyeSize * this.data.eyeSize,
        this.baseEyeSize * this.data.eyeSize,
        0,
        0,
        2 * Math.PI
      )
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.restore()
      this.ctx.save()
    }

    private drawMouth() {
      this.ctx.fillStyle = Color.BLACK
      this.ctx.beginPath()
      const mouthX = this.position.x
      const mouthY = this.position.y + this.data.height * 0.6 - this.baseMouthWidth * this.data.mouthSize

      this.ctx.arc(mouthX, mouthY, this.baseMouthWidth * this.data.mouthSize, 0.2 * Math.PI, 0.8 * Math.PI)
      this.ctx.fill()
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.restore()
      this.ctx.save()
    }

    public set(headData: HeadData): void {
      this.data = Object.assign(this.data, headData)
    }

    public getData(): HeadData {
      return this.data
    }
  }

  export enum HairType {
    LONG = 'long',
    MID = 'mid',
    SHORT = 'short',
    NONE = 'none'
  }

  export interface HeadData {
    skinColor: Color
    eyeSize: number
    eyeColor: Color
    mouthSize: number
    width: number
    height: number
  }
}
