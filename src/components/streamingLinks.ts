import { Field } from 'payload'
import deepMerge from '../utilities/deepMerge'

type StreamingLinks = (fieldToUse?: string, overrides?: Partial<Field>) => Field
const streamingLinks: StreamingLinks = (fieldToUse = 'name', overrides) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'streamingLinks',
      type: 'group',
      fields: [
        {
          name: 'spotifyEmbedCode',
          type: 'text',
          admin: {
            description: 'Put full Spotify embed code here.',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'spotifyLink',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'youtubeLink',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'amazonLink',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'appleMusicLink',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    overrides,
  )

export default streamingLinks
