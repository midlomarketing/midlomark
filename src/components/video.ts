import {Field} from 'payload'
import deepMerge from '../utilities/deepMerge'
import {HTMLConverterFeature, lexicalEditor, lexicalHTML} from '@payloadcms/richtext-lexical'
import date from './date'
import image from './image'

type Video = (fieldToUse?: string, overrides?: Partial<Field>) => Field
const video: Video = (fieldToUse = 'name', overrides) =>
    deepMerge<Field, Partial<Field>>(
        {
            type: 'group',
            name: 'video',
            fields: [
                {
                    type: 'row', fields: [{
                        name: 'video',
                        label: 'Link to Video',
                        type: 'text',
                        admin: {
                            description: 'Copy and paste the direct link from your YouTube Studio. It should look like this: https://youtu.be/xxxxxx',
                            width: '100%'
                        }
                    },
                        {
                            name: 'videoName',
                            label: 'Name of the Video',
                            type: 'text',
                            admin: {
                                description: 'Include only what you would like to show up on your website.',
                                width: '50%'
                            }
                        },
                        {
                            name: 'displayVideoName',
                            type: 'checkbox',
                            admin: {
                                description: 'Check this box if you want the name to show up on your website.',
                                width: '50%'
                            }
                        }]
                },
                {
                    name: 'channel',
                    label: 'YouTube or Vimeo?',
                    type: 'radio',
                    options: ['YouTube', 'Vimeo'],
                },
                {
                    name: 'description',
                    type: 'richText',
                    admin: {
                        description: 'Use this field to send a different description to Google.'
                    },
                    editor:
                        lexicalEditor({
                            features: ({defaultFeatures}) => [...defaultFeatures, HTMLConverterFeature({})],
                        }),
                },
                image(),
                {
                    name: 'uploadDate',
                    type: 'date',
                    admin: {
                        date: {
                            pickerAppearance: 'dayAndTime',
                            displayFormat: 'MMM dd, yyyy hh:mm a',
                        },
                    },
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'minutes',
                            type: 'number',
                        },
                        {
                            name: 'seconds',
                            type: 'number',
                        }
                    ]
                },
                {
                    type: 'text',
                    name: 'creatorName'
                },
                lexicalHTML('description', {name: 'description_html'}),
            ],
        },
        overrides,
    )

export default video
