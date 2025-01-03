import { Field } from 'payload'
import deepMerge from '../utilities/deepMerge'

type PositionSelector = (fieldToUse?: string, overrides?: Partial<Field>) => Field
const positionSelector: PositionSelector = (fieldToUse = 'name', overrides) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'textPosition',
      type: 'radio',
      options: ['Left', 'Right', 'Foreground'],
      admin: {
        description: 'Which side of the screen should the text show up on on bigger screens? Or do you want the image to be in the background',
      },
    },
    overrides,
  )

export default positionSelector
