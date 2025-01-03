import {Block} from 'payload'
import buttons from '../components/buttons'
import headerSection from '../components/headerSection'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const ContentWithMap: Block = {
    slug: 'contentWithMap',
    fields: [
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
        headerSection(),
        {
            name: 'mapLink',
            type: 'text',
        },
        {
            name: 'address',
            type: 'relationship',
            relationTo: 'addresses',
        },
        buttons(),
        {
            name: 'textPosition',
            type: 'radio',
            options: ['Left', 'Right'],
            admin: {
                description: 'Which side of the screen should the text show up on on bigger screens?',
            },
        },
        {
            name: 'content',
            type: 'richText',
            editor: lexicalEditor()
        }
    ],
}

export default ContentWithMap
