namespace EIA2_W19 {
  export class Character {
    constructor(
      public ctx: CanvasRenderingContext2D,
      public head: Head = new Head(ctx),
      public body: Body = new Body(ctx),
      public leftLeg: Leg = new Leg(ctx, 'left'),
      public rightLeg: Leg = new Leg(ctx, 'right'),
      public leftFoot: Foot = new Foot(ctx),
      public rightFoot: Foot = new Foot(ctx),
      public leftArm: Arm = new Arm(ctx, 'left'),
      public rightArm: Arm = new Arm(ctx, 'right'),
      public _id?: string,
      public data: CharacterData = {
        height: 5,
        name: 'new character'
      }
    ) {}

    public draw() {
      this.setGeneralHeights()
      this.setPositions()
      this.drawBackground()
      this.rightLeg.draw()
      this.leftLeg.draw()
      this.body.draw()
      this.head.draw()
      this.rightArm.draw()
      this.leftArm.draw()
      this.rightFoot.draw()
      this.leftFoot.draw()
    }

    private drawBackground(): void {
      let gradient: CanvasGradient = this.ctx.createLinearGradient(0, 0, 0, this.ctx.canvas.height)
      gradient.addColorStop(0, 'lightblue')
      gradient.addColorStop(0.6, 'white')
      gradient.addColorStop(1, 'HSL(100, 80%, 30%)')

      this.ctx.fillStyle = gradient
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    private setPositions() {
      const midX = this.ctx.canvas.width / 2

      this.leftLeg.setPosition(
        new Vector(
          midX - this.leftLeg.getData().width / 2,
          this.ctx.canvas.height -
            this.ctx.canvas.height / 11 -
            this.rightFoot.getData().height / 2 -
            this.leftLeg.getCalculatedHeight()
        )
      )
      this.rightLeg.setPosition(
        new Vector(
          midX + this.rightLeg.getData().width / 2,
          this.ctx.canvas.height -
            this.ctx.canvas.height / 11 -
            this.rightFoot.getData().height / 2 -
            this.rightLeg.getCalculatedHeight()
        )
      )

      this.rightFoot.setPosition(
        new Vector(
          midX + this.rightLeg.getDistanceToMid() + this.rightFoot.getData().width / 1.2,
          this.rightLeg.getPosition().y + this.rightLeg.getCalculatedHeight() + this.rightFoot.getData().width / 2
        )
      )
      this.leftFoot.setPosition(
        new Vector(
          midX - this.leftLeg.getDistanceToMid() - this.leftFoot.getData().width / 1.2,
          this.leftLeg.getPosition().y + this.rightLeg.getCalculatedHeight() + this.leftFoot.getData().width / 2
        )
      )
      this.body.setPosition(
        new Vector(
          midX,
          this.leftLeg.getPosition().y - this.body.getCalculatedHeight() + this.body.getCalculatedHeight() / 10
        )
      )
      this.leftArm.setPosition(
        new Vector(this.body.getPosition().x - this.body.getData().width / 2, this.body.getPosition().y)
      )
      this.rightArm.setPosition(
        new Vector(this.body.getPosition().x + this.body.getData().width / 2, this.body.getPosition().y)
      )
      this.head.setPosition(new Vector(midX, this.body.getPosition().y - this.head.getData().height / 1.5))
    }

    public set(characterDataInput: CharacterDataInput) {
      if (characterDataInput.data) this.data = Object.assign(this.data, characterDataInput.data)
      if (characterDataInput.head) this.head.set(characterDataInput.head)
      if (characterDataInput.body) this.body.set(characterDataInput.body)
      if (characterDataInput.leftArm) this.leftArm.set(characterDataInput.leftArm)
      if (characterDataInput.rightArm) this.rightArm.set(characterDataInput.rightArm)
      if (characterDataInput.leftLeg) this.leftLeg.set(characterDataInput.leftLeg)
      if (characterDataInput.rightLeg) this.rightLeg.set(characterDataInput.rightLeg)
      if (characterDataInput.leftFoot) this.leftFoot.set(characterDataInput.leftFoot)
      if (characterDataInput.rightFoot) this.rightFoot.set(characterDataInput.rightFoot)
    }

    private setGeneralHeights() {
      if (this.data && this.data.height) {
        this.leftLeg.generalHeight = this.data.height
        this.rightLeg.generalHeight = this.data.height
        this.body.generalHeight = this.data.height
        this.leftArm.generalHeight = this.data.height
        this.rightArm.generalHeight = this.data.height
      }
    }

    public getData() {
      return this.data
    }
  }

  export interface CharacterData {
    name: string
    height: number
  }

  export interface CharacterDataInput {
    data?: CharacterData
    head?: HeadData
    body?: BodyData
    leftArm?: ArmData
    rightArm?: ArmData
    leftLeg?: LegData
    rightLeg?: LegData
    leftFoot?: FootData
    rightFoot?: FootData
  }
}
