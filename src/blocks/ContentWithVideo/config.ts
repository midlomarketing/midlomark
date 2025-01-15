import {Block} from 'payload'
import buttons from '../../components/buttons'
import headerSection from '../../components/headerSection'
import video from '../../components/video'

const ContentWithVideo: Block = {
    slug: 'contentWithVideo',
    fields: [
        {
            name: 'active',
            label: 'Activate Block',
            type: 'checkbox',
            defaultValue: true,
        },
        headerSection(),
        video(),
        {
            name: 'content',
            type: 'richText',
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
    ],
  interfaceName: 'ContentWithVideoProps'
}

export default ContentWithVideo
