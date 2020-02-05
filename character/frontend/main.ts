namespace EIA2_W19 {
  const BACKEND_REST_ENDPOINT = 'http://localhost:5001'
  window.addEventListener('load', handleLoad)
  let crc2: CanvasRenderingContext2D
  let character: Character
  let characters: Character[] = []
  let canvas: HTMLElement | null

  let characterDropdown: Element | null
  let saveBtn: Element | null
  let generalHeightCtrl: Element | null
  let nameBtn: Element | null
  let headWithCtrl: Element | null
  let headHeightCtrl: Element | null
  let headColorInput: Element | null
  let mouthSizeCtrl: Element | null
  let eyeSizeCtrl: Element | null
  let eyeColorInput: Element | null
  let bodyWidthCtrl: Element | null
  let bodyHeightCtrl: Element | null
  let leftArmWidthCtrl: Element | null
  let bodyColorInput: Element | null
  let leftArmHeightCtrl: Element | null
  let rightArmWidthCtrl: Element | null
  let leftArmColorInput: Element | null
  let rightArmHeightCtrl: Element | null
  let rightArmColorInput: Element | null
  let legWidthCtrl: Element | null
  let legHeightCtrl: Element | null
  let legColorInout: Element | null
  let footWidthCtrl: Element | null
  let footHeightCtrl: Element | null
  let footColorInput: Element | null

  async function handleLoad() {
    let canvas: HTMLCanvasElement | null = document.querySelector('canvas')
    if (!canvas) return
    crc2 = <CanvasRenderingContext2D>canvas.getContext('2d')

    document.addEventListener('resize', setResponsiveCanvas)
    setResponsiveCanvas()

    characters = await findManyCharacters()
    character = characters.length > 0 ? characters[characters.length - 1] : new Character(crc2)

    character.draw()

    initControls()
    updateControlValues()
  }

  function initControls(): void {
    // Add options to dropdown
    characterDropdown = document.getElementById('characterSelect')

    characters.forEach(character => {
      const opt = document.createElement('option')
      opt.appendChild(document.createTextNode(character.getData().name))
      if (characterDropdown && character._id) {
        opt.value = character._id
        characterDropdown.appendChild(opt)
      }
    })
    if (characterDropdown) characterDropdown.addEventListener('change', changeCharacter)
    // add opt to end of select box (sel)
    saveBtn = document.querySelector('#save')
    if (saveBtn) saveBtn.addEventListener('click', saveCharacter)

    nameBtn = document.querySelector('#name')
    if (nameBtn) nameBtn.addEventListener('change', setName)

    generalHeightCtrl = document.querySelector('#generalHeight')
    if (generalHeightCtrl) generalHeightCtrl.addEventListener('change', setGeneralHeight)

    // Head
    headWithCtrl = document.querySelector('#headWidth')
    if (headWithCtrl) headWithCtrl.addEventListener('change', setHeadWidth)

    headHeightCtrl = document.querySelector('#headHeight')
    if (headHeightCtrl) headHeightCtrl.addEventListener('change', setHeadHeight)

    headColorInput = document.querySelector('#headColor')
    if (headColorInput) headColorInput.addEventListener('change', setHeadColor)

    mouthSizeCtrl = document.querySelector('#mouthSize')
    if (mouthSizeCtrl) mouthSizeCtrl.addEventListener('change', setMouthSize)

    eyeSizeCtrl = document.querySelector('#eyeSize')
    if (eyeSizeCtrl) eyeSizeCtrl.addEventListener('change', setEyeSize)

    eyeColorInput = document.querySelector('#eyeColor')
    if (eyeColorInput) eyeColorInput.addEventListener('change', setEyeColor)

    // Body
    bodyWidthCtrl = document.querySelector('#bodyWidth')
    if (bodyWidthCtrl) bodyWidthCtrl.addEventListener('change', setBodyWidth)

    bodyHeightCtrl = document.querySelector('#bodyHeight')
    if (bodyHeightCtrl) bodyHeightCtrl.addEventListener('change', setBodyHeight)

    bodyColorInput = document.querySelector('#bodyColor')
    if (bodyColorInput) bodyColorInput.addEventListener('change', setBodyColor)

    // Left Arm
    leftArmWidthCtrl = document.querySelector('#leftArmWidth')
    if (leftArmWidthCtrl) leftArmWidthCtrl.addEventListener('change', setLeftArmWidth)

    leftArmHeightCtrl = document.querySelector('#leftArmHeight')
    if (leftArmHeightCtrl) leftArmHeightCtrl.addEventListener('change', setLeftArmHeight)

    leftArmColorInput = document.querySelector('#leftArmColor')
    if (leftArmColorInput) leftArmColorInput.addEventListener('change', setLeftArmColor)

    // Right Arm
    rightArmWidthCtrl = document.querySelector('#rightArmWidth')
    if (rightArmWidthCtrl) rightArmWidthCtrl.addEventListener('change', setRightArmWidth)

    rightArmHeightCtrl = document.querySelector('#rightArmHeight')
    if (rightArmHeightCtrl) rightArmHeightCtrl.addEventListener('change', setRightArmHeight)

    rightArmColorInput = document.querySelector('#rightArmColor')
    if (rightArmColorInput) rightArmColorInput.addEventListener('change', setRightArmColor)

    // Legs
    legWidthCtrl = document.querySelector('#legWidth')
    if (legWidthCtrl) legWidthCtrl.addEventListener('change', setLegWidth)

    legHeightCtrl = document.querySelector('#legHeight')
    if (legHeightCtrl) legHeightCtrl.addEventListener('change', setLegHeight)

    legColorInout = document.querySelector('#legColor')
    if (legColorInout) legColorInout.addEventListener('change', setLegColor)

    // Foots
    footWidthCtrl = document.querySelector('#footWidth')
    if (footWidthCtrl) footWidthCtrl.addEventListener('change', setFootWidth)

    footHeightCtrl = document.querySelector('#footHeight')
    if (footHeightCtrl) footHeightCtrl.addEventListener('change', setFootHeight)

    footColorInput = document.querySelector('#footColor')
    if (footColorInput) footColorInput.addEventListener('change', setFootColor)
  }

  function updateControlValues(): void {
    if (!character) return
    if (nameBtn) nameBtn.setAttribute('value', character.getData().name)
    if (generalHeightCtrl) generalHeightCtrl.setAttribute('value', character.getData().height.toString())
    if (headWithCtrl) headWithCtrl.setAttribute('value', character.head.getData().width.toString())
    if (headHeightCtrl) headHeightCtrl.setAttribute('value', character.head.getData().height.toString())
    if (headColorInput) headColorInput.setAttribute('value', character.head.getData().skinColor)
    if (mouthSizeCtrl) mouthSizeCtrl.setAttribute('value', character.head.getData().mouthSize.toString())
    if (eyeSizeCtrl) eyeSizeCtrl.setAttribute('value', character.head.getData().eyeSize.toString())
    if (eyeColorInput) eyeColorInput.setAttribute('value', character.head.getData().eyeColor)
    if (bodyWidthCtrl) bodyWidthCtrl.setAttribute('value', character.body.getData().width.toString())
    if (bodyHeightCtrl) bodyHeightCtrl.setAttribute('value', character.body.getData().height.toString())
    if (bodyColorInput) bodyColorInput.setAttribute('value', character.body.getData().color)
    if (leftArmWidthCtrl) leftArmWidthCtrl.setAttribute('value', character.leftArm.getData().width.toString())
    if (leftArmHeightCtrl) leftArmHeightCtrl.setAttribute('value', character.leftArm.getData().height.toString())
    if (rightArmWidthCtrl) rightArmWidthCtrl.setAttribute('value', character.rightArm.getData().width.toString())
    if (leftArmColorInput) leftArmColorInput.setAttribute('value', character.leftArm.getData().color)
    if (rightArmHeightCtrl) rightArmHeightCtrl.setAttribute('value', character.rightArm.getData().height.toString())
    if (rightArmColorInput) rightArmColorInput.setAttribute('value', character.rightArm.getData().color)
    if (legWidthCtrl) legWidthCtrl.setAttribute('value', character.leftLeg.getData().width.toString())
    if (legHeightCtrl) legHeightCtrl.setAttribute('value', character.leftLeg.getData().height.toString())
    if (legColorInout) legColorInout.setAttribute('value', character.leftLeg.getData().color)
    if (footWidthCtrl) footWidthCtrl.setAttribute('value', character.leftFoot.getData().width.toString())
    if (footHeightCtrl) footHeightCtrl.setAttribute('value', character.leftFoot.getData().height.toString())
    if (footColorInput) footColorInput.setAttribute('value', character.leftFoot.getData().color)
  }

  function getCanvasWidth(): number | null {
    if (!canvas) canvas = document.querySelector('#canvasWrapper')

    if (canvas && canvas.offsetWidth) {
      return canvas.offsetWidth
    }
    return null
  }

  function setResponsiveCanvas(): void {
    // TODO: Fix
    const canvasWidth = getCanvasWidth() || 300
    const canvasHeight = canvasWidth * (9 / 16) // Get Canvas height based on 16:9 ratio

    if (crc2) {
      crc2.canvas.height = canvasHeight
      crc2.canvas.width = canvasWidth
    }
  }

  // Character control functions
  function setName(event: any) {
    if (event.target.value) {
      character.set({ data: { name: event.target.value } as CharacterData })
      if (character.data) console.log(character.data.name)
    }
  }

  function setGeneralHeight(event: any) {
    if (event.target.value) {
      character.set({ data: { height: parseInt(event.target.value, 10) } as CharacterData })
      character.draw()
    }
  }

  function setHeadWidth(event: any) {
    if (event.target.value) {
      character.head.set({ width: event.target.value } as HeadData)
      character.draw()
    }
  }

  function setHeadHeight(event: any) {
    if (event.target.value) {
      character.head.set({ height: event.target.value } as HeadData)
      character.draw()
    }
  }

  function setHeadColor(event: any) {
    if (event.target.value) {
      character.head.set({ skinColor: event.target.value } as HeadData)
      character.draw()
    }
  }

  function setMouthSize(event: any) {
    if (event.target.value) {
      character.head.set({ mouthSize: event.target.value } as HeadData)
      character.draw()
    }
  }

  function setEyeSize(event: any) {
    if (event.target.value) {
      character.head.set({ eyeSize: event.target.value } as HeadData)
      character.draw()
    }
  }

  function setEyeColor(event: any) {
    if (event.target.value) {
      character.head.set({ eyeColor: event.target.value } as HeadData)
      character.draw()
    }
  }

  function setLeftArmWidth(event: any) {
    if (event.target.value) {
      character.leftArm.set({ width: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setLeftArmHeight(event: any) {
    if (event.target.value) {
      character.leftArm.set({ height: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setLeftArmColor(event: any) {
    if (event.target.value) {
      character.leftArm.set({ color: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setRightArmWidth(event: any) {
    if (event.target.value) {
      character.rightArm.set({ width: parseInt(event.target.value, 10) } as BodyData)
      character.draw()
    }
  }

  function setRightArmHeight(event: any) {
    if (event.target.value) {
      character.rightArm.set({ height: parseInt(event.target.value, 10) } as BodyData)
      character.draw()
    }
  }

  function setRightArmColor(event: any) {
    if (event.target.value) {
      character.rightArm.set({ color: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setBodyWidth(event: any) {
    if (event.target.value) {
      character.body.set({ width: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setBodyHeight(event: any) {
    if (event.target.value) {
      character.body.set({ height: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setBodyColor(event: any) {
    if (event.target.value) {
      character.body.set({ color: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setLegWidth(event: any) {
    if (event.target.value) {
      character.leftLeg.set({ width: event.target.value } as BodyData)
      character.rightLeg.set({ width: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setLegHeight(event: any) {
    if (event.target.value) {
      character.leftLeg.set({ height: event.target.value } as BodyData)
      character.rightLeg.set({ height: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setLegColor(event: any) {
    if (event.target.value) {
      character.leftLeg.set({ color: event.target.value } as BodyData)
      character.rightLeg.set({ color: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setFootWidth(event: any) {
    if (event.target.value) {
      character.leftFoot.set({ width: event.target.value } as BodyData)
      character.rightFoot.set({ width: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setFootHeight(event: any) {
    if (event.target.value) {
      character.leftFoot.set({ height: event.target.value } as BodyData)
      character.rightFoot.set({ height: event.target.value } as BodyData)
      character.draw()
    }
  }

  function setFootColor(event: any) {
    if (event.target.value) {
      character.leftFoot.set({ color: event.target.value } as BodyData)
      character.rightFoot.set({ color: event.target.value } as BodyData)
      character.draw()
    }
  }

  function changeCharacter(event: any) {
    if (event.target.value && event.target.value !== 'new') {
      // TODO: Fix: can only save one character
      const selectedCharacter = characters.find(character => character._id === event.target.value)
      if (selectedCharacter) {
        character = selectedCharacter
        character.draw()
      }
    } else if (event.target.value && event.target.value === 'new') {
      character = new Character(crc2)
      character.draw()
    }
    updateControlValues()
  }

  async function saveCharacter(e: any): Promise<any> {
    e.preventDefault()
    const characterToSave = Object.assign({}, character)
    await fetch(`${BACKEND_REST_ENDPOINT}/character/`, {
      method: 'POST',
      body: JSON.stringify({ character: characterToSave })
    })
  }

  async function findManyCharacters(): Promise<Character[]> {
    const res: Response = await fetch(`${BACKEND_REST_ENDPOINT}/character`, {
      method: 'GET'
    })
    const data = await res.json()
    let chars: Character[] = []
    if (data.length > 0) {
      chars = data.map((characterData: any) => {
        const newCharacter = new Character(crc2)
        newCharacter._id = characterData._id

        newCharacter.set({
          data: characterData.data,
          head: characterData.head.data as HeadData,
          body: characterData.body.data as BodyData,
          leftArm: characterData.leftArm.data as ArmData,
          rightArm: characterData.rightArm.data as ArmData,
          leftLeg: characterData.leftLeg.data as LegData,
          rightLeg: characterData.rightLeg.data as LegData,
          leftFoot: characterData.leftFoot.data as FootData,
          rightFoot: characterData.rightFoot.data as FootData
        })
        return newCharacter
      })
    }
    return chars
  }
}
